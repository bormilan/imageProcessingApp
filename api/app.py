from flask import Flask
from flask_cors import CORS

from ip_types import success_response

import endpoints_images
from startup import app


@app.route("/")
def test():
    return success_response("szia lajos")
