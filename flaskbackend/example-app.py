from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])

def hello():
	print("form", request.form)
	print("args", request.args)
	print("cookies", request.cookies)
	print("files", request.files)
	print("method", request.method)
	if request.method == "POST":
		return render_template("index.html", var = 4)
	else:
		return render_template("index.html", var = 3)
	
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
