# importing Flask and other modules
from flask import Flask, request, render_template
from model import predict
from pandas import read_csv
  
# Flask constructor
app = Flask(__name__)   
  
# A decorator used to tell the application
# which URL is associated function
@app.route('/', methods =["GET", "POST"])
def display():
    if request.method == "POST":
       # getting input with name = fname in HTML form
       currency = request.form.get("crypto")
       #predict(currency)
       data = read_csv('predicted_result.csv')
       return render_template('table.html', row_data=data.values.tolist(), column_names=data.columns.values, coin=currency)
    return render_template("form.html")
  
if __name__=='__main__':
   app.run()
