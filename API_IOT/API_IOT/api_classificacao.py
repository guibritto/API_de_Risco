import re
import joblib
import nltk
from nltk.corpus import stopwords
from fastapi import FastAPI
from pydantic import BaseModel

# Adiciona o caminho local para o NLTK encontrar as stopwords no deploy (Render)
nltk.data.path.append("./nltk_data")

# Carrega as stopwords em português
stop_words_pt = stopwords.words("portuguese")

# Carrega vetorizador e modelo
vectorizer = joblib.load("tfidf_vectorizer.pkl")
model = joblib.load("modelo_classificador_risco.pkl")

# Função de limpeza
def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zà-ú\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# Modelo de entrada
class ClassificacaoRequest(BaseModel):
    conteudo: str

# Inicializa API
app = FastAPI(
    title="API de Classificação de Risco de Desastres",
    description="Recebe texto e retorna o nível de perigo previsto pelo modelo treinado.",
    version="1.0"
)

@app.post("/classificar")
def classificar_risco(req: ClassificacaoRequest):
    texto_limpo = clean_text(req.conteudo)
    texto_tfidf = vectorizer.transform([texto_limpo])
    nivel = model.predict(texto_tfidf)[0]
    return {"nivel_perigo": nivel}
