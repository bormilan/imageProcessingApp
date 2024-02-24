import cv2
from flask import request, make_response, send_file, jsonify
import numpy as np
import io

from ip_types import success_response
from startup import app

size = (280, 280)
interpolation = cv2.INTER_LINEAR


@app.route("/resize_image", methods=["POST"])
def resize_image():
    file = request.files.get("image")
    image_data = file.read()

    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    processed_image = cv2.resize(image, size, interpolation=interpolation)

    _, buffer = cv2.imencode('.png', processed_image)

    return send_file(io.BytesIO(buffer), mimetype='image/png')


@app.route("/greyscale_image", methods=["POST"])
def grayscale_image():
    file = request.files.get("image")
    image_data = file.read()

    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    processed_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    _, buffer = cv2.imencode('.png', processed_image)

    return send_file(io.BytesIO(buffer), mimetype='image/png')


@app.route("/normalize_image", methods=["POST"])
def normalize_image():
    file = request.files.get("image")
    image_data = file.read()

    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    processed_image = cv2.normalize(
        image, (image.shape[0], image.shape[1]), 0, 255, cv2.NORM_MINMAX)

    _, buffer = cv2.imencode('.png', processed_image)

    return send_file(io.BytesIO(buffer), mimetype='image/png')
