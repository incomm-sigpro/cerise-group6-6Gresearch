import numpy as np
from dataclasses import dataclass
from typing import Union, List, Optional


@dataclass
class ULAParameters:
    """Parameters for Uniform Linear Array."""

    num_sensors: int
    spacing: float  # Inter-element spacing in wavelengths
    center_frequency: float  # Hz
    speed_of_light: float = 3e8  # m/s


class UniformLinearArray:
    """
    Uniform Linear Array (ULA) implementation.

    This class implements a 1D ULA with configurable parameters and
    provides methods to generate steering vectors and array responses.
    """

    def __init__(self, parameters: ULAParameters):
        self.parameters = parameters
        self.wavelength = (
            self.parameters.speed_of_light / self.parameters.center_frequency
        )
        self.d = self.parameters.spacing * self.wavelength

        # Generate sensor positions (centered around 0)
        self.sensor_positions = self._generate_sensor_positions()

    def _generate_sensor_positions(self) -> np.ndarray:
        """Generate sensor positions for ULA."""
        start_pos = -(self.parameters.num_sensors - 1) * self.d / 2
        positions = np.arange(self.parameters.num_sensors) * self.d + start_pos
        return positions

    def steering_vector(self, theta: Union[float, np.ndarray]) -> np.ndarray:
        """
        Generate steering vector(s) for given angle(s).

        Args:
            theta: Angle(s) in degrees relative to broadside (0°)
                  Positive angles are measured clockwise

        Returns:
            np.ndarray: Steering vector(s) of shape (num_sensors,) or (num_sensors, num_angles)
        """
        theta_rad = np.deg2rad(theta)
        k = 2 * np.pi / self.wavelength  # Wave number

        # Calculate phase differences
        phase = k * self.sensor_positions[:, np.newaxis] * np.sin(theta_rad)
        return np.exp(1j * phase)
