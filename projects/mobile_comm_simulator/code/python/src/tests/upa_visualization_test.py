"""
Test for 2D Planar Array visualization using ArrayGeometryView.
"""

import numpy as np
from views.array_geometry.array_geometry_view import ArrayGeometryView
from configs.simulation_parameters import GeometryType, SpacingType
from models.repositories.array_geometry_repository import ArrayParameters
from models.repositories.array_geometry_repository import ArrayGeometryRepository


def test_planar_array_visualization_2d():
    """Test for 2D Planar array visualization."""
    array_params = ArrayParameters(
        num_sensors=8,  # 2x2 planar (for simplicity in validation)
        num_snapshots=100,
        geometry=GeometryType.PLANAR,
        array_elements_spacing=SpacingType.UNIFORM,
        wavelength=1.0,
    )
    repo = ArrayGeometryRepository(db_connection=None, array_params=array_params)
    positions = repo.generate_array_structure()
    view = ArrayGeometryView(wait_time=5)
    view.plot_sensor_positions(
        positions=positions, title="2D Planar Array Visualization"
    )

    assert view is not None
    assert isinstance(positions, np.ndarray)
    assert positions.shape[1] == 2  # 2D positions
    assert (
        positions.shape[0] == array_params.num_sensors**2
    )  # meshgrid of 4x4 = 16 points

    # Optional: check corner values assuming regular spacing
    expected_spacing = 0.5
    assert (positions == 0).sum() == array_params.num_sensors * 2
    assert positions[:, 0].max() <= (array_params.num_sensors - 1) * expected_spacing
    assert positions[:, 1].max() <= (array_params.num_sensors - 1) * expected_spacing
