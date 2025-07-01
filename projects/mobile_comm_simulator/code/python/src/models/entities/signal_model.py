import uuid
from sqlalchemy import Column, String, DateTime
from configs.base import Base


class SignalModel(Base):
    __tablename__ = "signal_model"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    model = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)

    def __repr__(self):
        return f"""SignalModel [
                id={self.id}, 
                name={self.name},
                model={self.model},
                created_at={self.created_at}
                ]"""

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "model": self.model,
            "created_at": self.created_at,
        }
