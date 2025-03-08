from src.controllers.interfaces.user.get_users import GetUsersInterface
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
from ..interfaces.view_interface import ViewInterface

class GetUsersView(ViewInterface):
    def __init__(self, controller: GetUsersInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        body = http_request.body or {}
        page = body.get("page")
        page_length = body.get("page_length")
        
        response = self.__controller.get_users(page, page_length)

        return HttpResponse(body={ "data": response }, status_code=200)
