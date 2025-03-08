from .create_ai import CreateAI

class MockAIRepository:
    def __init__(self) -> None:
        self.create_ai_attributes = {}
    
    def create_ai(self, name, model) -> None:
        self.create_ai_attributes["name"] = name
        self.create_ai_attributes["model"] = model


def test_create():
    repository = MockAIRepository()
    controller = CreateAI(repository)

    name = "olaMundo"
    model = "model"

    response = controller.create(name, model)
    
    assert response["type"] == "AI"
    assert response["ai"] == name

    assert repository.create_ai_attributes["name"] == name
    assert repository.create_ai_attributes["model"] == model