from datetime import datetime
from models.entities.ai import AI
from models.interfaces.ai_repository import AIRepositoryInterface

class AIRepository(AIRepositoryInterface):
    def __init__(self, db_connection) -> None:
        self.__db_connection = db_connection
        
    def create_ai(
        self,
        name: str,
        model: str,
    ) -> None:
        with self.__db_connection as database:
            try:
                ai_info = AI(
                    name=name,
                    model=model,
                    created_at=datetime.now(),
                )
                database.session.add(ai_info)
                database.session.commit()
            except Exception as exception:
                database.session.rollback()
                raise exception
