from typing import Dict
from abc import ABC, abstractmethod

class CreateEstimatorsInterface(ABC):

    @abstractmethod
    def create(self) -> Dict: pass