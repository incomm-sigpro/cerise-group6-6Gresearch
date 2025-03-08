from src.controllers.interfaces.user.update_user_attribute import UpdateUserAttributeInterface
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
from ..interfaces.view_interface import ViewInterface

class UpdateUserAttributeView(ViewInterface):
    def __init__(self, controller: UpdateUserAttributeInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        user_id = http_request.params
        attr = http_request.body

        response = self.__controller.update_user_attribute(user_id, attr)

        return HttpResponse(body={ "data": response }, status_code=200)
