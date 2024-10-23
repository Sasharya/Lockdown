from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

def conectar_mongodb():
    client = MongoClient('mongodb+srv://midas:pblts222908Ç@cluster0.fehpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    db = client['lockdown'] 
    return db

@app.route('/')
def index():
    return render_template('forms.html')


@app.route('/api/contato_geral', methods=['POST'])
def contato_geral():
    db = conectar_mongodb()
    colecao = db['forms_geral']
    dados = request.json
    resultado = colecao.insert_one(dados)
    return jsonify({"message": "Enviado com sucesso!", "id": str(resultado.inserted_id)})

@app.route('/api/demonstracao_teste', methods=['POST'])
def demonstracao_teste():
    db = conectar_mongodb()
    colecao = db['forms_free']
    dados = request.json
    resultado = colecao.insert_one(dados)
    return jsonify({"message": "Enviado com sucesso!", "id": str(resultado.inserted_id)})

@app.route('/api/proposta_comercial', methods=['POST'])
def proposta_comercial():
    db = conectar_mongodb()
    colecao = db['forms_offer']
    dados = request.json
    resultado = colecao.insert_one(dados)
    return jsonify({"message": "Enviado com sucesso!", "id": str(resultado.inserted_id)})

@app.route('/api/feedback', methods=['POST'])
def feedback():
    db = conectar_mongodb()
    colecao = db['feedback']
    dados = request.json
    resultado = colecao.insert_one(dados)
    return jsonify({"message": "Enviado com sucesso!", "id": str(resultado.inserted_id)})

@app.route('/api/cadastro_interesse', methods=['POST'])
def cadastro_interesse():
    db = conectar_mongodb()
    colecao = db['forms_int']
    dados = request.json
    resultado = colecao.insert_one(dados)
    return jsonify({"message": "Enviado com sucesso!", "id": str(resultado.inserted_id)})

if __name__ == '__main__':
    app.run(debug=True)