import os
from dotenv import load_dotenv

load_dotenv()

import firebase_admin
from firebase_admin import credentials

# Path to the Firebase Admin SDK JSON file
CRED_PATH = os.environ.get("FIREBASE_CREDENTIALS_PATH")

# Initialize Firebase app
cred = credentials.Certificate(CRED_PATH)
firebase_app = firebase_admin.initialize_app(cred)
