from src.configs.connection import db_connection_handler
from src.models.repositories.user_repository import UserRepository
from src.controllers.auth.login_user import LoginUser
from src.views.auth.login_user_view import LoginUserView

def login_user_composer():
    conn = db_connection_handler
    conn.connect_to_db()
    model = UserRepository(conn)
    controller = LoginUser(model)
    view = LoginUserView(controller)

    return view
