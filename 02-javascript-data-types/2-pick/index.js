/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const newArr = { ...obj }
  const newObj = {}
  const arg = [...fields]

  for (let key in newArr) {
    if (arg.includes(key)) {
      newObj[key] = newArr[key]
    }
  }
  return newObj
}
