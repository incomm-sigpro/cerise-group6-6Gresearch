from src.controllers.interfaces.auth.login_user import LoginUserInterface
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
from src.errors.types.http_bad_request import HttpBadRequestError
from ..interfaces.view_interface import ViewInterface

class LoginUserView(ViewInterface):
    def __init__(self, controller: LoginUserInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        username = http_request.body.get("username")
        email = http_request.body.get("email")
        password = http_request.body.get("password")
        self.__validate_inputs(username, email, password)

        response = self.__controller.login_user(username, email, password)
        return HttpResponse(body={ "data": response }, status_code=200)

    def __validate_inputs(self, username: any, email: any, password: any) -> None:
        is_input_not_null = (username or email) and password
        is_input_string = (isinstance(username, str) or isinstance(email, str)) and isinstance(password, str)
        if (
            is_input_not_null is False or is_input_string is False
        ): raise HttpBadRequestError("Invalid Input")
