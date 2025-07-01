from abc import ABC, abstractmethod

# from views.http_types.http_request import HttpRequest
# from views.http_types.http_response import HttpResponse


class ViewInterface(ABC):

    @abstractmethod
    def handle(self) -> str:
        pass
