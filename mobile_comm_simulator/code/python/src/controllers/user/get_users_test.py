import pytest
from src.models.entities.user import User
from .get_users import GetUsers

class MockUserRepository:
    def get_all_users(self, page: int = 1, page_length: int = 10) -> list:
        users: list[User] = [ User(
                id=1,
                username="Test User",
                email="test@email.com",
                password="hashed_password",
                created_at="2021-09-01 00:00:00",
                updated_at="2021-09-01 00:00:00",
            ), User(
                id=2,
                username="Test User",
                email="test@email.com",
                password="hashed_password",
                created_at="2021-09-01 00:00:00",
                updated_at="2021-09-01 00:00:00",
            ), User(
                id=3,
                username="Test User",
                email="test@email.com",
                password="hashed_password",
                created_at="2021-09-01 00:00:00",
                updated_at="2021-09-01 00:00:00",
            ), User(
                id=4,
                username="Test User",
                email="test@email.com",
                password="hashed_password",
                created_at="2021-09-01 00:00:00",
                updated_at="2021-09-01 00:00:00",
            ), User(
                id=5,
                username="Test User",
                email="test@email.com",
                password="hashed_password",
                created_at="2021-09-01 00:00:00",
                updated_at="2021-09-01 00:00:00",
            ), User(
                id=6,
                username="Test User",
                email="test@email.com",
                password="hashed_password",
                created_at="2021-09-01 00:00:00",
                updated_at="2021-09-01 00:00:00",
            ), User(
                id=7,
                username="Test User",
                email="test@email.com",
                password="hashed_password",
                created_at="2021-09-01 00:00:00",
                updated_at="2021-09-01 00:00:00",
            ), User(
                id=8,
                username="Test User",
                email="test@email.com",
                password="hashed_password",
                created_at="2021-09-01 00:00:00",
                updated_at="2021-09-01 00:00:00",
            ), User(
                id=9,
                username="Test User",
                email="test@email.com",
                password="hashed_password",
                created_at="2021-09-01 00:00:00",
                updated_at="2021-09-01 00:00:00",
            ), User(
                id=10,
                username="Test User",
                email="test@email.com",
                password="hashed_password",
                created_at="2021-09-01 00:00:00",
                updated_at="2021-09-01 00:00:00",
            ), User(
                id=11,
                username="Test User",
                email="test@email.com",
                password="hashed_password",
                created_at="2021-09-01 00:00:00",
                updated_at="2021-09-01 00:00:00",
            ), User(
                id=12,
                username="Test User",
                email="test@email.com",
                password="hashed_password",
                created_at="2021-09-01 00:00:00",
                updated_at="2021-09-01 00:00:00",
            ),
        ]

        if page is None and page_length is None:
            return users
        if page < 1 or page_length < 1:
            raise Exception("Invalid number") # pylint: disable=W0719:broad-exception-raised
        return users[(page - 1) : page_length] if page_length else users

def test_get_users():
    repository = MockUserRepository()
    controller = GetUsers(repository)

    page, page_length = [1, 20]
    response = controller.get_users(page, page_length)

    assert response["type"] == "Users"
    assert response["count"] <= page_length
    assert response["count"] == len(response["users"])
    assert response["users"] is not None
    assert isinstance(response["users"], list)

def test_get_all_users():
    repository = MockUserRepository()
    controller = GetUsers(repository)

    page, page_length = [None, None]
    response = controller.get_users(page, page_length)

    assert response["type"] == "Users"
    assert response["count"] == len(response["users"])
    assert response["users"] is not None
    assert isinstance(response["users"], list)

def test_get_users_with__invalid_page_length():  
    repository = MockUserRepository()
    controller = GetUsers(repository)

    page, page_length = [1, 0]
    with pytest.raises(Exception):
        controller.get_users(page, page_length)

def test_get_users_with_invalid_page():
    repository = MockUserRepository()
    controller = GetUsers(repository)

    page, page_length = [0, 10]
    with pytest.raises(Exception):
        controller.get_users(page, page_length)

def test_get_users_with_invalid_page_datatype():
    repository = MockUserRepository()
    controller = GetUsers(repository)

    page, page_length = ["a", 10]
    with pytest.raises(Exception):
        controller.get_users(page, page_length)
