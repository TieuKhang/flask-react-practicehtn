from flask import (Flask, request, render_template, json, jsonify)
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

    def __str__(self):
        return f'{self.id} {self.content}'

def todo_serializer(todo):
    return {
        'id': todo.id,
        'content': todo.content
      }

@app.route('/', defaults={'path': ''})

@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

@app.route("/api", methods = ['GET'])
def index():
    return jsonify([*map(todo_serializer, Todo.query.all())])

@app.route("/api/create", methods = ['POST'])
def create():
    request_data = json.loads(request.data)
    todo = Todo(content = request_data['content']) 

    db.session.add(todo)
    db.session.commit()

    return {'201': 'Add succesfully'}

@app.route('/api/<int:id>')
def show(id):
    return jsonify([*map(todo_serializer, Todo.query.filter_by(id=id))])

@app.route('/api/<int:id>', methods = ['POST'])
def delete(id):
    request_data = json.loads(request.data)
    Todo.query.filter_by(id=request_data['id']).delete()
    db.session.commit()


if __name__ == "__main__":
    app.run(debug=True)
