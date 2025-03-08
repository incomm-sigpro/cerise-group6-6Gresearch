import uuid
from sqlalchemy import Column, String, DateTime
from configs.base import Base

class Estimators(Base):
    __tablename__ = "estimators"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)

    def __repr__(self):
        return f"""Estimators [
                id={self.id}, 
                name={self.name},
                created_at={self.created_at}
                ]"""

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "created_at": self.created_at,
        }
