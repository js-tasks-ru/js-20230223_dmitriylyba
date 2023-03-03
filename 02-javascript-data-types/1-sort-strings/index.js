/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
//мой способ
// export function sortStrings(arr, param = 'asc') {
//   const newArr = [...arr]
//   if (param === 'desc') {
//     return newArr
//       .sort((a, b) => a.localeCompare(b, 'ru-RU', { caseFirst: 'upper' }))
//       .reverse()
//   } else if (param === 'asc') {
//     return newArr.sort((a, b) =>
//       a.localeCompare(b, ['ru', 'en'], { caseFirst: 'upper' })
//     )
//   } else {
//     return newArr
//   }
// }
// приведенный на занятии
export function sortStrings(arr, param = 'asc') {
  const directions = {
    asc: 1,
    desc: -1
  }
  const direction = directions[param]
  if (typeof direction === 'undefined') {
    throw new Error(`Unknown params: ${param}`)
  }
  return [...arr].sort((string1, string2) => {
    return (
      direction *
      string1.localeCompare(string2, ['ru', 'en'], { caseFirst: 'upper' })
    )
  })
}
