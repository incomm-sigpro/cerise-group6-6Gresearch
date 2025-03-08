from src.controllers.interfaces.user.get_user_by_id import GetUserByIdInterface
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
from ..interfaces.view_interface import ViewInterface

class GetUserByIdView(ViewInterface):
    def __init__(self, controller: GetUserByIdInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        params = http_request.params
        user_id = params
        
        response = self.__controller.get_user_by_id(user_id)

        return HttpResponse(body={ "data": response }, status_code=200)
