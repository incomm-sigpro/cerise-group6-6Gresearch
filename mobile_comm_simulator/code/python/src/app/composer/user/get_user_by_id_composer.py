from src.configs.connection import db_connection_handler
from src.models.repositories.user_repository import UserRepository
from src.controllers.user.get_user_by_id import GetUserById
from src.views.user.get_user_by_id_view import GetUserByIdView

def get_user_by_id_composer():
    conn = db_connection_handler
    conn.connect_to_db()
    model = UserRepository(conn)
    controller = GetUserById(model)
    view = GetUserByIdView(controller)

    return view
