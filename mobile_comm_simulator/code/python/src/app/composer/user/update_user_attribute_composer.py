from src.configs.connection import db_connection_handler
from src.models.repositories.user_repository import UserRepository
from src.controllers.user.update_user_attribute import UpdateUserAttribute
from src.views.user.update_user_attribute_view import UpdateUserAttributeView

def update_user_attribute_composer():
    conn = db_connection_handler
    conn.connect_to_db()
    model = UserRepository(conn)
    controller = UpdateUserAttribute(model)
    view = UpdateUserAttributeView(controller)

    return view