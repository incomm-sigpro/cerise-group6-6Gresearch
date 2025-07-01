from abc import ABC, abstractmethod


class SignalRepositoryInterface(ABC):

    @abstractmethod
    def create_signal(self, name: str, model: str) -> None:
        pass
