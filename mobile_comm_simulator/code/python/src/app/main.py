"""
This module contains the main function for running the DOA estimation simulation.
It initializes the simulation parameters, generates signals and noise, and
computes the received signal.
It also handles logging and error management.
"""

import logging

from configs.types import GeometryType, SpacingType, NoiseType, SimulationConfig
from configs.simulation_parameters import SimulationParameters
from models.repositories.noise_repository import NoiseRepository
from models.repositories.signal_repository import SignalRepository


def setup_logging() -> None:
    """Configure logging for the simulation."""
    logging.basicConfig(
        level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
    )


def run_simulation() -> None:
    """Run the main DOA estimation simulation pipeline."""
    setup_logging()
    logger = logging.getLogger(__name__)

    logger.info("Starting the simulation...")

    try:
        # Initialize simulation parameters
        config = SimulationConfig(
            num_sensors=4,
            num_snapshots=100,
            snr_db=0.0,
            geometry=GeometryType.LINEAR,
            array_elements_spacing=SpacingType.UNIFORM,
            center_frequency=0.8e9,
            source_angles=[-30, 0, 45],
            source_powers=[1.0, 1.0, 1.0],
            noise_type=NoiseType.NONE,
        )

        simulation_parameters = SimulationParameters(config)

        # Initialize signal generator
        logger.info("Initializing signal generator...")
        signal_generator = SignalRepository(
            db_connection=None,
            array_params=simulation_parameters.get_array_parameters(),
            source_params=simulation_parameters.get_source_parameters(),
        )

        # Generate signals
        logger.info("Generating signals...")
        signal_matrix_X = (
            signal_generator.generate_received_signal()
        )  # pylint: disable=invalid-name

        # Initialize noise generator
        logger.info("Initializing noise generator...")
        noise_generator = NoiseRepository(
            db_connection=None, parameters=simulation_parameters.get_noise_parameters()
        )

        logger.info("Generating noise...")
        noise_matrix_n = noise_generator.generate()
        noise_matrix_n_scaled = noise_generator.apply_snr_scaling(
            signal_matrix_X, noise_matrix_n
        )

        # Final received signal
        received_signal_y = signal_matrix_X + noise_matrix_n_scaled

        # Log the received signal
        logger.info(
            "Covariance Matrix: %s", received_signal_y @ received_signal_y.conj().T
        )

        logger.info("Simulation completed successfully")

    except Exception as e:
        logger.error("Simulation failed: %s", str(e))
        raise
