"""
@file   types.py
@brief  This file contains the definition of various types and
enums used in the simulation parameters.
@details
This module defines the following types and enums:
- SimulationConfig: Essential simulation configuration parameters.
- SimulationParameters: Main class for managing simulation parameters.
- GeometryType: Enum class for array geometry types.
- SpacingType: Enum class for array spacing types.
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import List, Optional


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
    NESTED = "nested"
    CO_PRIME = "co-prime"


class NoiseType(Enum):
    """Enum class for noise types."""

    GAUSSIAN = "gaussian"
    UNIFORM = "uniform"
    LAPLACIAN = "laplacian"
    NONE = "noiseless"


@dataclass
class ArrayParameters:
    """Parameters for array geometry."""

    num_sensors: int
    num_snapshots: int
    geometry: GeometryType
    array_elements_spacing: SpacingType
    wavelength: float  # Wavelength in meters


@dataclass
class SourceParameters:
    """Parameters for signal sources."""

    num_sources: int = 1
    powers: List[float] = field(default_factory=lambda: [1.0])  # Power of each source
    center_frequency: float = 0.8e9  # Hz
    mechanical_angles: List[float] = field(
        default_factory=lambda: [0.0]
    )  # Angles of the sources (θ) in degrees
    electrical_frequencies: List[float] = field(
        default_factory=lambda: [0.0]
    )  # Electrical frequencies of the sources sin(θ) in radians


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
    wavelength: float = None  # if None, it will be calculated from the center_frequency
    source_angles: List[float] = field(
        default_factory=lambda: [0.0]
    )  # degrees: -90 to 90
    source_powers: Optional[List[float]] = field(
        default_factory=lambda: [1.0]
    )  # if None, all sources have equal power
    source_frequencies: Optional[List[float]] = (
        None  # it depends on the source_angles variable
    )

    # Noise parameters
    snr_db: float = 0.0
    noise_type: NoiseType = NoiseType.GAUSSIAN

    # Optional parameters
    seed: Optional[int] = None
    speed_of_light: float = 3e8  # m/s
