const stack = []
let count = 0

const lineCreater = () => {
  return Array(20).fill(0).map(x => {
    return {
      'close-top': true,
      'close-right': true,
      'close-bottom': true,
      'close-left': true,
      visited: false,
    }
  })
}

const createPortalPos = () => {
  return [[0, Math.floor(Math.random() * 20)],
          [Math.floor(Math.random() * 20), 19],
          [19, Math.floor(Math.random() * 20)],
          [Math.floor(Math.random() * 20), 0]][Math.floor(Math.random() * 4)]
}

const createPortals = (pos) => {
  if (pos[0] === 0) {
    book[0][pos[1]]['close-top'] = false
    return
  }
  if (pos[0] === 19) {
    book[19][pos[1]]['close-bottom'] = false
    return
  }
  if (pos[1] === 0) {
    book[pos[0]][0]['close-left'] = false
    return
  }
  if (pos[1] === 19) {
    book[pos[0]][19]['close-right'] = false
  }
}

const findNextPos = (posY, posX) => {
  const nextPos = []
  if (posY > 0 && !book[posY - 1][posX].visited) nextPos.push([posY - 1, posX])
  if (posX < 19 && !book[posY][posX + 1].visited) nextPos.push([posY, posX + 1])
  if (posY < 19 && !book[posY + 1][posX].visited) nextPos.push([posY + 1, posX])
  if (posX > 0 && !book[posY][posX - 1].visited) nextPos.push([posY, posX - 1])
  return nextPos[Math.floor(Math.random() * nextPos.length)] || null
}

const connectTwoCells = (pos1, pos2) => {
  const [y1, x1] = pos1
  const [y2, x2] = pos2
  if (y1 < y2) {
    book[y1][x1]['close-bottom'] = false
    book[y2][x2]['close-top'] = false
    return
  }
  if (y1 > y2) {
    book[y1][x1]['close-top'] = false
    book[y2][x2]['close-bottom'] = false
    return
  }
  if (x1 < x2) {
    book[y1][x1]['close-right'] = false
    book[y2][x2]['close-left'] = false
    return
  }
  if (x1 > x2) {
    book[y1][x1]['close-left'] = false
    book[y2][x2]['close-right'] = false
    return
  }
}

const mazeWalker = () => {
  stack.push([0, 0])
  book[0][0].visited = true
  count++

  while (count < 400) {
    const currentPos = stack[stack.length - 1]
    const [posY, posX] = currentPos
    let nextPos

    if (nextPos = findNextPos(posY, posX)) {
      connectTwoCells(currentPos, nextPos)
      book[nextPos[0]][nextPos[1]].visited = true
      count++
      stack.push(nextPos)
    } else {
      stack.pop()
    }
  }

const entryPos = createPortalPos()
  let exitPos = createPortalPos()
  while (exitPos[0] === entryPos[0] && exitPos[1] === entryPos[1]) {
    exitPos = createPortalPos()
  }
  createPortals(entryPos)
  createPortals(exitPos)
}

const addClass = (cell, bookCell) => {
  for (let i in bookCell) {
    if (!bookCell[i]) cell.classList.add(i)
  }
}

// exec
let book = Array(20).fill(0).map(x => lineCreater())
mazeWalker()

// render
const cellLines = document.getElementsByClassName('maze-line')
for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 20; j++) {
    addClass(cellLines[i].children[j], book[i][j])
  }
}
















