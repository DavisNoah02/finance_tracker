from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, db, auth
from datetime import datetime
from functools import wraps
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Firebase Admin
cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': os.getenv('FIREBASE_DATABASE_URL')
})

# Get reference to the database
ref = db.reference('expenses')

# Middleware to verify Firebase token
def check_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split("Bearer ")[1]
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        try:
            decoded_token = auth.verify_id_token(token)
            request.user = decoded_token
        except Exception as e:
            return jsonify({'message': 'Invalid token'}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/api/expenses', methods=['GET'])
@check_token
def get_expenses():
    try:
        user_id = request.user['uid']
        user_ref = ref.child(user_id)
        expenses = user_ref.get()
        if expenses is None:
            return jsonify([])
        return jsonify([
            {**expense, 'id': expense_id}
            for expense_id, expense in expenses.items()
        ])
    except Exception as e:
        return jsonify({'message': f'Error fetching expenses: {str(e)}'}), 500

@app.route('/api/expenses', methods=['POST'])
@check_token
def add_expense():
    try:
        user_id = request.user['uid']
        data = request.json
        if not all(key in data for key in ['description', 'amount', 'category']):
            return jsonify({'message': 'Missing required fields'}), 400
        new_expense = {
            'description': data['description'],
            'amount': float(data['amount']),
            'category': data['category'],
            'date': datetime.utcnow().isoformat()
        }
        user_ref = ref.child(user_id)
        new_ref = user_ref.push(new_expense)
        return jsonify({'message': 'Expense added successfully', 'id': new_ref.key}), 201
    except Exception as e:
        return jsonify({'message': f'Error adding expense: {str(e)}'}), 500

@app.route('/api/expenses/<expense_id>', methods=['DELETE'])
@check_token
def delete_expense(expense_id):
    try:
        user_id = request.user['uid']
        user_ref = ref.child(user_id)
        user_ref.child(expense_id).delete()
        return jsonify({'message': 'Expense deleted successfully'})
    except Exception as e:
        return jsonify({'message': f'Error deleting expense: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)