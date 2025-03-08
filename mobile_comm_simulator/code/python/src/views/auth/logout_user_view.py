from src.controllers.interfaces.auth.logout_user import LogoutUserInterface
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
from ..interfaces.view_interface import ViewInterface

class LogoutUserView(ViewInterface):
    def __init__(self, controller: LogoutUserInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        token = http_request.headers.get("Authorization")
        response = self.__controller.logout_user(token)
        return HttpResponse(body={ "data": response }, status_code=200)
