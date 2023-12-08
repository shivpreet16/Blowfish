# Blowfish
![Homepage](https://github.com/shivpreet16/Blowfish/assets/91965754/9695aee5-d655-4ad1-9498-2ad867e3b60f)

## Block Diagram of Working
![_blowfish ](https://github.com/shivpreet16/Blowfish/assets/91965754/ee908692-c4b7-4a1d-8f5b-38cb298d9af6)

## Working Website
This project implements Blowfish Crytography algorithms on images. The user can use the website to:
1. **Encrypt an image**<br>This code sample builds a website around the Blowfish Cryptographic Algorithm for encryption and decryption of images. It has a page for the user to submit a photograph and a key. Then, the image is passed to the Flask backend which triggers a Python script to encrypt the image with that key. The encrypted array is passed to MongoDB and the object id from MongoDB is sent to the client to display to the user. 
![Encryption](https://github.com/shivpreet16/Blowfish/assets/91965754/aac730ce-bbdc-4aa5-be81-04ef597c1846)

2. **Decrypt a message to get the original image back** <br>On a different page in the same website, the user can enter the object id and the key. We perform the decryption algorithm and send back the resultant image.
![Decryption](https://github.com/shivpreet16/Blowfish/assets/91965754/075af13d-c403-4652-aebb-ee999f141aa4)

## Technologies used
1. React JS for frontend
2. Flask for backend
3. Python for Blowfish logic
4. MongoDB for storing encrypted array


## Contributors
1. [Shivpreet Padhi](https://github.com/shivpreet16) : Blowfish logic, Flask backend, testing
2. [Jayanti Goswami](https://github.com/Jayanti2919) : Frontend, storing in MongoDB, connecting frontend and backend
