from src.controllers.interfaces.ai.create_ai import CreateAIInterface
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
from src.errors.types.http_bad_request import HttpBadRequestError
from ..interfaces.view_interface import ViewInterface

class CreateAIView(ViewInterface):
    def __init__(self, controller: CreateAIInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        name = http_request.body.get("name")
        model = http_request.body.get("model")
        self.__validate_inputs(name, model)

        response = self.__controller.create(name, model)
        return HttpResponse(body={ "data": response }, status_code=201)

    def __validate_inputs(self, name: any, model: any) -> None:
        if (
            not name
            or not model
            or not isinstance(name, str)
            or not isinstance(model, str)
        ): raise HttpBadRequestError("Invalid Input")
