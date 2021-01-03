from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:4826494629@localhost:5432/NoteApp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)

class Nota(db.Model):
    id_nota = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(50), unique=True, nullable=False)
    descripcion = db.Column(db.String(200), nullable=False)
    fecha_nota = db.Column(db.DateTime, nullable=False, default=datetime.utcnow()-timedelta(hours=5))

    def __repr__(self):
        return '<Nota %r>' % self.titulo

db.create_all()

class NotaSchema(ma.Schema):
    class Meta:
        fields = ('id_nota', 'titulo', 'descripcion', 'fecha_nota')

nota_schema = NotaSchema()
notas_schema = NotaSchema(many=True)

@app.route('/crearNotas', methods=['POST'])
def create_nota():
    titulo = request.json['titulo']
    descripcion = request.json['descripcion']

    new_nota = Nota(titulo=titulo, descripcion=descripcion)
    db.session.add(new_nota)
    db.session.commit()
    return nota_schema.jsonify(new_nota)

@app.route('/getNotas', methods=['GET'])
def getNotas():
    notas= Nota.query.all()
    return notas_schema.jsonify(notas)

if __name__=="__main__":
    app.run(debug=True)
