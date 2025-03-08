import pytest
import os
from dotenv import load_dotenv

# load environment variables
load_dotenv()
os.environ["FLASK_ENV"] = "test"

from src.errors.types.http_not_found import HttpNotFoundError
from src.configs.connection import db_connection_handler
from src.controllers.auth.login_user import LoginUser

db_connection_handler.connect_to_db()

@pytest.fixture(autouse=True)
def erase_user_table():
    db_connection_handler.get_clean_tables()

username = "meuUsername"
email = "meuEmail"
password = "minhaSenha"

class User():
    id = 'MinhaStringUUID'
    username = "meuUsername"
    email = "meuEmail"
    password = "minhaSenha"

class MockUserRepository:
    def __init__(self, name, mail, passwd) -> None:
        self.username = name
        self.email = mail
        self.password = passwd

    def authenticate_user(self, sent_username: str, sent_email: str, sent_password: str) -> User:
        if (sent_username == self.username or sent_email == self.email) and sent_password == self.password:
            return User
        raise HttpNotFoundError("User not found")

def test_create():
    user_repository = MockUserRepository(username, email, password)
    login_creator = LoginUser(user_repository)
    response = login_creator.login_user(username, email, password)

    assert response["access"] == True
    assert response["username"] == username
    assert response["token"] is not None

def test_create_with_wrong_password():
    login_creator = LoginUser(MockUserRepository(username, email, password))

    with pytest.raises(Exception):
        login_creator.login_user(username, email, "algumaSenha")
