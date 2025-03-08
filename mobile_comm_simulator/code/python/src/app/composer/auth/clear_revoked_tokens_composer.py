from src.controllers.auth.clear_revoked_tokens import ClearRevokedTokens
from src.views.auth.clear_revoked_tokens_view import ClearRevokedTokensView

def clear_revoked_tokens_composer():
    controller = ClearRevokedTokens()
    view = ClearRevokedTokensView(controller)
    
    return view