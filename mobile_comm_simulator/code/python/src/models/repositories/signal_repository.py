""""
Signal Repository Module
This module contains the SignalRepository class, which is responsible for generating 
signals for Direction of Arrival (DOA) estimation. It handles the array geometry and
signal generation for multiple sources.
"""

from typing import List, Optional # pylint: disable=unused-import
from dataclasses import dataclass

import numpy as np

from models.interfaces.signal_repository import SignalRepositoryInterface
from .array_geometry_repository import ArrayParameters, ArrayGeometryRepository

# from datetime import datetime
# from models.entities.signal_model import SignalModel

@dataclass
class SourceParameters:
    """Parameters for signal sources."""
    num_sources: int  # Number of sources
    powers: List[float]  # Source powers in linear scale
    frequencies: List[float]  # Normalized frequencies (-0.5 to 0.5)

class SignalRepository(SignalRepositoryInterface):
    """
    Main class for signal generation in DOA estimation.
    Handles array geometry and signal generation for multiple sources.
    """

    def __init__(
        self,
        db_connection,
        array_params: ArrayParameters,
        source_params: SourceParameters
        ):
        self.__db_connection = db_connection
        self.array_params = array_params
        self.source_params = source_params
        
        # Initialize array geometry
        self.array_geometry = ArrayGeometryRepository(
            db_connection=db_connection,
            array_params=array_params
        )
        self.sensor_positions = self.array_geometry.generate_array_structure()

    def steering_matrix(self, wave_vetors: np.ndarray) -> np.ndarray:
        """
        Generate steering vectors for the given electrical frequencies.
        The steering matrix's columns corresponds to a specific source
        and each row corresponds to a sensor.
        The steering vector is calculated as:
            a(θ) = exp(-j * k * d * sin(θ))
        where:
            - k is the wave number
            - d is the distance between sensors
            - θ is the angle of arrival (DOA)
        The steering matrix is of shape (num_sensors, num_sources),
        in which the entries are complex numbers.
        
        Args:
            theta: List of angles in degrees relative to broadside
        
        Returns:
            np.ndarray: Steering vectors matrix
        """
        k = 2 * np.pi / self.array_params.wavelength
        phase = k * self.sensor_positions @ wave_vetors.T  # (M, D) @ (D, N) → (M, N)
        return np.exp(1j * phase)

    def generate_sources(self) -> np.ndarray:
        """
        Generate complex exponential signals for each source.
        Returns:
            S: (num_sources, num_snapshots)
        """

        time_window_T = self.array_params.num_snapshots # pylint: disable=invalid-name
        time_instant_t = np.arange(time_window_T)
        signal_matrix_S = np.zeros(  # pylint: disable=invalid-name
            (self.source_params.num_sources, time_window_T),
            dtype=complex
        )

        for i in range(self.source_params.num_sources):
            amp = np.sqrt(self.source_params.powers[i])
            freq = self.source_params.frequencies[i]
            signal_matrix_S[i, :] = amp * np.exp(1j * 2 * np.pi * freq * time_instant_t)

        return signal_matrix_S
    
    def generate_received_signal(self) -> np.ndarray:
        """
        Generate the array output (received signal): X = A @ S
        Returns:
            X: (num_sensors, num_snapshots)
        """
        wave_vectors = get_wave_vector_from_angles(
            self.source_params.angles, dimension=self.sensor_positions.shape[1]
        )
        A = self.steering_matrix(wave_vectors)
        S = self.generate_sources()
        return A @ S


    def create_signal(self, _, __) -> None:
        return f"{self.__db_connection}. Signal persisted in the database...\n"

    # def create_signal(
    #     self,
    #     name: str,
    #     model: str,
    # ) -> None:
    #     with self.__db_connection as database:
    #         try:
    #             signal_info = SignalModel(
    #                 name=name,
    #                 model=model,
    #                 created_at=datetime.now(),
    #             )
    #             database.session.add(signal_info)
    #             database.session.commit()
    #         except Exception as exception:
    #             database.session.rollback()
    #             raise exception
