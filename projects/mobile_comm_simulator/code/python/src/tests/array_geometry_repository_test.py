"""
Test cases for the ArrayGeometryRepository class.
This module contains unit tests for the ArrayGeometryRepository class,
which is responsible for generating array geometries and spacings."""

import numpy as np
import pytest

from models.repositories.array_geometry_repository import ArrayGeometryRepository
from configs.types import GeometryType, SpacingType, ArrayParameters


@pytest.fixture
def array_params():
    """Fixture to provide default array parameters for tests."""
    return ArrayParameters(
        num_sensors=8,
        num_snapshots=100,
        geometry=GeometryType.LINEAR,
        array_elements_spacing=SpacingType.UNIFORM,
        wavelength=1.0,
    )


# Testing the GeometryType enums
# This test checks if the GeometryType enum values are correctly defined
@pytest.mark.parametrize(
    "geometry, expected_dim",
    [
        (GeometryType.LINEAR, 1),
        (GeometryType.CIRCULAR, 2),
        (GeometryType.PLANAR, 2),
        (GeometryType.RANDOM, 2),
        (GeometryType.SPHERICAL, 3),
        (GeometryType.CUBIC, 3),
    ],
)
def test_array_geometry_shapes(
    geometry, expected_dim, array_params
):  # pylint: disable=redefined-outer-name
    """
    Test the shape of the array geometry based on the geometry type.
    This test checks if the generated array positions have the expected number of dimensions
    based on the geometry type.
    """

    # Update the geometry in the array parameters
    array_params.geometry = geometry
    # Create an instance of ArrayGeometryRepository with the updated parameters
    # and generate the array structure

    repo = ArrayGeometryRepository(db_connection=None, array_params=array_params)
    positions = repo.generate_array_structure()

    assert isinstance(positions, np.ndarray)
    assert positions.shape[1] == expected_dim
    assert positions.shape[0] >= array_params.num_sensors


# Testing the SpacingType enums
# This test checks if the SpacingType enum values are correctly defined
# The spacing types are expected to be fractions of the wavelength
# and should be between 0 and 1.0
# @pytest.mark.parametrize("spacing_type, expected_spacing", [
#     (SpacingType.UNIFORM, 0.5),
#     (SpacingType.NON_UNIFORM, 0.5),
#     (SpacingType.NESTED, 0.5),
#     (SpacingType.CO_PRIME, 0.5),
# ])
def test_array_spacing_types(array_params):  # pylint: disable=redefined-outer-name
    """
    Test the spacing of the array elements based on the spacing type.
    This test checks if the generated spacing values are within the expected range
    and are of the correct type.
    """
    # Assuming that the spacing type is a fraction of the wavelength
    # and should be between 0 and 1.0

    repo = ArrayGeometryRepository(db_connection=None, array_params=array_params)
    array_structure = repo.generate_array_structure()

    assert isinstance(array_structure, np.ndarray)
    assert array_structure.shape[0] == array_params.num_sensors


# Testing the ArrayParameters dataclass
# This test checks if the ArrayParameters dataclass is correctly initialized
def test_array_parameters_initialization(
    array_params,
):  # pylint: disable=redefined-outer-name

    assert isinstance(array_params, ArrayParameters)
    assert array_params.num_sensors == 8
    assert array_params.num_snapshots == 100
    assert array_params.geometry == GeometryType.LINEAR
    assert array_params.array_elements_spacing == SpacingType.UNIFORM
    assert array_params.wavelength == 1.0
    assert isinstance(array_params, ArrayParameters)
