from src.configs.connection import db_connection_handler
from src.models.repositories.ai_repository import AIRepository
from src.controllers.ai.create_ai import CreateAI
from src.views.create_ai_view import CreateAIView

def create_ai_composer():
    conn = db_connection_handler
    model = AIRepository(conn.connect_to_db())
    controller = CreateAI(model)
    view = CreateAIView(controller)

    return view
