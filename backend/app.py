import os
from flask import Flask, render_template, request, jsonify, current_app
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

@app.route('/predict', methods = ["GET", "POST"])
def display():
    if request.method =="POST":
        # getting input with name = fname in HTML form
        currency = request.form.get("token")
        toDate = request.form.get("to")
        fromDate = request.form.get("from")

        # predict(currency,fromDate,toDate)
        data = read_csv('/Users/pcm/Documents/GitHub/frontend/backend/predicted_result.csv',
                        sep=",", header=0, index_col=False)
        df = data.to_json( orient="records", date_format="epoch",
                        double_precision=10, force_ascii=True, date_unit="ms", default_handler=None)
        print(currency)
        return df, currency
    # return df, jsonify(currency=currency)

