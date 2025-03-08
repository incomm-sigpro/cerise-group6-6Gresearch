from typing import Dict

class HttpRequest:
    def __init__(
            self,
            body: Dict = None,
            headers: Dict = None,
            params: Dict = None,
            token_infos: Dict = None
        ) -> None:
        self.body = body
        self.headers = headers
        self.params = params
        self.token_infos = token_infos
