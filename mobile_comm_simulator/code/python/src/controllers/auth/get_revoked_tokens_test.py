import uuid
from .logout_user import LogoutUser
from .get_revoked_tokens import GetRevokedTokens

def test_empty_list_of_revoked_tokens():
    get_tokens_object = GetRevokedTokens()
    revoked_tokens = get_tokens_object.get_revoked_tokens()

    assert revoked_tokens == {
        "revoked_tokens": []
    }

def test_getting_revoked_tokens():
    logout_user_object = LogoutUser()
    
    mock_token = str(uuid.uuid4())
    logout_user_object.logout_user(f"Bearer {mock_token}")
    
    mock_token2 = str(uuid.uuid4())
    logout_user_object.logout_user(f"Bearer {mock_token2}")

    get_tokens_object = GetRevokedTokens()
    revoked_tokens = get_tokens_object.get_revoked_tokens()

    assert set(revoked_tokens["revoked_tokens"]) == {
            mock_token,
            mock_token2
        }
