from flask import (Flask, render_template)
from flask_sqlalchemy import SQLAlchemy

app = Flask("__main__")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
db = SQLAlchemy(app)


@app.route("/")
def my_index():
    return render_template("index.html")

@app.route("/api", methods = ['GET'])
def index():
    return {
        'name': 'Hello World'
    }

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
