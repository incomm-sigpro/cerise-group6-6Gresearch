from configs.connection import db_connection_handler
from models.repositories.estimators_repository import EstimatorsRepository
from controllers.estimators.create_estimators import CreateEstimators
from views.estimators.create_estimators_view import CreateEstimatorsView

def estimators_composer():
    print("Creating estimators generator...")
    print("Establishing connection with database...")
    conn = db_connection_handler
    print("Creating estimators repository...")
    estimators_repository = EstimatorsRepository(conn)
    print(estimators_repository)
    print("Creating estimators controller...")
    estimators_controller = CreateEstimators({})
    print(estimators_controller)
    print("Creating estimators view...")
    estimators_view = CreateEstimatorsView({})
    print(estimators_view)
    print("Creating estimators controller...")

    return True
