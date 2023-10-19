from flask import Flask, request, jsonify, send_from_directory,send_file, Response
from blowfish import Blowfish
from PIL import Image
import numpy as np
import os
from flask_cors import CORS
import io
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import base64
import pickle

app = Flask(__name__)
# blowfish = None
CORS(app)

mongoURI = os.environ.get('MONGO_URI')
client = MongoClient(mongoURI, server_api=ServerApi('1'))
def getDatabase():
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    return client.BlowfishImages


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
    blowfish = Blowfish(request.form.get('key'))

    
    encrypted_array = np.zeros_like(img_array, dtype=np.uint64)
    for i in range(img_array.shape[0]):
        for j in range(img_array.shape[1]):
            for k in range(img_array.shape[2]):
                encrypted_array[i][j][k]=(blowfish.blowFish_encrypt(int(img_array[i][j][k])))
    print(encrypted_array)
    # encrypted_list = [[str(cell) for cell in row] for row in encrypted_array]
    client=getDatabase()
    serialized_array = pickle.dumps(encrypted_array)

    dic = {"encryptedArray": serialized_array}
    collection = client["encryptedArrays"]
    collection.drop()
    x = collection.insert_one(dic)
    print(x.inserted_id)
    # result = collection.find()
    # for doc in result:
    #     print(doc['encryptedArray'])
    retrieved_doc = collection.find_one()
    retrieved_data = retrieved_doc['encryptedArray']
    retrieved_array = pickle.loads(retrieved_data)

    print(type(retrieved_array))

    return jsonify({'data': "OK"}), 200

import numpy as np


def extract_integers(s):
    # cleaned = s.replace('  ', " ").replace("[", '').replace(']', '').split()
    print(s)
    # return [int(x) for x in s]


@app.route('/decrypt', methods=['POST'])
def decrypt_data():
    data = request.form.get('data')
    blowfish = Blowfish(request.form.get('key'))
    data.replace('  ', " ")
    col = 0
    row = 0
    rowList = []
    finalList = []
    for i in range(len(data)):
        if data[i] == '[':
            if col == 0:
                col += 1
            elif row == 0:
                row += 1
            else:
                l = []
                num = 0
                for j in range(i+1, len(data)):
                    if len(l) == 3:
                        i = j+1
                        break
                    if (data[i] == " " or data[i] == ']'):
                        l.append(num)
                        num = 0
                    elif data[i]!="[" and data[i]!= '"' and data[i] != "'":
                        num = num*10 + int(data[i])
                    else:
                        pass
                rowList.append(l)
        elif data[i] == ']':
            if row == 1:
                finalList.append(row)
            elif col == 1:
                break
        else:
            pass
    print(finalList)

                    
                    
                

    # img_array = np.array([[extract_integers(s) for s in row] for row in data], dtype=np.uint64)
    # print(img_array.shape)
    # decrypted_array = np.zeros_like(img_array, dtype=np.uint8)
    # for i in range(img_array.shape[0]):
    #     for j in range(img_array.shape[1]):
    #         for k in range(img_array.shape[2]):
    #             decrypted_array[i][j][k]=(blowfish.blowFish_decrypt(int(img_array[i][j][k])))
    # print(decrypted_array.shape)

    # decrypted_data = blowfish.blowFish_decrypt(int(arr[0][0][0]))
    # print(decrypted_data)
    # printing(decrypted_array)


    # img=Image.fromarray(decrypted_array)
    # output_dir=os.path.dirname(__file__)
    # image_filename="decrypted.png"
    # img_path=os.path.join(output_dir,image_filename)
    # img.save(img_path,format='PNG')
    # img.save('A:/blowfish/server/temp.png')
    # image_data = io.BytesIO()
    # img.save(image_data, format='PNG')

    return jsonify({'decrypted_data': "OK"})
    # return Response(image_data.getvalue(), content_type='image/png')

if __name__ == '__main__':
    app.run(debug=True)