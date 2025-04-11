"""
  Test cases for the SimulationParameters class.
"""

import pytest

from ..configs.simulation_parameters import SimulationParameters, SimulationConfig

basic_config = {
    "num_snapshots": 100,
    "num_sensors": 10,
    "snr_db": 0.0,
    "geometry": "linear",
    "array_elements_spacing": 'uniform',
    "center_frequency": 0.8e9,
    "source_angles": [0],
    "noise_type": "noiseless",
}

invalid_config = {
    "num_snapshots": -1,
    "num_sensors": -1,
    "snr_db": "invalid",
    "geometry": "invalid_geometry",
    "array_elements_spacing": "invalid_spacing",
    "center_frequency": -1.0,
    "source_angles": [],
    "source_powers": [1.0, 2.0],
    "noise_type": "invalid_noise",
}

@pytest.fixture
def simulation_parameters():
    """Fixture to create a SimulationParameters object."""
    return SimulationParameters(SimulationConfig(**basic_config))

@pytest.fixture
def invalid_simulation_parameters():
    """Fixture to create an invalid SimulationParameters object."""
    return SimulationParameters(SimulationConfig(**invalid_config))

# @pytest.mark.skip
def test_simulation_parameters_are_created(simulation_parameters): # pylint: disable=redefined-outer-name
    """Test that simulation parameters are created correctly."""
    assert simulation_parameters is not None
    assert isinstance(simulation_parameters, SimulationParameters)
    assert simulation_parameters.get_simulation_parameters() is not None
    assert simulation_parameters.get_simulation_parameters().num_snapshots == 100
    assert simulation_parameters.get_simulation_parameters().num_sensors == 10
    assert simulation_parameters.get_simulation_parameters().snr_db == 0.0
    assert simulation_parameters.get_simulation_parameters().geometry == "linear"
    assert simulation_parameters.get_simulation_parameters().array_elements_spacing == 'uniform'
    assert simulation_parameters.get_simulation_parameters().center_frequency == 0.8e9
    assert simulation_parameters.get_simulation_parameters().source_angles == [0]
    assert simulation_parameters.get_simulation_parameters().source_powers == [1.0]
    assert simulation_parameters.get_simulation_parameters().noise_type == "noiseless"
    assert simulation_parameters.get_simulation_parameters().num_sources == 1

# @pytest.mark.skip
@pytest.mark.parametrize(
    "num_snapshots, expected",
    [
        (0, "Number of snapshots must be greater than 1"),
        (1, "Number of snapshots must be greater than 1"),
        (2, None),
        (100, None),
    ]
)
def test_num_snapshots(num_snapshots, expected):
    """Test the number of snapshots."""
    if expected:
        with pytest.raises(ValueError, match=expected):
            SimulationParameters(SimulationConfig(num_snapshots=num_snapshots))
    else:
        simul_params = SimulationParameters(SimulationConfig(num_snapshots=num_snapshots))
        assert simul_params.get_simulation_parameters().num_snapshots == num_snapshots

# @pytest.mark.skip
@pytest.mark.parametrize(
    "num_sensors, expected",
    [
        (0, "Number of sensors must be greater than 1"),
        (1, "Number of sensors must be greater than 1"),
        (2, None),
        (100, None),
    ]
)
def test_num_sensors(num_sensors, expected):
    """Test the number of sensors."""
    if expected:
        with pytest.raises(ValueError, match=expected):
            SimulationParameters(SimulationConfig(num_sensors=num_sensors))
    else:
        simul_params = SimulationParameters(SimulationConfig(num_sensors=num_sensors))
        assert simul_params.get_simulation_parameters().num_sensors == num_sensors

# @pytest.mark.skip
def test_invalid_num_snapshots():
    """Test an invalid number of snapshots."""
    with pytest.raises(ValueError, match="Number of snapshots must be greater than 1"):
        SimulationParameters(SimulationConfig(num_snapshots=invalid_config["num_snapshots"]))

# @pytest.mark.skip
def test_invalid_num_sensors():
    """Test an invalid number of sensors."""
    with pytest.raises(ValueError, match="Number of sensors must be greater than 1"):
        SimulationParameters(SimulationConfig(num_sensors=invalid_config["num_sensors"]))

# @pytest.mark.skip
def test_invalid_center_frequency():
    """Test an invalid center frequency."""
    with pytest.raises(ValueError, match="Center frequency must be non-negative"):
        SimulationParameters(SimulationConfig(center_frequency=invalid_config["center_frequency"]))

# @pytest.mark.skip
def test_invalid_source_angles():
    """Test invalid source angles."""
    with pytest.warns(
      RuntimeWarning,
      match="System in idle state. At least one source angle must be provided"
    ):
        SimulationParameters(SimulationConfig(source_angles=invalid_config["source_angles"]))

# @pytest.mark.skip
def test_invalid_source_powers():
    """Test invalid source powers."""
    with pytest.raises(ValueError, match="Number of source powers must match number of angles"):
        SimulationParameters(SimulationConfig(source_powers=invalid_config["source_powers"], source_angles=[0]))

# @pytest.mark.skip
def test_invalid_geometry():
    """Test simulation parameters with invalid geometry."""
    with pytest.raises(
      ValueError,
      match=f"Invalid enum value: '{invalid_config['geometry']}' is not a valid GeometryType"):
        SimulationParameters(SimulationConfig(geometry=invalid_config['geometry']))

# @pytest.mark.skip
def test_invalid_spacing():
    """Test simulation parameters with invalid spacing."""
    with pytest.raises(ValueError, match=f"Invalid enum value: '{invalid_config['array_elements_spacing']}' is not a valid SpacingType"):
        SimulationParameters(SimulationConfig(array_elements_spacing=invalid_config['array_elements_spacing']))

# @pytest.mark.skip
def test_invalid_noise_type():
    """Test invalid noise type."""
    with pytest.raises(
      ValueError,
      match=f"Invalid enum value: '{invalid_config['noise_type']}' is not a valid NoiseType"
    ):
        SimulationParameters(SimulationConfig(noise_type=invalid_config["noise_type"]))
