"""
Test for 3D Cubic Array visualization using ArrayGeometryView.
"""

from views.array_geometry.array_geometry_view import ArrayGeometryView
from configs.simulation_parameters import GeometryType, SpacingType
from models.repositories.array_geometry_repository import ArrayParameters
from models.repositories.array_geometry_repository import ArrayGeometryRepository
import numpy as np


def test_cubic_array_visualization_3d():
    """Test for 3D Cubic array visualization."""
    array_params = ArrayParameters(
        num_sensors=3,  # Defines cubic structure (3x3x3 = 27 sensors)
        num_snapshots=100,
        geometry=GeometryType.CUBIC,
        array_elements_spacing=SpacingType.UNIFORM,
        wavelength=1.0,
    )
    repo = ArrayGeometryRepository(db_connection=None, array_params=array_params)
    positions = repo.generate_array_structure()
    view = ArrayGeometryView(wait_time=5)
    view.plot_sensor_positions(
        positions=positions, title="3D Cubic Array Visualization"
    )

    # Basic Verifications
    assert view is not None
    assert isinstance(positions, np.ndarray)
    assert positions.shape[1] == 3  # (x, y, z)
    assert positions.shape[0] == array_params.num_sensors**3  # 3³ = 27 sensors

    # Check if all coordinates are within the expected range
    max_coord = (array_params.num_sensors - 1) * 0.5
    assert np.all(positions >= 0.0)
    assert np.all(positions <= max_coord)
