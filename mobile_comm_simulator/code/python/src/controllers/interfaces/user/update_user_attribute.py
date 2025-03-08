from typing import Dict
from abc import ABC, abstractmethod

class UpdateUserAttributeInterface(ABC):

    @abstractmethod
    def update_user_attribute(self, user_id: str, attr: dict) -> Dict: pass
