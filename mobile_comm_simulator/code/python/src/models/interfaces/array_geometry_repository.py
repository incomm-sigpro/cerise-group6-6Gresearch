from abc import ABC, abstractmethod

class ArrayGeometryRepositoryInterface(ABC):

    @abstractmethod
    def create_array_geometry(self, name: str, geometry: str) -> None: pass
