import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if os.environ.get("AUTH_TYPE") == 'SELF_CODED':
    from flask import Flask, jsonify
    from flask_cors import CORS
    
    app = Flask(__name__)
    CORS(app)

    # Home route
    @app.route("/", methods=["GET"])
    def home():
        return jsonify({"message": "Home!"})

    # Hello World route
    @app.route("/hello-world", methods=["GET"])
    def hello_world():
        return jsonify({"message": "Hello World!"})

elif os.environ.get("AUTH_TYPE") == 'FLASK_LOGIN':
    from flask_login import LoginManager

    from flask import Flask, jsonify
    from flask_cors import CORS
    
    app = Flask(__name__)
    app.secret_key = os.environ.get("FLASK_SECRET_KEY")
    CORS(app)

    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'user_routes.login'

    @login_manager.user_loader
    def load_user(user_id):
        pass

    # Home route
    @app.route("/", methods=["GET"])
    def home():
        return jsonify({"message": "Home!"})

    # Hello World route
    @app.route("/hello-world", methods=["GET"])
    def hello_world():
        return jsonify({"message": "Hello World!"})
