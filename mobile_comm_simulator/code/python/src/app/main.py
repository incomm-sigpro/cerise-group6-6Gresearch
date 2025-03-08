"""
This module contains the main function for running the DOA estimation simulation.
"""

import logging

from models.repositories.noise_repository import NoiseRepository, NoiseType
from models.repositories.signal_repository import SignalRepository
from configs.simulation_parameters import SimulationParameters, SimulationConfig

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
            snr_db=10.0,
            array_spacing=0.5,
            center_frequency=0.8e9,
            source_angles=[-30, 0, 45],
            source_powers=[1.0, 1.0, 1.0],
            noise_type=NoiseType.GAUSSIAN
        )

        sim_params = SimulationParameters(config)

        # Initialize noise generator
        logger.info("Initializing noise generator...")
        noise_gen = NoiseRepository(db_connection=None, parameters=sim_params.get_noise_parameters())

        # Initialize signal generator
        logger.info("Initializing signal generator...")
        signal_gen = SignalRepository(
            db_connection=None,
            array_params=sim_params.get_array_parameters(),
            source_params=sim_params.get_source_parameters(),
            seed=sim_params.seed
        )

        # Generate signals and noise
        logger.info("Generating signals...")
        X = signal_gen.generate()

        logger.info("Generating noise...")
        N = noise_gen.generate(sim_params.get_noise_type())
        N_scaled = noise_gen.apply_snr_scaling(X, N)

        # Final received signal
        Y = X + (N_scaled @ N_scaled.T)

        logger.info("Simulation completed successfully")

    except Exception as e:
        logger.error("Simulation failed: %s", str(e))
        raise
