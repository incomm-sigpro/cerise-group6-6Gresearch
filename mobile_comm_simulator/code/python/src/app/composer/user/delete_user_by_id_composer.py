from src.configs.connection import db_connection_handler
from src.models.repositories.user_repository import UserRepository
from src.controllers.user.delete_user_by_id import DeleteUserById
from src.views.user.delete_user_by_id_view import DeleteUserByIdView

def delete_user_by_id_composer():
    conn = db_connection_handler
    conn.connect_to_db()
    model = UserRepository(conn)
    controller = DeleteUserById(model)
    view = DeleteUserByIdView(controller)

    return view
