from src.controllers.interfaces.user.update_user import UpdateUserInterface
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
from ..interfaces.view_interface import ViewInterface

class UpdateUserView(ViewInterface):
    def __init__(self, controller: UpdateUserInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        params = http_request.params
        partial_user = http_request.body
        partial_user["id"] = params

        response = self.__controller.update_user(partial_user)

        return HttpResponse(body={ "data": response }, status_code=200)
