from typing import Dict
from src.drivers.jwt_handler import JwtHandler
from ..interfaces.auth.clear_revoked_tokens import ClearRevokedTokensInterface

class ClearRevokedTokens(ClearRevokedTokensInterface):
    def __init__(self) -> None:
        self.__jwt_handler = JwtHandler()
        
    def clear_revoked_tokens(self) -> Dict:
        is_clear = self.__jwt_handler.clear_revoked_list()
        if not is_clear:
            raise Exception("Error clearing revoked tokens")
        return self.__format_response()
    
    def __format_response(self) -> Dict:
        return {
            "message": "Revoked tokens cleared"
        }