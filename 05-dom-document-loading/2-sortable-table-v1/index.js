export default class SortableTable {
  element
  sortedArr
  subElements = {}
  constructor(headerConfig = [], data = []) {
    /* headerConfig передается массив объектов с названиями/id/характеристикой столбца для TableHeader*/
    this.headerConfig = headerConfig
    this.data = data

    this.render()
  }
  render() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.createPage()
    this.element = wrapper.firstElementChild
    this.subElements = this.getSubElements(this.element)
  }
  getSubElements(element) {
    const result = {}
    const elements = element.querySelectorAll('[data-element]')

    for (const subElement of elements) {
      const name = subElement.dataset.element

      result[name] = subElement
    }

    return result
  }
  createPage() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          ${this.createHeader()}
          ${this.tableBody()}
        </div>
     </div>
    `
  }
  createHeader() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.headerConfig.map(item => this.headerItems(item)).join('')}
          </div>
        </div>
     </div>
    `
  }
  headerItems(item) {
    return `
      <div
        className='sortable-table__cell'
        data-id='${item.id}'
        data-sortable='${item.sortable}'
        data-order='asc'
      >
        <span> ${item.title} </span>
        <span data-element='arrow' className='sortable-table__sort-arrow'>
          <span className='sort-arrow'></span>
        </span>
      </div>
    `
  }

  tableBody() {
    // console.log('tableBody', this.sortedArr)
    return `
      <div data-element="body" class="sortable-table__body">
        ${(this.sortedArr ? this.sortedArr : this.data)
          .map(item => this.tablesRow(item))
          .join('')}
      <div/>
    `
  }
  tablesRow(product) {
    return `
      <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="${product.images[0]['url']}">
        </div>
        <div class="sortable-table__cell">${product.title}</div>

        <div class="sortable-table__cell">${product.quantity}</div>
        <div class="sortable-table__cell">${product.price}</div>
        <div class="sortable-table__cell">${product.sales}</div>
      </a>
    `
  }

  sort(fieldValue, orderValue) {
    /*
    !!! Владимир, решил реализовать задачу путем пересортировки массива данных ->
    отображение строк таблицы в новой последовательности
    НО!
    1 В this.sortedArr я получаю отсортированный должным образом массив
    2 в методе tableBody() установлено условие из какого массива формировать таблицу
    и если sortedArr true - взять таковую.
    В моем понимании, когда я помещаю в sortedArr массив отсортированных данных и он становится true
    -> таблица должна пересобраться.
    Но этого не происходит и более того даже консоль в методе tableBody() ничего не выводит/не срабатывает
    из чего делаю предположение, что чего-то в материалах не понял.
    Почему метод tableBody() "не видит обновленный sortedArr ?

     */

    const whatSort = (fieldValue = 'title' ? 'title' : 'other')

    const directions = {
      asc: 1,
      desc: -1
    }
    const direction = directions[orderValue]

    this.sortedArr = this.data.sort((a, b) => {
      switch (whatSort) {
        case 'other':
          return direction * (a[fieldValue] - b[fieldValue])
        case 'title':
          return (
            direction * a[fieldValue].localeCompare(b[fieldValue], ['ru', 'en'])
          )
        default:
          throw new Error(`Unknown type ${whatSort}`)
      }
    })
    this.subElements.body.innerHTML = this.tablesRow(this.sortedArr)
    // console.log('sorted', this.sortedArr)
  }

  remove() {
    if (this.element) {
      this.element.remove()
    }
  }

  destroy() {
    this.remove()
    this.element = null
    this.subElements = {}
  }
}
