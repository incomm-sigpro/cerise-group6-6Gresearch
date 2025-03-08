from models.interfaces.estimators_repository import EstimatorsRepositoryInterface
from controllers.interfaces.estimators.create_estimators import CreateEstimatorsInterface

class CreateEstimators(CreateEstimatorsInterface):
    def __init__(self, estimators_repository: EstimatorsRepositoryInterface) -> None:
        self.estimators_repository = estimators_repository

    def create(self):
        return self.estimators_repository.create_estimators()
