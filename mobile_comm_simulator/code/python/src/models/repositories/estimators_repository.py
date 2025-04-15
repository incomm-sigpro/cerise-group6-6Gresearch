# from datetime import datetime
# from models.entities.estimators import Estimators
from models.interfaces.estimators_repository import EstimatorsRepositoryInterface


class EstimatorsRepository(EstimatorsRepositoryInterface):
    def __init__(self, db_connection) -> None:
        self.__db_connection = db_connection

    # def create_array_geometry(
    #     self,
    #     name: str,
    #     geometry: str,
    # ) -> None:
    #     with self.__db_connection as database:
    #         try:
    #             array_geometry_info = Estimators(
    #                 name=name,
    #                 geometry=geometry,
    #                 created_at=datetime.now(),
    #             )
    #             database.session.add(array_geometry_info)
    #             database.session.commit()
    #         except Exception as exception:
    #             database.session.rollback()
    #             raise exception

    def create_estimators(self, _, __):
        return f"{self.__db_connection}. Estimators persisted in the database...\n"
