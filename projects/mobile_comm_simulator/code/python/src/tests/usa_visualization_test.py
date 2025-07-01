"""
Test for 3D Spherical Array visualization using ArrayGeometryView.
"""

from views.array_geometry.array_geometry_view import ArrayGeometryView
from configs.simulation_parameters import GeometryType, SpacingType
from models.repositories.array_geometry_repository import ArrayParameters
from models.repositories.array_geometry_repository import ArrayGeometryRepository
import numpy as np


def test_spherical_array_visualization_2d():
    """Test for 3D Spherical array visualization (theta, phi)."""
    array_params = ArrayParameters(
        num_sensors=8,
        num_snapshots=100,
        geometry=GeometryType.SPHERICAL,
        array_elements_spacing=SpacingType.UNIFORM,
        wavelength=1.0,
    )
    repo = ArrayGeometryRepository(db_connection=None, array_params=array_params)
    positions = repo.generate_array_structure()
    view = ArrayGeometryView(wait_time=5)
    view.plot_sensor_positions(
        positions=positions, title="Spherical Array Visualization (θ, φ)"
    )

    # Verificações básicas
    assert view is not None
    assert isinstance(positions, np.ndarray)
    assert positions.shape[1] == 3  # (r, theta, phi)
    assert (
        positions.shape[0] >= array_params.num_sensors**2
    )  # meshgrid combina os ângulos

    # Valores de theta e phi devem estar dentro dos limites [0, π] e [0, 2π]
    # theta = positions[:, 0]
    # phi = positions[:, 1]
    # assert np.all(theta >= 0) and np.all(theta <= np.pi)
    # assert np.all(phi >= 0) and np.all(phi <= 2 * np.pi)
