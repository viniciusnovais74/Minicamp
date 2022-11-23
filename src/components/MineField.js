import { View, StyleSheet } from 'react-native'
import React from 'react'
import Field from './Field'


export default function MineField({ board, openField, selectField }) {
  const rows = board.map((row, r) => {
    const columns = row.map((field, c) => {
      return <Field {...field} key={c} onOpen={() => openField(r, c)} onSelect={() => selectField(r, c)} />
    })
    return <View style={{ flexDirection: "row" }} key={r}>{columns}</View>

  })
  return <View style={styles.container}>{rows}</View>
}
const styles = StyleSheet.create({
  container: {

    backgroundColor: "#EEE"
  }
})