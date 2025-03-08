from abc import ABC, abstractmethod

class NoiseRepositoryInterface(ABC):

    @abstractmethod
    def create_noise(self, name: str, description: str) -> None: pass
