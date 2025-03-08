from typing import Dict
from src.models.interfaces.user_repository import UserRepositoryInterface
from ..interfaces.user.get_users import GetUsersInterface

class GetUsers(GetUsersInterface):
    def __init__(self, user_repository: UserRepositoryInterface) -> None:
        self.__user_repository = user_repository

    def get_users(self, page: int, page_length: int) -> Dict:
        users = self.__get_all_users(page, page_length)

        return self.__format_response(users)

    def __get_all_users(self, page, page_length) -> Dict:
        users = self.__user_repository.get_all_users(page, page_length)

        return users

    def __format_response(self, users: list) -> Dict:
        return {
            "type": "Users",
            "count": len(users),
            "users": [user.to_dict() for user in users],
        }
