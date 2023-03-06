/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  const arr = string.split('')
  const set = new Set(arr)
  const map = new Map(Object.entries(arr))
  let result
  if (size < 1) {
    result = ''
  }
  if (size < 2) {
    console.log(size < 2)
    result = [...set].join('')
  }
  if (size > 1) {
    // не решенное условие
    // for (let i = 0; size; i++) {}
    // result = map.values()
    result = string
  }

  return result
}
