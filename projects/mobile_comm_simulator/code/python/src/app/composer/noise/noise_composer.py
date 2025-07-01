from typing import Optional
from enum import Enum

from .noise_distributions import (
    NoiseGenerator,
    NoiseParameters,
    GaussianNoise,
    UniformNoise,
    LaplacianNoise,
)


class NoiseType(Enum):
    GAUSSIAN = "gaussian"
    UNIFORM = "uniform"
    LAPLACIAN = "laplacian"


def noise_generator_composer(
    num_snapshots: int = 1000,
    num_sensors: int = 8,
    noise_type: NoiseType = NoiseType.GAUSSIAN,
    snr_db: float = 10.0,
    seed: Optional[int] = None,
) -> NoiseGenerator:
    """
    Compose a noise generator based on specified parameters.

    Args:
        num_snapshots: Number of time samples
        num_sensors: Number of array elements
        noise_type: Type of noise distribution
        snr_db: Signal-to-Noise Ratio in dB
        seed: Random seed for reproducibility

    Returns:
        NoiseGenerator: Configured noise generator instance
    """
    parameters = NoiseParameters(
        num_snapshots=num_snapshots, num_sensors=num_sensors, snr_db=snr_db, seed=seed
    )

    noise_generators = {
        NoiseType.GAUSSIAN: GaussianNoise,
        NoiseType.UNIFORM: UniformNoise,
        NoiseType.LAPLACIAN: LaplacianNoise,
    }

    generator_class = noise_generators.get(noise_type)
    if not generator_class:
        raise ValueError(f"Unsupported noise type: {noise_type}")

    return generator_class(parameters)
