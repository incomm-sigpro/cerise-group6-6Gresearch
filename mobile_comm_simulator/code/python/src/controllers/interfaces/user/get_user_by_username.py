from typing import Dict
from abc import ABC, abstractmethod

class CreateUserInterface(ABC):

    @abstractmethod
    def get_by_username(self, username: str) -> Dict: pass
