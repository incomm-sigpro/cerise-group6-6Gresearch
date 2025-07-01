"""
This test file is designed to validate the functionality of the SignalRepository class.
It includes tests for the generation of received signals, steering matrices, and noise addition.
"""

import pytest
import numpy as np

# import numpy as np
from utils.direction_vectors import get_wave_vector_from_angles
from configs.types import ArrayParameters, SourceParameters, GeometryType, SpacingType
from models.repositories.signal_repository import SignalRepository


@pytest.fixture
def array_params():
    """
    Fixture to create an instance of ArrayParameters for testing.
    """
    return ArrayParameters(
        num_sensors=10,
        num_snapshots=100,
        geometry=GeometryType.LINEAR,
        array_elements_spacing=SpacingType.UNIFORM,
        wavelength=0.3,
    )


@pytest.fixture
def source_params():
    """
    Fixture to create an instance of SourceParameters for testing.
    """
    return SourceParameters(
        num_sources=1,
        mechanical_angles=[30],
        electrical_frequencies=[np.sin(np.radians(30))],
    )


@pytest.fixture
def signal_repository(
    array_params, source_params
):  # pylint: disable=redefined-outer-name
    """
    Fixture to create an instance of SignalRepository for testing.
    """
    return SignalRepository(None, array_params, source_params)


# @pytest.mark.skip(reason="Skipping test for now")
def test_steering_matrix(
    signal_repository: SignalRepository,
):  # pylint: disable=redefined-outer-name
    """
    Test the generation of the steering matrix in the SignalRepository class.
    """

    # Create an instance of SignalRepository
    sensor_positions = signal_repository.array_geometry.generate_array_structure()
    wave_vectors = get_wave_vector_from_angles(
        signal_repository.source_params.mechanical_angles,
        dimension=sensor_positions.shape[1],
    )

    steering_matrix_A = signal_repository.steering_matrix(
        wave_vectors
    )  # pylint: disable=invalid-name

    print(wave_vectors)
    print(steering_matrix_A)

    # Validate the shape of the generated steering vectors
    assert wave_vectors.shape == (signal_repository.source_params.num_sources, 1)
    assert str(wave_vectors.dtype) == "float64"
    assert steering_matrix_A.shape == (
        signal_repository.array_params.num_sensors,
        signal_repository.source_params.num_sources,
    )
    assert str(steering_matrix_A.dtype) == "complex128"


# @pytest.mark.skip(reason="Skipping test for now")
def test_generate_sources(
    signal_repository: SignalRepository,  # pylint: disable=redefined-outer-name
):
    """
    Test the generation of sources in the SignalRepository class.
    """

    # Generate sources
    signal_matrix_S = signal_repository.generate_sources()

    # Validate the shape of the generated sources
    assert signal_matrix_S.shape == (
        signal_repository.source_params.num_sources,
        signal_repository.array_params.num_snapshots,
    )
    assert str(signal_matrix_S.dtype) == "complex128"
    assert signal_matrix_S[0, 0] != 0
    # assert signal_matrix_S[1, 0] != 0
    # assert signal_matrix_S[2, 0] != 0


# @pytest.mark.skip(reason="Skipping test for now")
def test_received_signal_generation(
    signal_repository: SignalRepository,
):  # pylint: disable=redefined-outer-name
    """
    Test the generation of the received signal in the SignalRepository class.
    """

    # Generate received signals
    received_signal = signal_repository.generate_received_signal()

    # Validate the shape of the generated received signals
    assert received_signal.shape == (
        signal_repository.array_params.num_sensors,
        signal_repository.array_params.num_snapshots,
    )
    assert received_signal.dtype == complex


# @pytest.mark.skip(reason="Skipping test for now")
def test_received_signal_use(
    signal_repository: SignalRepository,
):  # pylint: disable=redefined-outer-name
    """
    Test the use of the received signal in the SignalRepository class.
    """

    # Generate received signals
    received_signal = signal_repository.generate_received_signal()

    # Generate covariance matrix
    covariance_matrix = received_signal @ received_signal.conj().T
    covariance_matrix /= signal_repository.array_params.num_snapshots

    assert covariance_matrix.shape == (
        signal_repository.array_params.num_sensors,
        signal_repository.array_params.num_sensors,
    )


def test_signal_repository_generation(
    signal_repository: SignalRepository,
):  # pylint: disable=redefined-outer-name
    """
    Test the generation of signals in the SignalRepository class.
    """

    # Generate signals
    persisted_db = signal_repository.create_signal(1, 3)

    # Validate the shape of the generated signals
    assert persisted_db == "None. Signal persisted in the database...\n"
