"""
This module contains the ArrayGeometry class, which is used to represent the geometry of an array.
"""

from dataclasses import dataclass
from enum import Enum

# from datetime import datetime
from models.entities.array_geometry import ArrayGeometryModel
# from configs.simulation_parameters import SpacingType
from models.interfaces.array_geometry_repository import ArrayGeometryRepositoryInterface

class ArrayGeometry(Enum):
    """Enum for array geometry types."""
    LINEAR = "linear"
    CIRCULAR = "circular"
    SPARSE = "sparse"
    NESTED = "nested"
    RANDOM = "random"

@dataclass
class ArrayParameters:
    """Parameters for array geometry."""
    num_sensors: int
    num_snapshots: int
    geometry: ArrayGeometry  # Array geometry type
    array_elements_spacing: str  # Inter-element spacing in wavelengths
    center_frequency: float  # Hz
    speed_of_light: float = 3e8  # m/s

class ArrayGeometryRepository(ArrayGeometryRepositoryInterface):
    def __init__(self, db_connection) -> None:
        self.__db_connection = db_connection

    print(ArrayGeometryModel)

    # def create_array_geometry(
    #     self,
    #     name: str,
    #     geometry: str,
    # ) -> None:
    #     with self.__db_connection as database:
    #         try:
    #             array_geometry_info = ArrayGeometry(
    #                 name=name,
    #                 geometry=geometry,
    #                 created_at=datetime.now(),
    #             )
    #             database.session.add(array_geometry_info)
    #             database.session.commit()
    #         except Exception as exception:
    #             database.session.rollback()
    #             raise exception

    def create_array_geometry(self, _, __):
        return f"{self.__db_connection}. Array geometry persisted in the database...\n"

#          self,
#         name: str,
#         array_params: ArrayParameters,
#         seed: Optional[int] = None
#     ):
#         self.array_params = array_params
#         self.name = name
#         self.seed = seed

#         if seed is not None:
#             np.random.seed(seed)

#         self.sensor_positions = self._generate_sensor_positions()

#     def _generate_sensor_positions(self) -> np.ndarray:
# Generate sensor positions in a linear array.
#         num_sensors = self.array_params.num_sensors
#         spacing = self.array_params.spacing
#         center_frequency = self.array_params.center_frequency
