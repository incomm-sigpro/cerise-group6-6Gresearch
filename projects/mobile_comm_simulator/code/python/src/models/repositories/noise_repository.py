import numpy as np
from typing import Optional
from dataclasses import dataclass

# from datetime import datetime
# from models.entities.noise import Noise
from configs.types import NoiseType
from ..interfaces.noise_repository import NoiseRepositoryInterface


@dataclass
class NoiseParameters:
    """Parameters for noise generation."""

    noise_type: NoiseType
    num_snapshots: int
    num_sensors: int
    snr_db: float = 0.0
    seed: Optional[int] = None


class NoiseRepository(NoiseRepositoryInterface):
    """
    Main class for noise generation in DOA estimation.
    Handles different types of noise distributions and their generation.
    """

    def __init__(self, db_connection, parameters: NoiseParameters):
        self.__db_connection = db_connection
        self.parameters = parameters
        if parameters.seed is not None:
            np.random.seed(parameters.seed)

    # def create_noise(
    #     self,
    #     name: str,
    #     description: str,
    # ) -> None:
    #     with self.__db_connection as database:
    #         try:
    #             noise_info = Noise(
    #                 name=name,
    #                 description=description,
    #                 created_at=datetime.now(),
    #             )
    #             database.session.add(noise_info)
    #             database.session.commit()
    #         except Exception as exception:
    #             database.session.rollback()
    #             raise exception

    def generate(self, noise_type: NoiseType = NoiseType.GAUSSIAN) -> np.ndarray:
        """
        Generate noise samples based on specified distribution.

        Args:
            noise_type: Type of noise distribution to generate

        Returns:
            np.ndarray: Noise matrix of shape (num_sensors, num_snapshots)
        """
        generators = {
            NoiseType.GAUSSIAN: self._generate_gaussian,
            NoiseType.UNIFORM: self._generate_uniform,
            NoiseType.LAPLACIAN: self._generate_laplacian,
            NoiseType.NONE: lambda: np.zeros(
                (self.parameters.num_sensors, self.parameters.num_snapshots),
                dtype=complex,
            ),
        }

        generator = generators.get(noise_type)
        print(generator)
        if not generator:
            raise ValueError(f"Unsupported noise type: {noise_type}")

        return generator()

    def _generate_gaussian(self) -> np.ndarray:
        """Generate complex Gaussian (normal) noise."""
        noise_real = np.random.normal(
            0,
            1 / np.sqrt(2),
            (self.parameters.num_sensors, self.parameters.num_snapshots),
        )
        noise_imag = np.random.normal(
            0,
            1 / np.sqrt(2),
            (self.parameters.num_sensors, self.parameters.num_snapshots),
        )
        return noise_real + 1j * noise_imag / self.parameters.num_snapshots

    def _generate_uniform(self) -> np.ndarray:
        """Generate complex uniform noise."""
        noise_real = np.random.uniform(
            -1, 1, (self.parameters.num_sensors, self.parameters.num_snapshots)
        )
        noise_imag = np.random.uniform(
            -1, 1, (self.parameters.num_sensors, self.parameters.num_snapshots)
        )
        return (noise_real + 1j * noise_imag) / np.sqrt(2)

    def _generate_laplacian(self) -> np.ndarray:
        """Generate complex Laplacian noise."""
        noise_real = np.random.laplace(
            0,
            1 / np.sqrt(2),
            (self.parameters.num_sensors, self.parameters.num_snapshots),
        )
        noise_imag = np.random.laplace(
            0,
            1 / np.sqrt(2),
            (self.parameters.num_sensors, self.parameters.num_snapshots),
        )
        return noise_real + 1j * noise_imag

    def apply_snr_scaling(self, signal: np.ndarray, noise: np.ndarray) -> np.ndarray:
        """
        Scale noise according to desired SNR.

        Args:
            signal: Signal matrix
            noise: Noise matrix

        Returns:
            np.ndarray: Scaled noise matrix
        """
        signal_power = np.mean(np.abs(signal) ** 2)
        noise_power = np.mean(np.abs(noise) ** 2)

        scaling_factor = np.sqrt(
            signal_power / (noise_power * 10 ** (self.parameters.snr_db / 10))
        )
        return noise * scaling_factor

    def create_noise(self, _, __):
        return f"{self.__db_connection}. Noise persisted in the database...\n"
