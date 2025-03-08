from src.controllers.auth.logout_user import LogoutUser
from src.views.auth.logout_user_view import LogoutUserView

def logout_user_composer():
    controller = LogoutUser()
    view = LogoutUserView(controller)

    return view
