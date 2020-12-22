from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:4826494629@localhost:5432/NoteApp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Nota(db.Model):
    id_nota = db.Column(db.Integer, primary_key=True)
    titulo_nota = db.Column(db.String(50), unique=True, nullable=False)
    text_nota = db.Column(db.String(200), nullable=False)
    fecha_nota = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    def __repr__(self):
        return '<Nota %r>' % self.titulo_nota

db.create_all()

class NotaSchema(ma.Schema):
    class Meta:
        fields = ('id_nota', 'titulo_nota', 'text_nota', 'fecha_nota')

nota_schema = NotaSchema()
notas_schema = NotaSchema(many=True)

@app.route('/notas', methods=['POST'])
def create_nota():
    titulo = request.json['titulo_nota']
    texto = request.json['text_nota']

    new_nota = Nota(titulo_nota=titulo, text_nota=texto)
    db.session.add(new_nota)
    db.session.commit()
    return nota_schema.jsonify(new_nota)

if __name__=="__main__":
    app.run(debug=True)