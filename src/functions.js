function createBoard(rows, columns) {
  return Array(rows).fill(0).map((_, row) => {
    return Array(columns).fill(0).map((_, column) => {
      return {
        row,
        column,
        opened: false,
        flagged: false,
        mined: false,
        exploded: false,
        nearMines: 0
      }
    })
  })
}

function spreadMines(board, minesAmount) {

  const rows = board.length
  const columns = board[0].length
  let minesplanted = 0
  while (minesAmount > minesplanted) {
    const rowSelected = parseInt(Math.random() * rows, 10)
    const colSelected = parseInt(Math.random() * columns, 10)

    if (!board[rowSelected][colSelected].mined) {
      board[rowSelected][colSelected].mined = true
      minesplanted++
    }
  }
}

function createMinedBoard(rows, columns, minesAmount) {
  const board = createBoard(rows, columns)
  spreadMines(board, minesAmount)
  return board
}

function cloneBoard(board) {
  return board.map(rows => {
    return rows.map(fields => {
      return { ...fields }
    })
  })
}

function getNeighbors(board, row, column) {
  const neighbors = []
  const rows = [row - 1, row, row + 1]
  const columns = [column - 1, column, column + 1]
  rows.forEach(r => {
    columns.forEach(c => {
      const different = r !== row || c !== column
      const validRow = r >= 0 && r < board.length
      const validCol = c >= 0 && c < board[0].length
      if (different && validCol && validRow) {
        neighbors.push(board[r][c])
      }
    })
  })
  return neighbors
}

function safeNeighborhood(board, row, column) {
  function safes(result, neighbor) {
    return result && !neighbor.mined
  }
  return getNeighbors(board, row, column).reduce(safes, true)
}

function openField(board, row, column) {
  const field = board[row][column]
  if (!field.opened) {
    field.opened = true
    if (field.mined) {
      field.exploded = true
    } else if (safeNeighborhood(board, row, column)) {
      getNeighbors(board, row, column).forEach(nu => openField(board, nu.row, nu.column))
    } else {
      const neighbors = getNeighbors(board, row, column)
      field.nearMines = neighbors.filter(n => n.mined).length
    }
  }
}

function invertFlag(board, row, column) {
  const field = board[row][column]
  field.flagged = !field.flagged
}
function flagsUsed(board) {
  return fields(board).filter(field => field.flagged).length
}

const fields = board => [].concat(...board)
const hasExplosion = board => fields(board).filter(field => field.exploded).length > 0
const pendding = field => (field.mined && !field.flagged) || (!field.mined && !field.opened)
const wonGame = board => fields(board).filter(pendding).length === 0
const showMines = board => fields(board).filter(field => field.mined).forEach(m => m.opened = true)
export {
  createMinedBoard,
  cloneBoard,
  openField,
  hasExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed
}