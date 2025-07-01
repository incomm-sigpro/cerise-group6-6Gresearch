"""
This module contains the ArrayGeometry class, which is used to represent the geometry of an array.
"""

import numpy as np

# from datetime import datetime
from configs.types import GeometryType, SpacingType, ArrayParameters
from utils.find_coprime_pair import find_coprime_pair
from models.entities.array_geometry import ArrayGeometryModel
from models.interfaces.array_geometry_repository import ArrayGeometryRepositoryInterface


class ArrayGeometryRepository(ArrayGeometryRepositoryInterface):
    """Class for managing array geometry in the database."""

    def __init__(self, db_connection, array_params: ArrayParameters) -> None:
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

        # Generate sensor positions based on the geometry type
        print(self.array_params.geometry)
        print(self.array_params.array_elements_spacing.value)
        match self.array_params.geometry.value:
            case GeometryType.LINEAR.value:
                # Linear array
                # First attempt based on:
                # https://www.mathworks.com/help/phased/ug/direction-of-arrival-estimation-using-sparse-arrays.html

                match self.array_params.array_elements_spacing.value:
                    case SpacingType.UNIFORM.value:
                        # Create a linear array with uniform spacing between sensors and reshape it to (num_sensors, 1)
                        # in order to avoid unidimensional array (num_sensors,) vs. (num_sensors, 1)
                        # and to make it compatible with the rest of the code
                        inter_element_distance = 0.5 * self.array_params.wavelength
                        array_structure = (
                            np.arange(self.array_params.num_sensors)
                            * inter_element_distance
                        ).reshape(self.array_params.num_sensors, 1)

                    case SpacingType.NON_UNIFORM.value:
                        # Create a linear array with non-uniform spacing between sensors
                        # and reshape it to (num_sensors, 1)
                        # in order to avoid unidimensional array (num_sensors,) vs. (num_sensors, 1)
                        # and to make it compatible with the rest of the code
                        inter_element_distance = [0]
                        for _ in range(self.array_params.num_sensors - 1):
                            inter_element_distance.append(
                                np.random.uniform(
                                    0,
                                    1 * self.array_params.wavelength,
                                )
                                + inter_element_distance[-1]
                            )
                        array_structure = np.array(inter_element_distance).reshape(
                            self.array_params.num_sensors, 1
                        )

                    case SpacingType.NESTED.value:
                        # Create a nested array with uniform spacing between sensors
                        # and reshape it to (num_sensors, 1)
                        # in order to avoid unidimensional array (num_sensors,) vs. (num_sensors, 1)
                        # and to make it compatible with the rest of the code
                        if self.array_params.num_sensors % 2 == 0:
                            sub_array_length = self.array_params.num_sensors // 2
                            dense = np.arange(0, sub_array_length) * 0.5
                            sparse = (
                                np.arange(1, sub_array_length + 1)
                                * sub_array_length
                                * 0.5
                            )
                            nested = np.sort(np.unique(np.concatenate([dense, sparse])))
                            return nested.reshape(-1, 1)
                        else:
                            sub_array_length = self.array_params.num_sensors // 2
                            dense = np.arange(0, sub_array_length) * 0.5
                            sparse = (
                                np.arange(1, sub_array_length + 2)
                                * sub_array_length
                                * 0.5
                            )
                            nested = np.concatenate([dense, sparse])
                            return nested.reshape(-1, 1)

                    case SpacingType.CO_PRIME.value:
                        # Create a co-prime array with uniform spacing between sensors
                        # and reshape it to (num_sensors, 1)
                        # in order to avoid unidimensional array (num_sensors,) vs. (num_sensors, 1)
                        # and to make it compatible with the rest of the code

                        first_prime, second_prime = find_coprime_pair(
                            self.array_params.num_sensors
                        )
                        sub_array_A = np.arange(0, first_prime + 1) * second_prime * 0.5
                        sub_array_B = np.arange(0, second_prime) * first_prime * 0.5
                        combined = np.unique(np.concatenate([sub_array_A, sub_array_B]))
                        return combined.reshape(-1, 1)

                    case _:
                        raise ValueError(
                            f"Unsupported spacing type: {self.array_params.array_elements_spacing}"
                        )

            case GeometryType.CIRCULAR.value:
                # Circular array
                angles = np.linspace(
                    0, 2 * np.pi, self.array_params.num_sensors, endpoint=False
                )
                array_structure = np.column_stack((np.cos(angles), np.sin(angles)))
            case GeometryType.PLANAR.value:
                # Planar array
                x_positions = np.arange(self.array_params.num_sensors) * 0.5
                y_positions = np.arange(self.array_params.num_sensors) * 0.5
                array_structure = np.array(
                    np.meshgrid(x_positions, y_positions)
                ).T.reshape(-1, 2)
            case GeometryType.RANDOM.value:
                # Random array
                array_structure = np.random.rand(self.array_params.num_sensors, 2) * 0.5
            case GeometryType.SPHERICAL.value:
                # Spherical array
                # Generate spherical coordinates
                # r: radius (constant for spherical array)
                # theta: polar angle (0 to pi)
                # phi: azimuthal angle (0 to 2*pi)
                r = 1  # Radius of the sphere
                theta = np.linspace(
                    0, np.pi, self.array_params.num_sensors
                )  # Polar angle
                phi = np.linspace(
                    0, 2 * np.pi, self.array_params.num_sensors
                )  # Azimuthal angle
                theta, phi = np.meshgrid(theta, phi)
                theta = theta.flatten()
                phi = phi.flatten()
                x = r * np.sin(theta) * np.cos(phi)
                y = r * np.sin(theta) * np.sin(phi)
                z = r * np.cos(theta)
                array_structure = np.column_stack((x, y, z))
            case GeometryType.CUBIC.value:
                # Cubic array
                x_positions = np.arange(self.array_params.num_sensors) * 0.5
                y_positions = np.arange(self.array_params.num_sensors) * 0.5
                z_positions = np.arange(self.array_params.num_sensors) * 0.5
                array_structure = np.array(
                    np.meshgrid(x_positions, y_positions, z_positions)
                ).T.reshape(-1, 3)
            case _:
                raise ValueError("Unsupported geometry type.")
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
