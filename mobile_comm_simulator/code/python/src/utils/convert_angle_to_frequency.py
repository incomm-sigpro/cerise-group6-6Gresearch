"""
This module contains the function to convert angles to frequencies.
"""

import numpy as np

def convert_angle_to_frequency(**kwargs):
    """
    Convert angles to electrical frequencies according to the formulation of wave number k.

    Args:
        angles: List of angles in degrees.

    Returns:
        List of frequencies in radians.
    """
    if "angles" not in kwargs.keys():
        raise ValueError("Ângulo não especificado.")

    return np.sin(np.array(kwargs["angles"]) * np.pi / 180)
