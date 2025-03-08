"""
This module contains the configuration parameters for the simulation.
"""

from dataclasses import dataclass
from typing import List, Optional

from models.repositories.noise_repository import NoiseType, NoiseParameters
from models.repositories.signal_repository import ArrayParameters, SourceParameters
from utils.convert_angle_to_frequency import convert_angle_to_frequency

@dataclass
class SimulationConfig:
    """Essential simulation configuration parameters."""
    # Basic simulation parameters
    num_snapshots: int
    num_sensors: int

    # Array parameters
    array_spacing: float  # in wavelengths
    center_frequency: float  # Hz

    # Noise parameters
    snr_db: float = 0.0
    noise_type: NoiseType = NoiseType.GAUSSIAN

    # Source parameters
    source_angles: List[float] = None  # degrees: -90 to 90
    source_powers: Optional[List[float]] = None  # if None, all sources have equal power
    source_frequencies: Optional[List[float]] = None  # it depends on the source_angles variable

    # Optional parameters
    seed: Optional[int] = None
    speed_of_light: float = 3e8  # m/s

class SimulationParameters:
    """
    Main class for managing simulation parameters.
    Provides methods to get specific parameter sets for different components.
    """

    def __init__(self, config: SimulationConfig):
        """
        Initialize simulation parameters.
        
        Args:
            config: Essential configuration parameters for the simulation
        """
        self.config = config
        self._validate_parameters()
        self._process_source_parameters()

    def _validate_parameters(self) -> None:
        """Validate simulation parameters."""
        if self.config.num_snapshots <= 0:
            raise ValueError("Number of samples must be positive")
        if self.config.num_sensors <= 1:
            raise ValueError("Number of sensors must be greater than 1")
        if self.config.array_spacing <= 0:
            raise ValueError("Array spacing must be positive")
        if self.config.center_frequency <= 0:
            raise ValueError("Center frequency must be positive")
        if not self.config.source_angles:
            raise ValueError("At least one source angle must be provided")

    def _process_source_parameters(self) -> None:
        """Process and validate source parameters."""
        num_sources = len(self.config.source_angles)

        # Process source powers
        if self.config.source_powers is None:
            self.config.source_powers = [1.0] * num_sources
        elif len(self.config.source_powers) != num_sources:
            raise ValueError("Number of source powers must match number of angles")

        # Process source frequencies
        if self.config.source_frequencies is None:
            self.config.source_frequencies = convert_angle_to_frequency(
                angles=self.config.source_angles
            )
        elif len(self.config.source_frequencies) != num_sources:
            raise ValueError("Number of source frequencies must match number of angles")

    def get_noise_parameters(self) -> NoiseParameters:
        """Get parameters for noise generation."""
        return NoiseParameters(
            num_snapshots=self.config.num_snapshots,
            num_sensors=self.config.num_sensors,
            snr_db=self.config.snr_db,
            seed=self.config.seed
        )

    def get_array_parameters(self) -> ArrayParameters:
        """Get parameters for array geometry."""
        return ArrayParameters(
            num_sensors=self.config.num_sensors,
            spacing=self.config.array_spacing,
            center_frequency=self.config.center_frequency,
            speed_of_light=self.config.speed_of_light
        )

    def get_source_parameters(self) -> SourceParameters:
        """Get parameters for signal sources."""
        return SourceParameters(
            angles=self.config.source_angles,
            powers=self.config.source_powers,
            frequencies=self.config.source_frequencies
        )

    def get_noise_type(self) -> NoiseType:
        """Get configured noise type."""
        return self.config.noise_type

    def get_num_snapshots(self) -> int:
        """Get number of samples."""
        return self.config.num_snapshots

    @property
    def seed(self) -> Optional[int]:
        """Get random seed."""
        return self.config.seed
