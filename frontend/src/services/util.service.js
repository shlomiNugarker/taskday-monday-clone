export const utilService = {
  delay,
  getRandomInt,
  makeId,
  getRandomPredefinedColor,
}

function delay(ms = 1500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function getRandomPredefinedColor() {
  const predefineColors = [
    '#3da99c',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#00ecd1',
    '#1e90ff',
    '#c71585',
    '#c7f5a5',
    '#c7158577',
  ]
  const idx = getRandomInt(0, predefineColors.length)
  return predefineColors[idx]
}
