/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  let way
  if (path.split('.') < 1) {
    way = path
  } else {
    way = path.split('.').at(-1)
  }

  return function (obj) {
    const arr = new Map(Object.entries(obj))

    const check = [...arr.values()][0]
    if (check[way]) {
      return check[way]
    }

    return Object.entries([...arr.values()][0].at(-1))
  }
}

// const obj4 = { more: { nested: { property: 1 } } }
// const obj2 = { nested: { property: 1 } }
// const getter = createGetter('nested.property')
// const getter = createGetter('more.nested.property')
// console.log(getter(obj4))
// node ./03-objects-arrays-intro-to-testing/1-create-getter/index.js
