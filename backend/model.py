#IMPORT DEPENDENCIES
import investpy
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
plt.style.use("seaborn")
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Conv1D,Flatten,MaxPooling1D,Bidirectional,LSTM,Dropout,TimeDistributed,MaxPool2D
from keras.layers import Dense,GlobalAveragePooling2D
import os
import pprint
import tensorflow as tf

def predict(currency):
    #DATA INGESTION
    data = investpy.get_crypto_historical_data(crypto=currency, from_date='01/10/2019', to_date='01/10/2021')
    #print(data)
    data.to_csv('historical_data.csv')

    #DATA PRE-PROCESSING
    data = pd.read_csv('historical_data.csv')
    # print(data)
    # print(data.shape)
    # print(data.size)
    n_steps = 50
    last_index = len(data) - n_steps - 1
    X = []
    Y = []
    for i in range(0 , last_index):
        first = data.iloc[i, 4] #get every value from column 4 or data.['Close']
        tempX = []
        tempY = []
        for j in range(n_steps): #convert into data of shape [n_steps,1]
            tempX.append((data.iloc[i + j, 4] - first) / first) # assign n_steps datapoints to X
        tempY.append((data.iloc[i + n_steps, 4] - first) / first) # assign n_step+1 datapoint (or the next datapoint from last value in X) to Y 
        X.append(np.array(tempX).reshape(n_steps, 1)) #reshape is transpose the dimension
        Y.append(np.array(tempY).reshape(1,1)) #reshape is transpose the dimension
    train_X,test_X,train_label,test_label = train_test_split(X, Y, train_size=0.75, shuffle=False)
    len_t = len(train_X) #for unnormalized the datapoint
    train_X = np.array(train_X)
    test_X = np.array(test_X)
    train_label = np.array(train_label)
    test_label = np.array(test_label)
    train_X = train_X.reshape(train_X.shape[0],1,n_steps,1)
    test_X = test_X.reshape(test_X.shape[0],1,n_steps,1)
    # print('Input:', len(train_X))
    # print('Output:', len(test_X))

    #MODELLING
    model = Sequential()
    model.add(TimeDistributed(Conv1D(128, kernel_size=1, activation='relu', input_shape=(None,n_steps,1))))
    model.add(TimeDistributed(MaxPooling1D(2)))
    model.add(TimeDistributed(Conv1D(64, kernel_size=1, activation='relu')))
    model.add(TimeDistributed(MaxPooling1D(2)))
    model.add(TimeDistributed(Conv1D(32, kernel_size=1, activation='relu')))
    model.add(TimeDistributed(MaxPooling1D(2)))
    model.add(TimeDistributed(Flatten()))
    model.add(Bidirectional(LSTM(50,return_sequences=True)))
    model.add(Dropout(0.1))
    model.add(Bidirectional(LSTM(50,return_sequences=False)))
    model.add(Dropout(0.1))
    model.add(Dense(1, activation='linear'))
    model.compile(optimizer='rmsprop', loss='mse', metrics =[tf.keras.metrics.RootMeanSquaredError(name='rmse')])
    history= model.fit(train_X, train_label, validation_data=(test_X,test_label), epochs=40, batch_size=96, shuffle =False)

    #DATA POST-PROCESSING
    predicted  = model.predict(test_X)
    test_label = (test_label[:,0])
    predicted = np.array(predicted[:,0]).reshape(-1,1)
    for j in range(len_t , len_t + len(test_X)):
        temp = data.iloc[j,4]
        test_label[j - len_t] = test_label[j - len_t] * temp + temp
        predicted[j - len_t] = predicted[j - len_t] * temp + temp

    #RESULT PREPARATION TO EXPORT
    import datetime
    df = pd.DataFrame(data).copy()
    datelist = pd.date_range(datetime.datetime(2019, 10, 1).strftime('%Y-%m-%d'), periods=df.shape[0]).tolist()
    df['Timestamp'] = datelist 
    df = df.set_index(['Timestamp'])
    df['Actual'] = df['Close']
    df['Predicted'] = df['Close']
    df.iloc[-171:,-1:] = predicted
    df = df.drop(['Date', 'Currency', 'Open', 'Close', 'High', 'Low', 'Volume'], axis = 1)
    print(df)
    df.to_csv('predicted_result.csv')
    return None