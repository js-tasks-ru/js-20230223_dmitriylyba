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
    console.log('result', result)
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
      </div>
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
  sort(field, order) {
    const sortedData = this.sortData(field, order)
    const allColumns = this.element.querySelectorAll(
      '.sortable-table__cell[data-id]'
    )
    const currentColumn = this.element.querySelector(
      `.sortable-table__cell[data-id="${field}"]`
    )

    // NOTE: Remove sorting arrow from other columns
    allColumns.forEach(column => {
      column.dataset.order = ''
    })

    currentColumn.dataset.order = order

    this.subElements.body.innerHTML = this.tablesRow(sortedData)
  }

  sortData(field, order) {
    const arr = [...this.data]
    const column = this.headerConfig.find(item => item.id === field)
    const { sortType } = column
    const directions = {
      asc: 1,
      desc: -1
    }
    const direction = directions[order]

    return arr.sort((a, b) => {
      switch (sortType) {
        case 'number':
          return direction * (a[field] - b[field])
        case 'string':
          return direction * a[field].localeCompare(b[field], ['ru', 'en'])
        default:
          throw new Error(`Unknown type ${sortType}`)
      }
    })
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
