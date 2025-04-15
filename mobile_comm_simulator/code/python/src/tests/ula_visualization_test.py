"""
Test file to verify the functionality of the ULA visualization module.
This module contains tests for the ArrayGeometryView class, which is responsible
for visualizing the sensor positions in the array.
The tests include:
- Test for 1D array visualization
- Test for 2D array visualization
- Test for 3D array visualization
- Test for invalid dimensionality
- Test for empty array
- Test for single sensor array
- Test for multiple sensors in 2D
- Test for multiple sensors in 3D
- Test for invalid positions
- Test for non-numeric positions
- Test for NaN values in positions
- Test for empty positions
- Test for negative positions
- Test for large array
- Test for small array
- Test for array with different spacings
"""

# import pytest
# import numpy as np

from views.array_geometry.array_geometry_view import ArrayGeometryView
from configs.simulation_parameters import GeometryType, SpacingType
from models.repositories.array_geometry_repository import ArrayParameters
from models.repositories.array_geometry_repository import ArrayGeometryRepository


# @pytest.mark.skip
def test_ula_visualization_1d():
    """Test for 1D array visualization."""
    array_params = ArrayParameters(
        num_sensors=8,
        num_snapshots=100,
        geometry=GeometryType.LINEAR,
        array_elements_spacing=SpacingType.UNIFORM,
        wavelength=1.0,
    )
    repo = ArrayGeometryRepository(db_connection=None, array_params=array_params)
    positions = repo.generate_array_structure()
    view = ArrayGeometryView(wait_time=5)
    view.plot_sensor_positions(positions=positions, title="1D Array Visualization")
    assert view is not None
    assert positions.shape == (array_params.num_sensors, 1)
    if array_params.array_elements_spacing == SpacingType.UNIFORM:
        assert positions[0, 0] == 0.0
        assert positions[1, 0] == 0.5
        assert positions[2, 0] == 1.0
        assert positions[3, 0] == 1.5
        assert positions[4, 0] == 2.0
        assert positions[5, 0] == 2.5
        assert positions[6, 0] == 3.0
        assert positions[7, 0] == 3.5
