import os

from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker

from models.entities.user import User # pylint: disable=unused-import
from models.entities.ai import AI # pylint: disable=unused-import
from models.entities.signal_model import SignalModel # pylint: disable=unused-import

import dotenv

# Load environment variables
dotenv.load_dotenv()

class DBConnectionHandler:
    def __init__(self) -> None:
        self.db_folder = os.path.join(os.getcwd(), 'db')
        os.makedirs(self.db_folder, exist_ok=True)
        
        if os.environ.get("FLASK_ENV") == "development":
            DB_NAME = os.environ.get("DB_NAME")
            self.__connection_string = f"sqlite:///{self.db_folder}/{DB_NAME}.db"
        elif os.environ.get("FLASK_ENV") == "test":
            DB_NAME_TEST = os.environ.get("DB_NAME_TEST")
            self.__connection_string = f"sqlite:///{self.db_folder}/{DB_NAME_TEST}.db"
        elif os.environ.get("FLASK_ENV") == "production":
            DB_ENGINE_TYPE = os.environ.get("DB_ENGINE_TYPE")
            match DB_ENGINE_TYPE:
                case "sqlite":
                    DB_NAME = os.environ.get("DB_NAME")
                    self.__connection_string = f"{DB_ENGINE_TYPE}:///{self.db_folder}/{DB_NAME}.db"
                case "mysql":
                    DB_DRIVER = os.environ.get("DB_DRIVER")
                    DB_USERNAME = os.environ.get("DB_USERNAME")
                    DB_PASSWORD = os.environ.get("DB_PASSWORD")
                    DB_HOST = os.environ.get("DB_HOST")
                    DB_PORT = os.environ.get("DB_PORT")
                    DB_NAME = os.environ.get("DB_NAME")
                    self.__connection_string = f"{DB_ENGINE_TYPE}+{DB_DRIVER}://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
                case "postgresql":
                    DB_DRIVER = os.environ.get("DB_DRIVER")
                    DB_USERNAME = os.environ.get("DB_USERNAME")
                    DB_PASSWORD = os.environ.get("DB_PASSWORD")
                    DB_HOST = os.environ.get("DB_HOST")
                    DB_PORT = os.environ.get("DB_PORT")
                    DB_NAME = os.environ.get("DB_NAME")
                    self.__connection_string = f"{DB_ENGINE_TYPE}+{DB_DRIVER}://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
                case "mongodb":
                    DB_USERNAME = os.environ.get("DB_USERNAME")
                    DB_PASSWORD = os.environ.get("DB_PASSWORD")
                    DB_HOST = os.environ.get("DB_HOST")
                    DB_PORT = os.environ.get("DB_PORT")
                    DB_NAME = os.environ.get("DB_NAME")
                    self.__connection_string = f"{DB_ENGINE_TYPE}+{DB_DRIVER}://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
                case "firebird":
                    DB_DRIVER = os.environ.get("DB_DRIVER")
                    DB_USERNAME = os.environ.get("DB_USERNAME")
                    DB_PASSWORD = os.environ.get("DB_PASSWORD")
                    DB_HOST = os.environ.get("DB_HOST")
                    DB_PORT = os.environ.get("DB_PORT")
                    DB_NAME = os.environ.get("DB_NAME")
                    self.__connection_string = f"{DB_ENGINE_TYPE}+{DB_DRIVER}://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
                case _:
                    DB_NAME = os.environ.get("DB_NAME")
                    self.__connection_string = f"sqlite:///{self.db_folder}/{DB_NAME}.db"
        else:
            DB_NAME = os.environ.get("DB_NAME")
            self.__connection_string = f"sqlite:///{self.db_folder}/{DB_NAME}.db"
        
        self.__engine = None
        self.session = None

    def connect_to_db(self, base=None):
        self.__engine = create_engine(self.__connection_string)
        if base:
            base.metadata.reflect(self.__engine)
            base.metadata.create_all(self.__engine)

    def get_engine(self):
        return self.__engine
    
    def get_connection_string(self):
        return self.__connection_string
    
    def get_session(self):
        return self.session
    
    def get_clean_tables(self):
        return self.__clear_all_tables()
        
    def __enter__(self):
        session_maker = sessionmaker()

        self.session = session_maker(bind=self.__engine)
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.session.close()

    def __close_all_connections(self):
        self.__engine.dispose()
        
    def __clear_all_tables(self):
        metadata = MetaData()
        metadata.reflect(bind=self.__engine)

        with self.__engine.connect() as conn:
            trans = conn.begin()
            try:
                for table in metadata.sorted_tables:
                    conn.execute(table.delete())
                trans.commit()
            except Exception as e: # pylint: disable=broad-except
                trans.rollback()
                print(f"Error excluding registers: {e}")

        print("\nAll tables were cleaned.")

    def remove_db(self):
        self.__close_all_connections()
        if os.environ.get("FLASK_ENV") == "development":
            DB_NAME = os.environ.get("DB_NAME")
            os.remove(f"{self.db_folder}/{DB_NAME}.db")
        elif os.environ.get("FLASK_ENV") == "test":
            DB_NAME_TEST = os.environ.get("DB_NAME_TEST")
            os.remove(f"{self.db_folder}/{DB_NAME_TEST}.db")

# db_connection_handler = DBConnectionHandler()
db_connection_handler = f"{DBConnectionHandler()} is ready.\n"

