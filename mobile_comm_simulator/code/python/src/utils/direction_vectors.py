"""
This module provides functions to convert angles to wave propagation vectors (k̂) in D-dimensional space.
It supports 1D, 2D, and 3D angles, where:
- 1D: [θ]
- 2D: [(θ)]
- 3D: [(θ, φ)]
The angles are in degrees and the output is a numpy array of shape (num_sources, dimension).
"""

import numpy as np


def get_wave_vector_from_angles(angles_rad, dimension=1):
    """
    Converts angles to wave propagation vectors (k̂) in D-dimensional space.

    Args:
        angles_rad: list of angles (1D: [θ], 2D: [(θ)], 3D: [(θ, φ)])
        dimension: 1, 2, or 3

    Returns:
        np.ndarray: shape (num_sources, dimension)
    """

    if dimension == 1:
        # θ → sin(θ)
        return np.sin(angles_rad).reshape(-1, 1)

    elif dimension == 2:
        # θ → (cos(θ), sin(θ)) in XY
        return np.column_stack((np.cos(angles_rad), np.sin(angles_rad)))

    elif dimension == 3:
        # Cada ângulo é (θ, φ)
        angles_rad = np.atleast_2d(angles_rad)
        theta_rad, phi_rad = angles_rad  # Elevation and azimuth angles
        x = np.sin(theta_rad) * np.cos(phi_rad)
        y = np.sin(theta_rad) * np.sin(phi_rad)
        z = np.cos(theta_rad)
        return np.column_stack((x, y, z))

    else:
        raise ValueError("Only dimensions 1, 2 or 3 are supported.")
