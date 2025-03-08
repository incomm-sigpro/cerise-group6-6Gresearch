"""
This script sets up the base class for declarative class definitions in SQLAlchemy.
It uses `declarative_base` from the SQLAlchemy ORM, which is a factory function
that constructs a base class for declarative class definitions. All models
inheriting from this base class will be mapped to the database.

Attributes:
    Base (DeclarativeMeta): The base class from which all mapped classes should inherit.
"""

from sqlalchemy.orm import declarative_base

# Create a base class for declarative class definitions.
Base = declarative_base()
