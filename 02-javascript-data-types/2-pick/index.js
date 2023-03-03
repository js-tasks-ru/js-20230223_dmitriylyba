/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const newObj = {}
  const arg = [...fields]

  for (let key in obj) {
    if (arg.includes(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

//решение на уроке
// export const pick = (obj, ...fields) => {
//   const newObj = {}
//
//   for (const [key, value] of Object.entries(obj)) {
//     if (fields.includes(key)) {
//       newObj[key] = value
//     }
//   }
//   return newObj
// }
