from models.interfaces.noise_repository import NoiseRepositoryInterface
from controllers.interfaces.noise.create_noise import CreateNoiseInterface

class CreateNoise(CreateNoiseInterface):
    def __init__(self, noise_repository: NoiseRepositoryInterface) -> None:
        self.noise_repository = noise_repository

    def create(self, _, __):
        return self.noise_repository.create_noise()
