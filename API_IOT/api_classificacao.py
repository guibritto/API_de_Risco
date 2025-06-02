import re
import joblib
import nltk
from nltk.corpus import stopwords
from fastapi import FastAPI
from pydantic import BaseModel

# Baixa stopwords do nltk na primeira execução (só precisa rodar 1x)
# nltk.download('stopwords')

# Carrega os recursos
stop_words_pt = stopwords.words('portuguese')
vectorizer = joblib.load('tfidf_vectorizer.pkl')
model = joblib.load('modelo_classificador_risco.pkl')

# Função para limpar texto igual ao treinamento
def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zà-ú\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# Define o modelo de requisição (validação automática)
class ClassificacaoRequest(BaseModel):
    conteudo: str

# Instancia o app FastAPI
app = FastAPI(
    title="API de Classificação de Risco de Desastres",
    description="Recebe texto e retorna o nível de perigo previsto pelo modelo treinado.",
    version="1.0"
)

@app.post("/classificar")
def classificar_risco(req: ClassificacaoRequest):
    # Pré-processamento do texto
    texto_limpo = clean_text(req.conteudo)
    texto_tfidf = vectorizer.transform([texto_limpo])
    # Predição
    nivel = model.predict(texto_tfidf)[0]
    return {"nivel_perigo": nivel}
