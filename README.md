# 🌪️ API de Classificação de Risco de Desastres Naturais

Este projeto entrega uma API baseada em machine learning para **classificação automática do nível de risco** em relatos de desastres naturais, a partir de texto descritivo.  
Desenvolvido como parte de um sistema mobile para auxiliar a população e a defesa civil a priorizar respostas rápidas em situações críticas.

## 🚀 Funcionalidades

- Recebe texto descritivo de um desastre natural (ex: "Enchente atingiu ruas do centro da cidade").
- Retorna o nível de perigo classificado automaticamente pelo modelo treinado: **baixo, médio, alto ou crítico**.

## 📦 Como usar

### 1. Instalação das dependências

Recomenda-se usar um ambiente virtual.  
Execute no terminal:

```bash
pip install -r requirements.txt
```
### 2. Estrutura do projeto
.
├── api_classificacao.py                  # Arquivo principal da API FastAPI
├── modelo_classificador_risco.pkl        # Modelo Random Forest treinado
├── tfidf_vectorizer.pkl                  # Vetorizador TF-IDF treinado
├── requirements.txt

### 3. Como rodar localmente
Com as dependências instaladas e os arquivos .pkl no diretório, rode:

```bash
uvicorn api_classificacao:app --reload
```

Acesse a documentação interativa em:
http://localhost:8000/docs

## 📲 Como usar a API
### Endpoint:
POST /classificar
JSON de entrada:

json

{
  "conteudo": "Incêndio de grandes proporções avançando rapidamente sobre áreas habitadas."
}

### Resposta esperada:

json

{
  "nivel_perigo": "alto"
}

## 💡 Sobre o projeto
O modelo foi treinado com um dataset balanceado e realista, contendo relatos variados de situações envolvendo desastres naturais como enchentes, deslizamentos, tempestades e incêndios.
Utilizando técnicas de Processamento de Linguagem Natural (NLP) e Machine Learning, foi possível alcançar uma acurácia de aproximadamente 80% usando o classificador Random Forest.

Esta API será integrada a um aplicativo mobile (em React Native), permitindo que usuários relatem ocorrências e o sistema classifique automaticamente o nível de perigo. O backend da aplicação também contará com uma API em Java, funcionando em conjunto com essa solução Python.
