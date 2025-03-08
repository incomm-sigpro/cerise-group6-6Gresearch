from src.models.entities.user import User
from typing import Dict
from src.models.interfaces.user_repository import UserRepositoryInterface
from ..interfaces.user.update_user import UpdateUserInterface

class UpdateUser(UpdateUserInterface):
    def __init__(self, user_repository: UserRepositoryInterface) -> None:
        self.__user_repository = user_repository

    def update_user(self, partial_user: User) -> Dict:
        user = self.__user_repository.update_user(partial_user)

        return self.__format_response(user)

    def __format_response(self, user: list) -> Dict:
        return user.to_dict() if user else {}
