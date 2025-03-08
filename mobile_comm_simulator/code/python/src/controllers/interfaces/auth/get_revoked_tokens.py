from typing import Dict
from abc import ABC, abstractmethod

class GetRevokedTokensInterface(ABC):

    @abstractmethod
    def get_revoked_tokens(self) -> Dict: pass
