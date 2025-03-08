import pytest
import uuid
from src.controllers.auth.logout_user import LogoutUser

def test_logout():
    mock_token = str(uuid.uuid4())
    logout_user_object = LogoutUser()
    
    with pytest.raises(Exception):
        logout_user_object.logout_user(mock_token)