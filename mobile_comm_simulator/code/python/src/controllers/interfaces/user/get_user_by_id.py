from typing import Dict
from abc import ABC, abstractmethod

class GetUserByIdInterface(ABC):

    @abstractmethod
    def get_user_by_id(self, user_id: str) -> Dict: pass
