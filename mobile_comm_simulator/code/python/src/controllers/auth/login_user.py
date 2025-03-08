from typing import Dict
from src.models.interfaces.user_repository import UserRepositoryInterface
from src.drivers.jwt_handler import JwtHandler
from src.errors.types.http_bad_request import HttpBadRequestError
from src.errors.types.http_not_found import HttpNotFoundError
from ..interfaces.auth.login_user import LoginUserInterface

class LoginUser(LoginUserInterface):
    def __init__(self, user_repository: UserRepositoryInterface) -> None:
        self.__user_repository = user_repository
        self.__jwt_handler = JwtHandler()

    def login_user(self, username: str, email: str, password: str) -> Dict:        
        if username or email:
            user = self.__user_repository.authenticate_user(username, email, password)
        else:
            raise HttpBadRequestError("Username or Email is required")

        if not user: raise HttpNotFoundError("User not found")

        user_id = user.id
        token = self.__create_jwt_token(user_id)

        return self.__format_response(username, token)

    def __create_jwt_token(self, user_id: str) -> str:
        payload = { "user_id": user_id }
        token = self.__jwt_handler.create_jwt_token(payload)

        return token

    def __format_response(self, username: str, token: str) -> Dict:
        return {
            "access": True,
            "username": username,
            "token": token
        }
