from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB connection
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['personal_finance']
    print("Connected to MongoDB successfully!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Server is running"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
