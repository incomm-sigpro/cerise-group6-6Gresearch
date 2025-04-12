"""
This module contains the ArrayGeometry class, which is used to represent the geometry of an array.
"""

from dataclasses import dataclass
from typing import List, Optional
import numpy as np
# from enum import Enum

# from datetime import datetime
from configs.simulation_parameters import GeometryType
from configs.simulation_parameters import SpacingType
from models.entities.array_geometry import ArrayGeometryModel
from models.interfaces.array_geometry_repository import ArrayGeometryRepositoryInterface

@dataclass
class ArrayParameters:
    """Parameters for array geometry."""
    num_sensors: int
    num_snapshots: int
    geometry: GeometryType  # Array geometry type
    array_elements_spacing: SpacingType  # Inter-element spacing in wavelengths
    wavelength: float  # Wavelength in meters
    # Positions of the array elements in 3D space

class ArrayGeometryRepository(ArrayGeometryRepositoryInterface):
    """Class for managing array geometry in the database."""
    def __init__(self, db_connection, array_params) -> None:
        self.__db_connection = db_connection
        self.array_params = array_params

    print(ArrayGeometryModel)

    def generate_array_structure(self) -> np.ndarray:
        """
        Generate array geometry parameters based on the provided configuration.
        Array positions tensor:
        - Shape: (N, D)
            where   N = num_sensors
                    D = 1 (LINEAR), 2 (PLANAR), 3 (CUBIC/SPHERICAL)

        Example:
        - Linear: [[0], [d], [2d], ...]
            where d is the distance between sensors
        - Planar: [[x0, y0], [x1, y1], ...]
            where x0, y0 are the coordinates of the sensor in a planar array
        - Circular: [[x0, y0], [x1, y1], ...]
            where x0, y0 are the coordinates of the sensor in a circular array
        - Cubic:  [[x0, y0, z0], [x1, y1, z1], ...]
            where x0, y0, z0 are the coordinates of the sensor in a cubic array
        - Spherical: [[r0, theta0, phi0], [r1, theta1, phi1], ...]
            where r0, theta0, phi0 are the spherical coordinates of the sensor
        """

        # Generate array geometry parameters
        array_config = ArrayParameters(**self.array_params)

        # Generate sensor positions based on the geometry type
        match array_config.geometry:
            case GeometryType.LINEAR:
                # Linear array
                array_structure = np.arange(array_config.num_sensors) * array_config.array_elements_spacing
            case GeometryType.CIRCULAR:
                # Circular array
                angles = np.linspace(0, 2 * np.pi, array_config.num_sensors, endpoint=False)
                array_structure = np.column_stack((np.cos(angles), np.sin(angles)))
            case GeometryType.PLANAR:
                # Planar array
                x_positions = np.arange(array_config.num_sensors) * array_config.array_elements_spacing
                y_positions = np.arange(array_config.num_sensors) * array_config.array_elements_spacing
                array_structure = np.array(np.meshgrid(x_positions, y_positions)).T.reshape(-1, 2)
            case GeometryType.RANDOM:
                # Random array
                array_structure = np.random.rand(array_config.num_sensors, 2) * array_config.array_elements_spacing
            case GeometryType.SPHERICAL:
                # Spherical array
                theta = np.linspace(0, np.pi, array_config.num_sensors)
                phi = np.linspace(0, 2 * np.pi, array_config.num_sensors)
                array_structure = np.array(np.meshgrid(theta, phi)).T.reshape(-1, 2)
            case GeometryType.CUBIC:
                # Cubic array
                x_positions = np.arange(array_config.num_sensors) * array_config.array_elements_spacing
                y_positions = np.arange(array_config.num_sensors) * array_config.array_elements_spacing
                z_positions = np.arange(array_config.num_sensors) * array_config.array_elements_spacing
                array_structure = np.array(np.meshgrid(x_positions, y_positions, z_positions)).T.reshape(-1, 3)

        # TODO: Store the array geometry in the database

        return array_structure

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
