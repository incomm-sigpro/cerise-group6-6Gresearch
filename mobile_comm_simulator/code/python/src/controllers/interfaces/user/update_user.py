from src.models.entities.user import User
from typing import Dict
from abc import ABC, abstractmethod

class UpdateUserInterface(ABC):

    @abstractmethod
    def update_user(self, partial_user: User) -> Dict: pass
