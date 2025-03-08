from src.controllers.auth.get_revoked_tokens import GetRevokedTokens
from src.views.auth.get_revoked_tokens_view import GetRevokedTokensView

def get_revoked_tokens_composer():
    controller = GetRevokedTokens()
    view = GetRevokedTokensView(controller)
    
    return view