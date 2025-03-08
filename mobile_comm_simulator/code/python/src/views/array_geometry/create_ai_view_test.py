import pytest
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
from src.views.ai.create_ai_view import CreateAIView

class MockController:
    def create(self, name, model):
        return { "alguma": "coisa" }

def test_handle_create_ai():
    body = {
        "name": "MyAIname",
        "model": "MyModel"
    }
    request = HttpRequest(body=body)

    mock_controller = MockController()
    create_ai_view = CreateAIView(mock_controller)

    response = create_ai_view.handle(request)

    assert isinstance(response, HttpResponse)
    assert response.body == {'data': {'alguma': 'coisa'}}
    assert response.status_code == 201

def test_handle_create_ai_with_validation_error():
    body = {
        "model": "MyModel"
    }
    request = HttpRequest(body=body)

    mock_controller = MockController()
    create_ai_view = CreateAIView(mock_controller)

    with pytest.raises(Exception):
        create_ai_view.handle(request)
