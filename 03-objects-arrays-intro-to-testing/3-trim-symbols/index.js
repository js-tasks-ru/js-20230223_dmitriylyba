/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
const trimSymbols = (string, size) => {
  if (size === 0) {
    return ''
  }
  if (size === undefined) {
    return string
  }

  const firstSlice = string.slice(0, size)
  const rest = [...string.slice(size)]

  return rest.reduce((accumString, char) => {
    console.log('firstSlice', firstSlice)
    // console.log('repeat', char.repeat(size))
    if (!accumString.endsWith(char.repeat(size))) {
      accumString += char
    }
    return accumString
  }, firstSlice)
}

console.log(trimSymbols('xxxaaaaab', 1))
// node ./03-objects-arrays-intro-to-testing/3-trim-symbols/index.js
