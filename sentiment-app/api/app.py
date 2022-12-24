from flask import Flask, request
from flask_cors import CORS
import re
import joblib
import pandas as pd


app = Flask(__name__)
#allows cross axis origin so that api can be fetched from any port
CORS(app)


@app.route('/api', methods=['POST', 'GET'])
def predict():
    text = request.get_json()
    processed_feature = re.sub(r'\W', ' ', str(text))
    processed_feature = re.sub(r'\s+[a-zA-Z]\s+', ' ', processed_feature)
    processed_feature = re.sub(r'\^[a-zA-Z]\s+', ' ', processed_feature) 
    processed_feature = re.sub(r'\s+', ' ', processed_feature, flags=re.I)
    processed_feature = re.sub(r'^b\s+', '', processed_feature)
    processed_feature = processed_feature.lower()
    vectorizer = joblib.load('vectorizer.pkl')
    vect_features = vectorizer.transform([processed_feature])
    vect = pd.DataFrame(vect_features.toarray())
    model = joblib.load('rf_model.pkl')
    prediction = model.predict(vect)
    prediction = prediction[0]
    return {
        'prediction' : prediction
    }

if __name__ == '__main__':
    app.run(port=5000, debug=True)  