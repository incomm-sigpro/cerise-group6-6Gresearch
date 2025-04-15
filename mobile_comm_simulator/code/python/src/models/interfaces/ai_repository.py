from abc import ABC, abstractmethod


class AIRepositoryInterface(ABC):

    @abstractmethod
    def create_ai(self, name: str, model: str) -> None:
        pass
