from typing import Dict
from src.drivers.jwt_handler import JwtHandler
from ..interfaces.auth.get_revoked_tokens import GetRevokedTokensInterface


class GetRevokedTokens(GetRevokedTokensInterface):
    def __init__(self) -> None:
        self.__jwt_handler = JwtHandler()
        
    def get_revoked_tokens(self) -> Dict:
        invalid_tokens = self.__jwt_handler.get_revoked_list()
        return self.__format_response(invalid_tokens)
        
    def __format_response(self, tokens: set) -> Dict:
        tokens = list(tokens)
        return {
            "revoked_tokens": tokens
        }