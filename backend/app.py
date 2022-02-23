import os
from flask import Flask, render_template, request
from reverseProxy import proxyRequest
from pandas import read_csv

MODE = os.getenv('FLASK_ENV')
DEV_SERVER_URL = 'http://localhost:3000/'

app = Flask(__name__)

# Ignore static folder in development mode.
if MODE == "development":
    app = Flask(__name__, static_folder=None)

@app.route('/')
@app.route('/<path:path>')
def index(path=''):
    if MODE == 'development':
        return proxyRequest(DEV_SERVER_URL, path)
    else:
        return render_template("index.html")    

@app.route('/Predict', methods =["GET", "POST"])
def display():
    if request.method == "POST":
       # getting input with name = fname in HTML form
       currency = request.form.get("crypto")
       #predict(currency)
       data = read_csv('predicted_result.csv')
       return render_template('index.html', row_data=data.values.tolist(), column_names=data.columns.values, coin=currency)
