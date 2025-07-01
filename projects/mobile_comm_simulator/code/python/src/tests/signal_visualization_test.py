"""
This module contains the main function for running the DOA estimation simulation.
It initializes the simulation parameters, generates signals and noise, and
computes the received signal.
It also handles logging and error management.
"""

import pytest
import numpy as np

from views.signal.signal_repository_view import SignalView
from models.repositories.signal_repository import SignalRepository
from models.repositories.array_geometry_repository import ArrayParameters
from configs.types import SourceParameters
from configs.types import GeometryType, SpacingType


@pytest.fixture
def array_params():
    """
    Fixture for array parameters.
    This fixture sets up the parameters for the array geometry.
    """
    return ArrayParameters(
        num_sensors=8,
        num_snapshots=100,
        geometry=GeometryType.LINEAR,
        array_elements_spacing=SpacingType.NESTED,
        wavelength=1.0,
    )


@pytest.fixture
def source_params():
    """
    Fixture for source parameters.
    This fixture sets up the parameters for the sources.
    """
    return SourceParameters(
        num_sources=1,
        mechanical_angles=[np.radians(10)],
    )


def test_signal_visualization(
    array_params, source_params
):  # pylint: disable=redefined-outer-name
    """
    Test for signal visualization using SignalView.
    """

    # Generate the received signal
    repo = SignalRepository(None, array_params, source_params)
    X = repo.generate_received_signal()

    # Visualizações
    SignalView.plot_snapshots_by_sensor(X, wait_time=None)
    SignalView.plot_covariance_heatmap(X)
    SignalView.plot_spatial_sample(X, wait_time=None)
