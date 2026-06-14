import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CATEGORIES = ["Seguridad", "Clima", "Tráfico"];

export const ReportForm = ({ 
  onSubmit, 
  onCancel 
}: { 
  onSubmit?: (category: string) => void;
  onCancel?: () => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Reporte</Text>
      
      <View style={styles.optionsContainer}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.optionButton,
              selectedCategory === cat && styles.optionButtonActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                selectedCategory === cat && styles.optionTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.submitButton} 
        activeOpacity={0.8}
        onPress={() => onSubmit?.(selectedCategory)}
      >
        <Text style={styles.submitButtonText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.cancelButton} 
        activeOpacity={0.8}
        onPress={onCancel}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C1C1E",
    borderRadius: 24,
    padding: 24,
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 32,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#2A2A2A",
    borderWidth: 1,
    borderColor: "#333",
  },
  optionButtonActive: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  optionText: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "600",
  },
  optionTextActive: {
    color: "#000",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#fff",
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "600",
  },
});
