from abc import ABC, abstractmethod


class EstimatorsRepositoryInterface(ABC):

    @abstractmethod
    def create_estimators(self, name: str) -> None:
        pass
