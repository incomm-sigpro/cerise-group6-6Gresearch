from ..views.http_types.http_response import HttpResponse
from http.http_bad_request import HttpBadRequestError
from http.http_unauthorized import HttpUnauthorizedError
from http.http_not_found import HttpNotFoundError

def handle_errors(error: Exception) -> HttpResponse:
    if isinstance(error, HttpBadRequestError, HttpUnauthorizedError, HttpNotFoundError):
        return HttpResponse(
          body={
            "errors": [{
                "title": error.name,
                "detail": error.message
            }]
          },
          status_code=error.status_code
        )
    return HttpResponse(
      body={
        "errors": [{
            "title": "Internal Server Error",
            "detail": str(error)
        }]
      },
      status_code=500
    )
    