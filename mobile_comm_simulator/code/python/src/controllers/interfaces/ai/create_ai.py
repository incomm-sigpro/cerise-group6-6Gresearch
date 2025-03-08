from typing import Dict
from abc import ABC, abstractmethod

class CreateAIInterface(ABC):

    @abstractmethod
    def create(self, name: str, model: str) -> Dict: pass
