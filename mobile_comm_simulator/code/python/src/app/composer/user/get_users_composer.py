from src.configs.connection import db_connection_handler
from src.models.repositories.user_repository import UserRepository
from src.controllers.user.get_users import GetUsers
from src.views.user.get_users_view import GetUsersView

def get_users_composer():
    conn = db_connection_handler
    conn.connect_to_db()
    model = UserRepository(conn)
    controller = GetUsers(model)
    view = GetUsersView(controller)

    return view
