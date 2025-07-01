"""
Test file for verifying the functionality of Uniform Circular Array (UCA) visualization.
"""

# import pytest
import numpy as np

from views.array_geometry.array_geometry_view import ArrayGeometryView
from configs.types import GeometryType, SpacingType
from models.repositories.array_geometry_repository import (
    ArrayParameters,
    ArrayGeometryRepository,
)


def test_uca_visualization_2d():
    """Test for 2D Uniform Circular Array visualization."""
    num_sensors = 16
    array_params = ArrayParameters(
        num_sensors=num_sensors,
        num_snapshots=100,
        geometry=GeometryType.CIRCULAR,
        array_elements_spacing=SpacingType.UNIFORM,
        wavelength=1.0,
    )
    repo = ArrayGeometryRepository(db_connection=None, array_params=array_params)
    positions = repo.generate_array_structure()
    view = ArrayGeometryView(wait_time=5)
    view.plot_sensor_positions(positions=positions, title="UCA Visualization")

    # Verificações
    assert positions.shape == (num_sensors, 2)

    # Verificar se todos os pontos estão aproximadamente a um mesmo raio
    radii = np.sqrt(positions[:, 0] ** 2 + positions[:, 1] ** 2)
    mean_radius = np.mean(radii)
    assert np.allclose(radii, mean_radius, atol=1e-6)  # Raio constante (UCA ideal)
