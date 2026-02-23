import re
from indicnlp.normalize.indic_normalize import IndicNormalizerFactory

factory = IndicNormalizerFactory()
normalizer = factory.get_normalizer("hi")

def preprocess(text):
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = normalizer.normalize(text)
    return text