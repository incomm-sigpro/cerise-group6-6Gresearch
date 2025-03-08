from typing import Dict
from src.drivers.jwt_handler import JwtHandler
from src.errors.types.http_unauthorized import HttpUnauthorizedError
from ..interfaces.auth.logout_user import LogoutUserInterface

class LogoutUser(LogoutUserInterface):
    def __init__(self) -> None:
        self.__jwt_handler = JwtHandler()

    def logout_user(self, raw_token) -> Dict:
        if not raw_token or not raw_token.startswith("Bearer "):
            raise HttpUnauthorizedError("Invalid Auth information")
        
        token = raw_token.split()[1]
        
        is_revoked = self.__jwt_handler.revoke_jwt_token(token)
        return self.__format_response(token, is_revoked)

    def __format_response(self, token: str, token_status) -> Dict:
        return {
            "token": token,
            "revoked": token_status
        }
