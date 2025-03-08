from src.configs.connection import db_connection_handler
from src.models.repositories.user_repository import UserRepository
from src.controllers.user.create_user import CreateUser
from src.views.user.create_user_view import CreateUserView

def create_user_composer():
    conn = db_connection_handler
    conn.connect_to_db()
    model = UserRepository(conn)
    controller = CreateUser(model)
    view = CreateUserView(controller)

    return view
