from flask import (Flask, request, render_template, json, jsonify)
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS,cross_origin

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

@app.route("/")
def my_index():
    return render_template("index.html")

@app.route("/api", methods = ['GET'])
@cross_origin()
def index():
    return jsonify([*map(todo_serializer, Todo.query.all())])

@app.route("/api/create", methods = ['POST'])
@cross_origin()
def create():
    request_data = json.loads(request.data)
    todo = Todo(content = request_data['content']) 

    db.session.add(todo)
    db.session.commit()

    return {'201': 'Add succesfully'}

@app.route("/api/create/<int:id>", methods = ['POST'])
@cross_origin()
def edit(id):
    request_data = json.loads(request.data)
    Todo.query.filter_by(id=request_data['id']).update({'content': request_data['content']})
    db.session.commit()

@app.route('/api/<int:id>', methods=['GET'])
@cross_origin()
def show(id):
    return jsonify([*map(todo_serializer, Todo.query.filter_by(id=id))])

@app.route('/api/<int:id>/delete', methods = ['POST'])
@cross_origin()
def delete(id):
    request_data = json.loads(request.data)
    Todo.query.filter_by(id=request_data['id']).delete()
    db.session.commit()


if __name__ == "__main__":
    app.run(debug=True)
