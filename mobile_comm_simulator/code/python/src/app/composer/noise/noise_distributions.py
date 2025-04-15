import numpy as np
from typing import Union, Tuple, Optional
from dataclasses import dataclass


@dataclass
class NoiseParameters:
    """Parameters for noise generation."""

    num_snapshots: int
    num_sensors: int
    snr_db: float = 0.0  # Signal-to-Noise Ratio in dB
    seed: Optional[int] = None


class NoiseGenerator:
    """Base class for noise generation."""

    def __init__(self, parameters: NoiseParameters):
        self.parameters = parameters
        if parameters.seed is not None:
            np.random.seed(parameters.seed)

    def generate(self) -> np.ndarray:
        """Generate noise samples."""
        raise NotImplementedError


class GaussianNoise(NoiseGenerator):
    """
    Generate complex Gaussian (normal) noise.
    This is the most commonly used noise model in DOA estimation.
    """

    def generate(self) -> np.ndarray:
        """
        Generate complex Gaussian noise samples.

        Returns:
            np.ndarray: Complex noise matrix of shape (num_sensors, num_snapshots)
        """
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
        return noise_real + 1j * noise_imag


class UniformNoise(NoiseGenerator):
    """
    Generate complex uniform noise.
    Useful for testing robustness of DOA algorithms.
    """

    def generate(self) -> np.ndarray:
        """
        Generate complex uniform noise samples.

        Returns:
            np.ndarray: Complex noise matrix of shape (num_sensors, num_snapshots)
        """
        noise_real = np.random.uniform(
            -1, 1, (self.parameters.num_sensors, self.parameters.num_snapshots)
        )
        noise_imag = np.random.uniform(
            -1, 1, (self.parameters.num_sensors, self.parameters.num_snapshots)
        )
        return (noise_real + 1j * noise_imag) / np.sqrt(2)


class LaplacianNoise(NoiseGenerator):
    """
    Generate complex Laplacian noise.
    Used to model impulsive noise in the environment.
    """

    def generate(self) -> np.ndarray:
        """
        Generate complex Laplacian noise samples.

        Returns:
            np.ndarray: Complex noise matrix of shape (num_sensors, num_snapshots)
        """
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


def apply_snr_scaling(
    signal: np.ndarray, noise: np.ndarray, snr_db: float
) -> np.ndarray:
    """
    Scale noise according to desired SNR.

    Args:
        signal: Signal matrix
        noise: Noise matrix
        snr_db: Desired Signal-to-Noise Ratio in dB

    Returns:
        np.ndarray: Scaled noise matrix
    """
    signal_power = np.mean(np.abs(signal) ** 2)
    noise_power = np.mean(np.abs(noise) ** 2)

    scaling_factor = np.sqrt(signal_power / (noise_power * 10 ** (snr_db / 10)))
    return noise * scaling_factor
