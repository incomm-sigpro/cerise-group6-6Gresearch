from src.controllers.interfaces.auth.clear_revoked_tokens import ClearRevokedTokensInterface
from src.views.http_types.http_response import HttpResponse
from ..interfaces.view_interface import ViewInterface

class ClearRevokedTokensView(ViewInterface):
    def __init__(self, controller: ClearRevokedTokensInterface) -> None:
        self.__controller = controller
        
    def handle(self, _) -> HttpResponse:
        response = self.__controller.clear_revoked_tokens()
        return HttpResponse(body={ "data": response }, status_code=200)