from typing import Dict
from src.models.entities.user import User
from src.models.interfaces.user_repository import UserRepositoryInterface
from ..interfaces.user.update_user_attribute import UpdateUserAttributeInterface

class UpdateUserAttribute(UpdateUserAttributeInterface):
    def __init__(self, user_repository: UserRepositoryInterface) -> None:
        self.__user_repository = user_repository

    def update_user_attribute(self, user_id: str, attr: dict) -> Dict:
        attr["id"]=user_id
        user = self.__user_repository.update_user(attr)
        
        return self.__format_response(user)
    
    def __format_response(self, user: User) -> Dict:
        return {
            "type": "User",
            "count": 1,
            "user": user.to_dict(),
        }
