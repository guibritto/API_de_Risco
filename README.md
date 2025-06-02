# 🌪️ API de Classificação de Risco de Desastres Naturais

Este projeto entrega uma API baseada em machine learning para **classificação automática do nível de risco** em relatos de desastres naturais, a partir de texto descritivo.  
Desenvolvido como parte de um sistema mobile para auxiliar a população e a defesa civil a priorizar respostas rápidas em situações críticas.

## 🚀 Funcionalidades

- Recebe texto descritivo de um desastre natural (ex: "Enchente atingiu ruas do centro da cidade").
- Retorna o nível de perigo classificado automaticamente pelo modelo treinado: **baixo, médio, alto ou crítico**.

## ⚙ Estrutura de 
.
├── api_classificacao.py          # Arquivo principal da API FastAPI
├── modelo_classificador_risco.pkl   # Modelo Random Forest treinado
├── tfidf_vectorizer.pkl             # Vetorizador TF-IDF treinado
├── requirements.txt

## 📦 Como usar

### 1. Instalação das dependências

Recomenda-se usar um ambiente virtual.  
Execute no terminal:

```bash
pip install -r requirements.txt
```
### 2. Como rodar localmente

uvicorn api_classificacao:app --reload

#📲 Como usar a API

##Faça uma requisição POST para /classificar com o seguinte JSON:

###json
{
  "conteudo": "Incêndio de grandes proporções avançando rapidamente sobre áreas habitadas."
}

##Resposta:

###json
{
  "nivel_perigo": "alto"
}

#💡 Sobre o projeto

##O modelo foi treinado com um dataset balanceado e realista, utilizando técnicas de NLP e o classificador Random Forest, atingindo aproximadamente 80% de precisão.
##Esta API será integrada a um aplicativo mobile para facilitar o registro, triagem e resposta a desastres naturais de forma inteligente.


