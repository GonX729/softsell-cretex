from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    company = data.get('company')
    license_type = data.get('license_type')
    message = data.get('message')

    if not all([name, email, company, license_type, message]):
        return jsonify({'error': 'All fields are required.'}), 400

    return jsonify({'success': 'Form submitted successfully!'}), 200

@app.route('/api/quote', methods=['POST'])
def get_quote():
    data = request.get_json()
    # Dummy backend: just echo the data and return success
    print('Received quote request:', data)
    return jsonify({'status': 'success', 'message': 'Quote received!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
