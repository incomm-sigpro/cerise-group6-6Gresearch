import pytest
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
from .login_user_view import LoginUserView

class MockController:
    def login_user(self, username: str, email: str, password: str): # pylint: disable=unused-argument
        return { "access": True, "username": username, "token": "token" }
    
def test_handle_login_user():
    mock_controller = MockController()
    login_user_view = LoginUserView(mock_controller)

    http_request = HttpRequest(body={ "username": "username", "email": "email", "password": "password" })
    response = login_user_view.handle(http_request)

    assert isinstance(response, HttpResponse)
    assert response.body == { "data": { "access": True, "username": "username", "token": "token" } }
    assert response.status_code == 200
    
def test_handle_login_user_invalid_input():
    mock_controller = MockController()
    login_user_view = LoginUserView(mock_controller)

    http_request = HttpRequest(body={ "username": 1, "email": 1, "password": 1 })
    with pytest.raises(Exception):
        login_user_view.handle(http_request)

def test_handle_login_user_no_input():
    mock_controller = MockController()
    login_user_view = LoginUserView(mock_controller)

    http_request = HttpRequest(body={})
    with pytest.raises(Exception):
        login_user_view.handle(http_request)
    
def test_handle_login_user_no_username_or_email():
    mock_controller = MockController()
    login_user_view = LoginUserView(mock_controller)
    
    http_request = HttpRequest(body={ "password": "password" })
    with pytest.raises(Exception):
        login_user_view.handle(http_request)