import os
import dotenv

# load environment variables
dotenv.load_dotenv()
os.environ["FLASK_ENV"] = "test"

from .connection import db_connection_handler
from sqlalchemy.engine import Engine

from src.configs.base import Base

def test_exists_db_dir():
    assert os.path.exists(db_connection_handler.db_folder)
    assert os.path.isdir(db_connection_handler.db_folder)
    
def test_connection_string():
    assert db_connection_handler.get_connection_string() is not None
    assert isinstance(db_connection_handler.get_connection_string(), str)
    
def test_create_database():
    db_connection_handler.connect_to_db(Base)
    db_file = os.path.join(db_connection_handler.db_folder, os.environ.get("DB_NAME_TEST") + ".db")
    
    assert db_connection_handler.get_engine() is not None
    assert isinstance(db_connection_handler.get_engine(), Engine)
    assert os.path.exists(db_file)
    assert os.path.isfile(db_file)
    assert db_file == db_connection_handler.get_engine().url.database

def test_get_engine():
    assert db_connection_handler.get_engine() is not None
    
def test_connect_to_db():
    db_connection_handler.connect_to_db()
    db_engine = db_connection_handler.get_engine()

    assert db_engine is not None
    assert isinstance(db_engine, Engine)
