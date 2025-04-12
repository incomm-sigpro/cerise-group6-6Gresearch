"""
This module contains the main function for running the DOA estimation simulation.
It initializes the simulation parameters, generates signals and noise, and
computes the received signal.
It also handles logging and error management.
"""

import logging

from configs.simulation_parameters import SimulationParameters, SimulationConfig
from models.repositories.noise_repository import NoiseRepository
from models.repositories.signal_repository import SignalRepository

def setup_logging() -> None:
    """Configure logging for the simulation."""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )

def run_simulation() -> None:
    """Run the main DOA estimation simulation pipeline."""
    setup_logging()
    logger = logging.getLogger(__name__)

    logger.info("Starting the simulation...")

    try:
        # Initialize simulation parameters
        config = SimulationConfig(
            num_snapshots=100,
            num_sensors=10,
            snr_db=0.0,
            geometry="linear",
            array_elements_spacing='uniform',
            center_frequency=0.8e9,
            source_angles=[-30, 0, 45],
            source_powers=[1.0, 1.0, 1.0],
            noise_type="noiseless",
        )

        simulation_parameters = SimulationParameters(config)

        # Initialize signal generator
        logger.info("Initializing signal generator...")
        signal_generator = SignalRepository(
            db_connection=None,
            array_params=simulation_parameters.get_array_parameters(),
            source_params=simulation_parameters.get_source_parameters()
        )

        # Generate signals
        logger.info("Generating signals...")
        signal_matrix_x = signal_generator.generate()

        # Initialize noise generator
        logger.info("Initializing noise generator...")
        noise_generator = NoiseRepository(
            db_connection=None,
            parameters=simulation_parameters.get_noise_parameters()
            )

        logger.info("Generating noise...")
        noise_matrix_n = noise_generator.generate()
        noise_matrix_n_scaled = noise_generator.apply_snr_scaling(signal_matrix_x, noise_matrix_n)

        # Final received signal
        received_signal_y = signal_matrix_x + (noise_matrix_n_scaled @ noise_matrix_n_scaled.T)
        
        # Log the received signal
        logger.info("Received signal matrix: %s", received_signal_y)

        logger.info("Simulation completed successfully")

    except Exception as e:
        logger.error("Simulation failed: %s", str(e))
        raise
