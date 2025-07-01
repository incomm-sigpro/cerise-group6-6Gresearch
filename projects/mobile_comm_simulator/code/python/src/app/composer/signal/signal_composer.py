from configs.connection import db_connection_handler
from models.repositories.signal_repository import SignalRepository
from controllers.signal.create_signal import CreateSignal
from views.signal.create_signal_view import CreateSignalView
import numpy as np
from typing import List, Optional, Union
from dataclasses import dataclass
from .array_geometry import UniformLinearArray, ULAParameters


@dataclass
class SourceParameters:
    """Parameters for signal sources."""

    angles: List[float]  # DOA angles in degrees
    powers: List[float]  # Source powers in linear scale
    frequencies: List[float]  # Normalized frequencies (-0.5 to 0.5)


@dataclass
class SignalParameters:
    """Parameters for signal generation."""

    num_snapshots: int
    num_sensors: int
    array_spacing: float = 0.5  # Half-wavelength spacing
    center_frequency: float = 1e9  # 1 GHz
    seed: Optional[int] = None


class SignalGenerator:
    """Generate signals for DOA estimation."""

    def __init__(
        self, signal_params: SignalParameters, source_params: SourceParameters
    ):
        self.signal_params = signal_params
        self.source_params = source_params

        if signal_params.seed is not None:
            np.random.seed(signal_params.seed)

        # Initialize ULA
        ula_params = ULAParameters(
            num_sensors=signal_params.num_sensors,
            spacing=signal_params.array_spacing,
            center_frequency=signal_params.center_frequency,
        )
        self.array = UniformLinearArray(ula_params)

    def generate(self) -> np.ndarray:
        """
        Generate signal snapshots.

        Returns:
            np.ndarray: Signal matrix of shape (num_sensors, num_snapshots)
        """
        num_sources = len(self.source_params.angles)

        # Generate steering vectors for each source
        A = self.array.steering_vector(self.source_params.angles)

        # Generate source signals
        S = np.zeros((num_sources, self.signal_params.num_snapshots), dtype=complex)
        for i in range(num_sources):
            amplitude = np.sqrt(self.source_params.powers[i])
            phase = 2 * np.pi * self.source_params.frequencies[i]
            time_vector = np.arange(self.signal_params.num_snapshots)
            S[i, :] = amplitude * np.exp(1j * phase * time_vector)

        # Generate array output
        X = A @ S

        return X


def signal_generator_composer(
    num_snapshots: int = 1000,
    num_sensors: int = 8,
    source_angles: List[float] = [-30, 0, 45],
    source_powers: Optional[List[float]] = None,
    source_frequencies: Optional[List[float]] = None,
    seed: Optional[int] = None,
) -> SignalGenerator:
    """
    Compose a signal generator with specified parameters.

    Args:
        num_snapshots: Number of time samples
        num_sensors: Number of array elements
        source_angles: DOA angles in degrees
        source_powers: Source powers (default: all equal power)
        source_frequencies: Normalized frequencies (default: equally spaced)
        seed: Random seed for reproducibility

    Returns:
        SignalGenerator: Configured signal generator instance
    """
    num_sources = len(source_angles)

    if source_powers is None:
        source_powers = [1.0] * num_sources

    if source_frequencies is None:
        source_frequencies = np.linspace(0.1, 0.4, num_sources).tolist()

    signal_params = SignalParameters(
        num_snapshots=num_snapshots, num_sensors=num_sensors, seed=seed
    )

    source_params = SourceParameters(
        angles=source_angles, powers=source_powers, frequencies=source_frequencies
    )

    return SignalGenerator(signal_params, source_params)
