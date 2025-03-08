from src.controllers.interfaces.user.delete_user_by_id import DeleteUserByIdInterface
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
from ..interfaces.view_interface import ViewInterface

class DeleteUserByIdView(ViewInterface):
    def __init__(self, controller: DeleteUserByIdInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        current_user = http_request.headers.get("uid")
        params = http_request.params
        user_id = params

        response = self.__controller.delete_user_by_id(current_user, user_id)

        return HttpResponse(body={ "data": response }, status_code=200)
