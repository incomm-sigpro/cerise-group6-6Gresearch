"""
This module contains the configuration parameters for the simulation.
"""

import warnings
from typing import Optional

from configs.types import GeometryType, SpacingType, NoiseType, SimulationConfig
from models.repositories.noise_repository import NoiseParameters
from models.repositories.signal_repository import ArrayParameters, SourceParameters
from utils.convert_angle_to_frequency import convert_angle_to_frequency


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
            raise ValueError(  # pylint: disable=raise-missing-from
                f"Invalid enum value: {e}"
            )

        # Validate basic parameters
        if self.config.num_snapshots <= 1:
            raise ValueError("Number of snapshots must be greater than 1")
        if self.config.num_sensors <= 1:
            raise ValueError("Number of sensors must be greater than 1")
        if self.config.center_frequency <= 0:
            raise ValueError("Center frequency must be non-negative")
        if not self.config.source_angles:
            warnings.warn(
                "System in idle state. At least one source angle must be provided",
                category=RuntimeWarning,
            )
        if GeometryType(self.config.geometry) not in GeometryType:
            raise ValueError(f"Unsupported geometry type: {self.config.geometry}")
        if SpacingType(self.config.array_elements_spacing) not in SpacingType:
            raise ValueError(
                f"Unsupported spacing type: {self.config.array_elements_spacing}"
            )

    def _process_source_parameters(self) -> None:
        """Process and validate source parameters."""
        self.config.num_sources = (
            len(self.config.source_angles) if self.config.source_angles else 0
        )
        self.config.wavelength = (
            self.config.speed_of_light / self.config.center_frequency
            if self.config.wavelength is None
            else self.config.wavelength
        )

        # Process source angles, powers, and frequencies
        if self.config.source_angles is None or self.config.num_sources == 0:
            # If no source angles are provided, set powers and frequencies to None
            # and issue a warning
            self.config.source_powers = None
            self.config.source_frequencies = (
                [] if self.config.source_angles == [] else None
            )
            warnings.warn(
                "System in idle state. At least one source angle must be provided",
                category=RuntimeWarning,
            )
        elif self.config.source_powers is None and self.config.num_sources > 0:
            # If no source powers are provided, but there is at least one source
            # set their power to equal values and issue a warning
            self.config.source_powers = [1.0] * self.config.num_sources
            warnings.warn(
                "No source powers provided. Setting all to 1.0", category=RuntimeWarning
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
            seed=self.config.seed,
        )

    def get_array_parameters(self) -> ArrayParameters:
        """Get parameters for array geometry."""
        return ArrayParameters(
            num_sensors=self.config.num_sensors,
            num_snapshots=self.config.num_snapshots,
            geometry=self.config.geometry,
            array_elements_spacing=self.config.array_elements_spacing,
            wavelength=self.config.wavelength,
        )

    def get_source_parameters(self) -> SourceParameters:
        """Get parameters for signal sources."""
        return SourceParameters(
            num_sources=self.config.num_sources,
            center_frequency=self.config.center_frequency,
            powers=self.config.source_powers,
            mechanical_angles=self.config.source_angles,
            electrical_frequencies=self.config.source_frequencies,
        )

    def get_simulation_parameters(self):
        """Get all simulation parameters."""
        return self.config

    @property
    def seed(self) -> Optional[int]:
        """Get random seed."""
        return self.config.seed
