from datetime import datetime
from models.entities.user import User
from models.interfaces.user_repository import UserRepositoryInterface


class UserRepository(UserRepositoryInterface):
    def __init__(self, db_connection) -> None:
        self.__db_connection = db_connection

    def create_user(
        self,
        username: str,
        email: str,
        password: str,
    ) -> None:
        with self.__db_connection as database:
            try:
                user_info = User(
                    username=username,
                    email=email,
                    password=password,
                    created_at=datetime.now(),
                )
                database.session.add(user_info)
                database.session.commit()
            except Exception as exception:
                database.session.rollback()
                raise exception
