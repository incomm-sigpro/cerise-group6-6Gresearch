from typing import Dict
from abc import ABC, abstractmethod

class DeleteUserByIdInterface(ABC):

    @abstractmethod
    def delete_user_by_id(self, current_user_id: str, user_id: str) -> Dict: pass
