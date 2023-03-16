export default class SortableTable {
  element
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig
    this.data = data

    this.render()
  }
  render() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.createPage()
    this.element = wrapper
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
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.data.map(item => this.tablesRow(item)).join('')}
      <div/>
    `
  }
  tablesRow(product) {
    return `
      <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="${product.images[0]['utl']}">
        </div>
        <div class="sortable-table__cell">${product.title}</div>

        <div class="sortable-table__cell">${product.quantity}</div>
        <div class="sortable-table__cell">${product.price}</div>
        <div class="sortable-table__cell">${product.sales}</div>
      </a>
    `
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
