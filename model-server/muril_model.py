import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from preprocessing import preprocess

MODEL = "google/muril-base-cased"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL, num_labels=7)
model.eval()

labels = [
    "Religion", "Caste", "Gender", "Age",
    "Regional", "Ethnicity", "Not Cyberbullying"
]

def predict(text):
    text = preprocess(text)
    inputs = tokenizer(text, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
    probs = torch.softmax(outputs.logits, dim=1)
    index = torch.argmax(probs)
    return {
        "label": labels[index],
        "confidence": float(probs[0][index])
    }