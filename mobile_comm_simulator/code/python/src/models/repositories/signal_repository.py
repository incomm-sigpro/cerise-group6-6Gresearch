""""
Signal Repository Module
This module contains the SignalRepository class, which is responsible for generating 
signals for Direction of Arrival (DOA) estimation. It handles the array geometry and
signal generation for multiple sources.
"""

from typing import List, Optional
from dataclasses import dataclass

import numpy as np

from models.interfaces.signal_repository import SignalRepositoryInterface
from .array_geometry_repository import ArrayParameters

# from datetime import datetime
# from models.entities.signal_model import SignalModel

@dataclass
class SourceParameters:
    """Parameters for signal sources."""
    angles: List[float]  # DOA angles in degrees
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

        self.wavelength = self.array_params.speed_of_light / self.array_params.center_frequency
        self.d = 0.5 * self.wavelength
        self.sensor_positions = self._generate_sensor_positions()

    def _generate_sensor_positions(self) -> np.ndarray:
        """Generate sensor positions for the given array geometry."""
        start_pos = -(self.array_params.num_sensors - 1) * self.d / 2
        positions = np.arange(self.array_params.num_sensors) * self.d + start_pos
        return positions

    def steering_vector(self, theta: List[float]) -> np.ndarray:
        """
        Generate steering vectors for given angles.
        
        Args:
            theta: List of angles in degrees relative to broadside
        
        Returns:
            np.ndarray: Steering vectors matrix
        """
        theta_rad = np.deg2rad(theta)
        k = 2 * np.pi / self.wavelength
        
        phase = k * self.sensor_positions[:, np.newaxis] * np.sin(theta_rad)
        return np.exp(1j * phase)

    def generate(self) -> np.ndarray:
        """
        Generate signal snapshots for all sources.
        
        Returns:
            np.ndarray: Signal matrix of shape (num_sensors, num_snapshots)
        """
        num_sources = len(self.source_params.angles)

        # Generate steering vectors
        A = self.steering_vector(self.source_params.angles)

        # Generate source signals
        S = np.zeros((num_sources, self.array_params.num_sensors), dtype=complex)
        for i in range(num_sources):
            amplitude = np.sqrt(self.source_params.powers[i])
            phase = 2 * np.pi * self.source_params.frequencies[i]
            time_vector = np.arange(self.array_params.num_sensors)
            S[i, :] = amplitude * np.exp(1j * phase * time_vector)

        # Generate array output
        X = A @ S

        return X 

    def create_signal(self, _, __):
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
