from flask import Flask
from flask_cors import CORS


app = Flask(__name__)


ALLOWED_ORIGINS = ["*"]
CORS(app, resources={"/*": {"origins": ALLOWED_ORIGINS}},
     supports_credentials=True)
