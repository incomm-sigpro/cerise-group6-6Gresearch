from src.configs.connection import db_connection_handler
from src.models.repositories.user_repository import UserRepository
from src.controllers.user.update_user import UpdateUser
from src.views.user.update_user_view import UpdateUserView

def update_user_composer():
    conn = db_connection_handler
    conn.connect_to_db()
    model = UserRepository(conn)
    controller = UpdateUser(model)
    view = UpdateUserView(controller)

    return view
