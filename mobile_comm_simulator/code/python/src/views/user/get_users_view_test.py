import json
import pytest
from src.models.entities.user import User
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
from .get_users_view import GetUsersView

class MockController:
    def get_users(self, page: int, page_length: int):
        users: User = [ User(
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
            ),
        ]

        return {
            "type": "Users",
            "count": len(users),
            "users": users[(page - 1) * page_length: page * page_length],
        }

def test_handle_get_users():
    body = {
        "page": 1,
        "page_length": 10
    }
    request = HttpRequest(body=body)

    mock_controller = MockController()
    get_users_view = GetUsersView(mock_controller)

    response = get_users_view.handle(request)

    assert isinstance(response, HttpResponse)
    assert isinstance(response.body, dict)
    assert response.status_code == 200

def test_handle_get_user_with_validation_error():
    body = {
        "page_length": "a"
    }
    request = HttpRequest(body=body)

    mock_controller = MockController()
    get_users_view = GetUsersView(mock_controller)

    with pytest.raises(Exception):
        get_users_view.handle(request)
        
def test_handle_get_users_with_json():
    body = {
        "page": 1,
        "page_length": 10
    }
    request = HttpRequest(body=body)

    mock_controller = MockController()
    get_users_view = GetUsersView(mock_controller)

    response = get_users_view.handle(request)
    
    assert isinstance(json.dumps([user.to_dict() for user in response.body["data"]["users"]]), str)

    with pytest.raises(Exception):
        json.dumps(response.body)