import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

export default ({ cancel, visible, levelSelected }) => {
  return (
    <Modal onRequestClose={cancel} visible={visible} animationType="slide" transparent={true}>
      <View style={styles.frame}>
        <View style={styles.container}>
          <Text style={styles.title}>Selecione o Nivel</Text>
          <TouchableOpacity
            style={[styles.button, styles.bgEasy]}
            onPress={() => levelSelected(0.1)}
          >
            <Text style={styles.buttonLabel}>Facil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.bgNormal]}
            onPress={() => levelSelected(0.2)}
          >
            <Text style={styles.buttonLabel}>Normal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.bgDificil]}
            onPress={() => levelSelected(0.3)}
          >
            <Text style={styles.buttonLabel}>Dificil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  frame: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  container: {
    backgroundColor: "#EEE",
    alignItems: "center",
    justifyContent: "center",
    padding: 15
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  button: {
    marginTop: 10,
    padding: 5,
    width:250
  },
  buttonLabel: {
    fontSize: 20,
    color: "#EEE",
    fontWeight: "bold"
  },
  bgEasy: {
    backgroundColor: "#49b65d"
  },
  bgNormal: {
    backgroundColor: "#2765F7"
  },
  bgDificil: {
    backgroundColor: "#F26337"
  }
})