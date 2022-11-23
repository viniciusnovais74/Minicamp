import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { Component } from 'react'
import params from './src/params'
import { createMinedBoard, cloneBoard, hasExplosion, openField, showMines, wonGame, invertFlag, flagsUsed } from './src/functions'
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import LevelSelection from './src/screens/LevelSelection'
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return +Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hasExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert("Perdeu", "QUE BURRO")
    }

    if (won) {
      Alert.alert("Parabéns", "Ganhou!")
    }

    this.setState({ board, lost, won })
  }

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)
    if (won) {
      Alert.alert("Parabéns", "Ganhou!")
    }
    this.setState({ board, won })
  }

  levelSelection = level => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <LevelSelection visible={this.state.showLevelSelection} levelSelected={this.levelSelection} cancel={() => this.setState({ showLevelSelection: false })} />
        <Header onFlagPress={_ => this.setState({ showLevelSelection: true })} flagsLeft={this.minesAmount() - flagsUsed(this.state.board)} onNewGame={() => this.setState(this.createState())} />
        <View style={styles.board}>
          <MineField board={this.state.board} openField={this.onOpenField} selectField={this.onSelectField} />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f5fcff"
  },
  board: {
    alignItems: 'center',
    backgroundColor: "#AAA"
  }
})