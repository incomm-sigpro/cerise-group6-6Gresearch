from typing import Dict
from src.models.interfaces.user_repository import UserRepositoryInterface
from ..interfaces.user.get_user_by_id import GetUserByIdInterface

class GetUserById(GetUserByIdInterface):
    def __init__(self, user_repository: UserRepositoryInterface) -> None:
        self.__user_repository = user_repository

    def get_user_by_id(self, user_id: str) -> Dict:
        user = self.__user_repository.get_user_by_id(user_id)

        return self.__format_response(user)

    def __format_response(self, user: list) -> Dict:
        return user.to_dict() if user else {}
