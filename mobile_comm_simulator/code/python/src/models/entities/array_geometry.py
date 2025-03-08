import uuid
from sqlalchemy import Column, String, DateTime
from configs.base import Base

class ArrayGeometry(Base):
    __tablename__ = "array_geometries"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, unique=True, nullable=False)
    geometry = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)

    def __repr__(self):
        return f"""User [
                id={self.id}, 
                name={self.name},
                geometry={self.geometry},
                created_at={self.created_at}
                ]"""

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "geometry": self.geometry,
            "created_at": self.created_at,
        }
