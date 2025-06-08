import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

export default function ClassificacaoPage() {
  const [texto, setTexto] = useState("");
  const [nivel, setNivel] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const classificar = async () => {
    const textoLimpo = texto.trim();

    if (!textoLimpo) {
      Alert.alert("Atenção", "Por favor, preencha o texto da ocorrência.");
      return;
    }

    setCarregando(true);
    setErro("");
    setNivel("");

    try {
      const response = await fetch(
        "https://api-de-risco.onrender.com/classificar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conteudo: textoLimpo }),
        }
      );
      const contentType = response.headers.get("content-type");
      const text = await response.text();

      if (!contentType?.includes("application/json")) {
        console.error("Resposta não é JSON:", text);
        Alert.alert("Erro", "A resposta da API não está em JSON.");
        setErro("Resposta inválida da API.");
        setCarregando(false);
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Erro ao analisar JSON:", err);
        setErro("Resposta inválida da API.");
        setCarregando(false);
        return;
      }

      if (response.ok && data?.nivel_perigo) {
        setNivel(data.nivel_perigo);
        setTexto(""); // Limpa o campo de texto após sucesso
        Keyboard.dismiss(); // Fecha o teclado
      } else {
        console.warn("Resposta inesperada:", data);
        Alert.alert("Erro", "Resposta inesperada: " + JSON.stringify(data));
        setErro("Erro ao classificar. Resposta inesperada.");
      }
    } catch (error: any) {
      console.error("Erro de conexão:", error);
      Alert.alert("Erro de conexão", error.message || "Erro desconhecido.");
      setErro("Erro de conexão com a API.");
    }

    setCarregando(false);
  };

  const corNivel = {
    baixo: "yellow",
    médio: "orange",
    alto: "red",
    crítico: "darkred",
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Classificador de Risco</Text>

        <TextInput
          style={styles.input}
          placeholder="Descreva o desastre, por exemplo: 'Alagamento na rua após forte chuva'"
          value={texto}
          onChangeText={setTexto}
          multiline
        />

        <TouchableOpacity
          style={[styles.botao, carregando && { opacity: 0.6 }]}
          onPress={classificar}
          disabled={carregando}
        >
          <Text style={styles.botaoTexto}>
            {carregando ? "Classificando..." : "Classificar"}
          </Text>
        </TouchableOpacity>

        {nivel ? (
          <Text
            style={[
              styles.resultado,
              { color: corNivel[nivel as keyof typeof corNivel] || "#000" },
            ]}
          >
            Nível de Perigo: {nivel.toUpperCase()}
          </Text>
        ) : erro ? (
          <Text style={[styles.resultado, { color: "#cc0000" }]}>{erro}</Text>
        ) : null}

        {carregando && <ActivityIndicator style={{ marginTop: 20 }} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    minHeight: 120,
    borderColor: "#aaa",
    borderWidth: 1,
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
    textAlignVertical: "top",
  },
  botao: {
    backgroundColor: "#446EA4",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  resultado: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
