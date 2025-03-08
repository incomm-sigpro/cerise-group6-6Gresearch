import pytest
import os
from dotenv import load_dotenv

# load environment variables
load_dotenv()
os.environ["FLASK_ENV"] = "test"

from datetime import datetime
from src.configs.connection import db_connection_handler
from .user_repository import UserRepository
from src.drivers.password_handler import PasswordHandler

db_connection_handler.connect_to_db()

@pytest.fixture(autouse=True)
def erase_user_table():
    db_connection_handler.get_clean_tables()

class MockUser():
    def __init__(self, username: str, email: str, password: str) -> None:
        self.username = username
        self.email = email
        self.password = password
        self.created_at = datetime.now()

# @pytest.mark.skip(reason="interacao com o banco")
def test_create_user():
    username = "username"
    email = "email@email.com"
    password = "password"
    user_repository = UserRepository(db_connection_handler)
    user = MockUser(username, email, password)
    user_repository.create_user(user.username, user.email, PasswordHandler().encrypt_password(user.password))

    user_by_username = user_repository.get_user_by_username(user.username)
    user_by_email = user_repository.get_user_by_email(user.email)
    user_by_id_by_username = user_repository.get_user_by_id(user_by_username.id)
    user_by_id_by_email = user_repository.get_user_by_id(user_by_email.id)

    assert user_by_id_by_username.id == user_by_id_by_email.id
    assert user_by_username.username == user.username
    assert user_by_email.email == user.email
    assert user_repository.authenticate_user(user.username, user.email, user.password) is not None

def test_get_all_users():
    username = "username"
    email = "email@email.com"
    password = "password"
    user_repository = UserRepository(db_connection_handler)
    user = MockUser(username, email, password)
    user_repository.create_user(user.username, user.email, user.password)

    users = user_repository.get_all_users()

    assert len(users) == 1
    assert users[0].username == user.username
    assert users[0].email == user.email
    assert users[0].password == user.password
    assert isinstance(users, list)

def test_update_user():
    username = "username"
    email = "email@email.com"
    password = "password"
    user_repository = UserRepository(db_connection_handler)
    user = MockUser(username, email, password)
    user = user_repository.create_user(
        user.username,
        user.email,
        PasswordHandler().encrypt_password(user.password)
        ).to_dict()

    user["given_name"] = "given_name"
    user["middle_name"] = "middle_name"
    user["family_name"] = "family_name"
    user["username"] = "new_username"
    user["email"] = "new_email"
    user["password"] = PasswordHandler().encrypt_password("new_password")

    updated_user = user_repository.update_user(user)
    original_user = user_repository.get_user_by_username(username)

    assert updated_user.given_name == user["given_name"]
    assert updated_user.middle_name == user["middle_name"]
    assert updated_user.family_name == user["family_name"]
    assert updated_user.username == user["username"]
    assert updated_user.email == user["email"]
    assert updated_user.password == user["password"]
    assert user_repository.authenticate_user(
        updated_user.username,
        updated_user.email,
        "new_password") is not None
    assert user_repository.authenticate_user(username, email, password) is None
    assert original_user is None

@pytest.mark.skip(reason="manter usuario no banco para verificação")
def test_delete_user():
    username = "username"
    email = "email@email.com"
    password = "password"
    user_repository = UserRepository(db_connection_handler)
    user = MockUser(username, email, password)
    user = user_repository.create_user(user.username, user.email, user.password)

    user_repository.delete_user(user.id, user.id)

    assert user_repository.get_user_by_username(username) is None
    assert user_repository.get_user_by_email(email) is None
    assert user_repository.get_user_by_id(user.id) is None
    assert user_repository.authenticate_user(username, email, password) is None
    