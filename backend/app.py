from crypt import methods
from dataclasses import replace
import imp
from lib2to3.pgen2 import token
from locale import currency
import os
from urllib import response
from flask import Flask, render_template, request, jsonify, current_app
from itsdangerous import json
from reverseProxy import proxyRequest
from pandas import read_csv
from model import predict
import logging as logger
import requests

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

@app.route('/predict', methods = ["POST","GET"])
def display():
    if request.method == "POST":
        # getting input with name = fname in HTML form 
        currency  = request.json['token']
        fromDate = request.json['from']
        toDate = request.json['to']
        predict(currency, fromDate, toDate)
        return currency
    if request.method == "GET":
        # predict(currency, fromDate, toDate)
        data = read_csv('predicted_result.csv')    
        df = data.to_json(orient="records")
        return df

# @app.route('/result', methods = ["GET"])
# def result():
#     return jsonify(currency)

