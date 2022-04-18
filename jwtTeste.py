from flask import Flask
from flask import jsonify
from flask import request


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


from cryptography.hazmat.primitives import serialization

import datetime

app = Flask(__name__)


private_key = open('.ssh/key', 'r').read()
prkey = serialization.load_ssh_private_key(private_key.encode(), password = b'87361542')

public_key = open('.ssh/key.pub', 'r').read()
pubkey = serialization.load_ssh_public_key(public_key.encode())


app.config["JWT_PRIVATE_KEY"] = prkey
app.config["JWT_PUBLIC_KEY"] = public_key
app.config['JWT_ALGORITHM'] = 'RS256'

app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=1)

jwt = JWTManager(app)

@app.route('/login', methods = ["POST"])
def login():
    print("username")
    username = request.json.get("username", None)    
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return jsonify({"msg" : "AserName ou Senha Incorretos"}),401
    
    access_token = create_access_token(identity = username)
    
    return jsonify(access_token = access_token)        
    
    
@app.route("/protected", methods = ["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logado = current_user), 200


if __name__ == "__main__":
    app.run()