def error_response(data):
    return {"result": "error", "data": data}


def success_response(data):
    return {"result": "ok", "data": data}
