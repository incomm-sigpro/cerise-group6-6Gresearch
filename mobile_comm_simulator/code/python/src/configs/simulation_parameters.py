"""
This module contains the configuration parameters for the simulation.
"""

import warnings
from dataclasses import dataclass, field
from typing import List, Optional
from enum import Enum

from models.repositories.noise_repository import NoiseType, NoiseParameters
from models.repositories.signal_repository import ArrayParameters, SourceParameters
from utils.convert_angle_to_frequency import convert_angle_to_frequency

class GeometryType(Enum):
    """Enum class for array geometry types."""
    LINEAR = "linear"
    CIRCULAR = "circular"
    PLANAR = "planar"
    RANDOM = "random"
    SPHERICAL = "spherical"
    CUBIC = "cubic"

class SpacingType(Enum):
    """Enum class for array spacing types."""
    UNIFORM = "uniform"
    NON_UNIFORM = "non-uniform"
    SPARSE = "sparse"
    NESTED = "nested"
    CO_PRIME = "co-prime"

@dataclass
class SimulationConfig:
    """Essential simulation configuration parameters."""
    # Basic simulation parameters
    num_snapshots: int = 100
    num_sensors: int = 10

    # Array parameters
    geometry: GeometryType = GeometryType.LINEAR
    array_elements_spacing: SpacingType = SpacingType.UNIFORM

    # Source parameters
    center_frequency: float = 0.8e9  # Hz
    wavelength: float = None  # m, if None, it will be calculated from the center_frequency
    source_angles: List[float] = field(default_factory=lambda: [0.0])  # degrees: -90 to 90
    source_powers: Optional[List[float]] = field(default_factory=lambda: [1.0])  # if None, all sources have equal power
    source_frequencies: Optional[List[float]] = None  # it depends on the source_angles variable

    # Noise parameters
    snr_db: float = 0.0
    noise_type: NoiseType = NoiseType.GAUSSIAN

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
        # Initialize parameters
        self.config = config
        self._validate_parameters()
        self._process_source_parameters()

    def _validate_parameters(self) -> None:
        """Validate simulation parameters."""
        
        # Validate Enum types
        try:
            GeometryType(self.config.geometry)
            SpacingType(self.config.array_elements_spacing)
            NoiseType(self.config.noise_type)
        except ValueError as e:
            raise ValueError(f"Invalid enum value: {e}")

        # Validate basic parameters
        if self.config.num_snapshots <= 1:
            raise ValueError("Number of snapshots must be greater than 1")
        if self.config.num_sensors <= 1:
            raise ValueError("Number of sensors must be greater than 1")
        if self.config.center_frequency <= 0:
            raise ValueError("Center frequency must be non-negative")
        if not self.config.source_angles:
            warnings.warn("System in idle state. At least one source angle must be provided", category=RuntimeWarning)
        if GeometryType(self.config.geometry) not in GeometryType:
            raise ValueError(f"Unsupported geometry type: {self.config.geometry}")
        if SpacingType(self.config.array_elements_spacing) not in SpacingType:
            raise ValueError(f"Unsupported spacing type: {self.config.array_elements_spacing}")

        print(self.config.source_angles)

    def _process_source_parameters(self) -> None:
        """Process and validate source parameters."""
        self.config.num_sources = len(self.config.source_angles) if self.config.source_angles else 0

        # Process source angles, powers, and frequencies
        if self.config.source_angles is None or self.config.num_sources == 0:
            # If no source angles are provided, set powers and frequencies to None
            # and issue a warning
            self.config.source_powers = None
            self.config.source_frequencies = [] if self.config.source_angles == [] else None
            warnings.warn(
                "System in idle state. At least one source angle must be provided",
                category=RuntimeWarning
            )
        elif self.config.source_powers is None and self.config.num_sources > 0:
            # If no source powers are provided, but there is at least one source
            # set their power to equal values and issue a warning
            self.config.source_powers = [1.0] * self.config.num_sources
            warnings.warn(
                "No source powers provided. Setting all to 1.0",
                category=RuntimeWarning
            )
            self.config.source_frequencies = convert_angle_to_frequency(
                angles=self.config.source_angles
            )
        elif len(self.config.source_powers) != self.config.num_sources:
            raise ValueError("Number of source powers must match number of angles")

    def get_noise_parameters(self) -> NoiseParameters:
        """Get parameters for noise generation."""
        return NoiseParameters(
            noise_type=self.config.noise_type,
            num_snapshots=self.config.num_snapshots,
            num_sensors=self.config.num_sensors,
            snr_db=self.config.snr_db,
            seed=self.config.seed
        )

    def get_array_parameters(self) -> ArrayParameters:
        """Get parameters for array geometry."""
        return ArrayParameters(
            num_sensors=self.config.num_sensors,
            num_snapshots=self.config.num_snapshots,
            geometry=self.config.geometry,
            array_elements_spacing=self.config.array_elements_spacing,
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
        
    def get_simulation_parameters(self):
        """Get all simulation parameters."""
        return self.config

    @property
    def seed(self) -> Optional[int]:
        """Get random seed."""
        return self.config.seed
