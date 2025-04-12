import numpy as np
import pytest

from models.repositories.array_geometry_repository import ArrayGeometryRepository, ArrayParameters
from configs.simulation_parameters import GeometryType, SpacingType

@pytest.mark.parametrize("geometry, expected_dim", [
    (GeometryType.LINEAR, 1),
    (GeometryType.CIRCULAR, 2),
    (GeometryType.PLANAR, 2),
    (GeometryType.RANDOM, 2),
    (GeometryType.SPHERICAL, 2),  # θ, φ
    (GeometryType.CUBIC, 3),
])
def test_array_geometry_shapes(geometry, expected_dim):
    array_params = {
        "num_sensors": 8,
        "num_snapshots": 100,
        "geometry": geometry,
        "array_elements_spacing": 0.5,
        "wavelength": 1.0,
    }
    repo = ArrayGeometryRepository(db_connection="test", array_params=array_params)
    positions = repo.generate_array_structure()

    assert isinstance(positions, np.ndarray)
    assert positions.shape[1] == expected_dim
    assert positions.shape[0] >= array_params["num_sensors"]
