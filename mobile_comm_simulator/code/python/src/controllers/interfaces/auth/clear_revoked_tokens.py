from typing import Dict
from abc import ABC, abstractmethod

class ClearRevokedTokensInterface(ABC):

    @abstractmethod
    def clear_revoked_tokens(self) -> Dict: pass
