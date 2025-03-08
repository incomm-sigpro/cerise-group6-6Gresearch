from src.controllers.interfaces.auth.get_revoked_tokens import GetRevokedTokensInterface
from src.views.http_types.http_response import HttpResponse
from ..interfaces.view_interface import ViewInterface

class GetRevokedTokensView(ViewInterface):
    def __init__(self, controller: GetRevokedTokensInterface) -> None:
        self.__controller = controller
        
    def handle(self, _) -> HttpResponse:
        response = self.__controller.get_revoked_tokens()
        return HttpResponse(body={ "data": response }, status_code=200)