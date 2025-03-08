from abc import ABC, abstractmethod

class UserRepositoryInterface(ABC):

    @abstractmethod
    def create_user(self, username: str, email: str, password: str) -> None: pass