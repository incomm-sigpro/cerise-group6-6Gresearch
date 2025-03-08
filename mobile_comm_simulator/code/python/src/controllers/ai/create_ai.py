from typing import Dict
from src.models.interfaces.ai_repository import AIRepositoryInterface
from ..interfaces.ai.create_ai import CreateAIInterface

class CreateAI(CreateAIInterface):
    def __init__(self, ai_repository: AIRepositoryInterface) -> None:
        self.__ai_repository = ai_repository
    
    def create(self, name: str, model: str) -> Dict:        
        self.__create_new_ai(name, model)

        return self.__format_response(name)
    
    def __create_new_ai(self, name: str, model: str) -> None:
        self.__ai_repository.create_ai(name, model)

    def __format_response(self, name: str) -> Dict:
        return {
            "type": "AI",
            "count": 1,
            "ai": name,
        }
