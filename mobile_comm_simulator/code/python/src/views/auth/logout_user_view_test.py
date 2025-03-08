import uuid
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
from .logout_user_view import LogoutUserView

class MockController:
    def logout_user(self, raw_token):
        token = raw_token.split()[1]
        
        return {
            "token": token,
            "revoked": True
        }
    
def test_handle_logout_user():
    mock_token = str(uuid.uuid4())
    mock_controller = MockController()
    logout_user_view = LogoutUserView(mock_controller)
    
    http_request = HttpRequest(headers={ "Authorization": f"Bearer {mock_token}" })
    response = logout_user_view.handle(http_request)

    assert isinstance(response, HttpResponse)
    assert response.body == {'data': {
            "token": mock_token,
            "revoked": True
        }}
    assert response.status_code == 200