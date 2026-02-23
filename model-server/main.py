from fastapi import FastAPI
from muril_model import predict

app = FastAPI()

@app.post("/predict")
def classify(data: dict):
    return predict(data["text"])