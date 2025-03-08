from typing import Dict
from src.models.interfaces.user_repository import UserRepositoryInterface
from ..interfaces.user.delete_user_by_id import DeleteUserByIdInterface

class DeleteUserById(DeleteUserByIdInterface):
    def __init__(self, user_repository: UserRepositoryInterface) -> None:
        self.__user_repository = user_repository

    def delete_user_by_id(self, current_user_id: str, user_id: str) -> Dict:
        user = self.__user_repository.delete_user(current_user_id, user_id)

        return self.__format_response(user)

    def __format_response(self, user: list) -> Dict:
        return user.to_dict() if user else {}
