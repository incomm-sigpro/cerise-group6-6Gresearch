from typing import Dict
from abc import ABC, abstractmethod

class CreateNoiseInterface(ABC):

    @abstractmethod
    def create(self, name: str, description: str) -> Dict: pass
