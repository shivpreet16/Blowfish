from flask import Flask, request, jsonify, send_from_directory
from blowfish import Blowfish
from PIL import Image
import numpy as np
import os
from flask_cors import CORS
# import matplotlib.pyplot as plt


app = Flask(__name__)
# blowfish = None
CORS(app)

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    image = request.files['image']

    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    img = Image.open(image)

    # Convert the image to a NumPy array
    img_array = np.array(img)
    print(img_array)

    return jsonify({'no error': 'ok'}), 200

@app.route('/encrypt', methods=['POST'])
def encrypt_data():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    image = request.files['image']

    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    img = Image.open(image)
    img_array = np.array(img)

    # print(img_array)
    blowfish = Blowfish(request.form.get('key'))

    
    encrypted_array = np.zeros_like(img_array, dtype=np.uint64)
    for i in range(img_array.shape[0]):
        for j in range(img_array.shape[1]):
            for k in range(img_array.shape[2]):
                encrypted_array[i][j][k]=(blowfish.blowFish_encrypt(int(img_array[i][j][k])))
    print(encrypted_array)
    encrypted_list = encrypted_array.tolist()

    return jsonify({'data': encrypted_list}), 200


@app.route('/decrypt', methods=['POST'])
def decrypt_data():
    data = request.form.get('data')
    # blowfish = Blowfish(request.form.get('key'))
    print(data)
    
    # decrypted_data = blowfish.blowFish_decrypt(data)
    # return jsonify({'decrypted_data': decrypted_data})

if __name__ == '__main__':
    app.run(debug=True)