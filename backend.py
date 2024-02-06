from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/submit_order', methods=['POST', 'OPTIONS'])
def submit_order():
    if request.method == 'OPTIONS':
        response = app.response_class(
            response=json.dumps({'status': 'success'}),
            status=200,
            mimetype='application/json'
        )
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    try:
        data = request.get_json()

        # Lógica de processamento dos dados aqui
        # Salve os dados em um arquivo .jpeg, faça os cálculos necessários, etc.

        response = {'status': 'success', 'message': 'Pedido recebido com sucesso.'}
        return jsonify(response), 200
    except Exception as e:
        response = {'status': 'error', 'message': str(e)}
    return jsonify(response), 500

if __name__ == '__main__':
    app.run(debug=True)