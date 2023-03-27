import fetchJson from './utils/fetch-json.js'

const BACKEND_URL = 'https://course-js.javascript.ru'

export default class ColumnChart {
  element
  graphicParts = {}
  chartHeight = 50

  constructor({
    label = '',
    link = '',
    formatHeading = data => data,
    url = '',
    range = {
      from: new Date(),
      to: new Date()
    }
  } = {}) {
    this.url = new URL(url, BACKEND_URL)
    this.range = range
    this.label = label
    this.link = link
    this.formatHeading = formatHeading

    this.render()
    this.update(this.range.from, this.range.to)
    /* Почему update в конструкторе, а не как все прочие методы дальше по коду */
  }
  render() {
    const element = document.createElement('div')
    element.innerHTML = this.template

    this.element = element.firstElementChild
    this.graphicParts = this.getGraphicParts(this.element)
  }
  get template() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${
        this.chartHeight
      }">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header"></div>
          <div data-element="body" class="column-chart__chart"></div>
        </div>
      </div>
    `
  }

  getGraphicParts(element) {
    const parts = element.querySelectorAll('[data-element]')
    return [...parts].reduce((left, right) => {
      left[right.dataset.element] = right
      return left
    }, {})
  }
  getGraphTitle(data) {
    return this.formatHeading(
      Object.values(data).reduce((prev, next) => prev + next, 0)
    )
  }
  async loadData(from, to) {
    this.url.searchParams.set('from', from.toISOString())
    this.url.searchParams.set('to', to.toISOString())

    return await fetchJson(this.url)
  }

  setNewRange(from, to) {
    this.range.from = from
    this.range.to = to
  }

  getColumnBody(data) {
    const maxValue = Math.max(...Object.values(data))

    return Object.entries(data)
      .map(([key, value]) => {
        const scale = this.chartHeight / maxValue
        const percent = ((value / maxValue) * 100).toFixed(0)
        const tooltip = `<span>
        <small>${key.toLocaleString('default', { dateStyle: 'medium' })}</small>
        <br>
        <strong>${percent}%</strong>
      </span>`

        return `<div style="--value: ${Math.floor(
          value * scale
        )}" data-tooltip="${tooltip}"></div>`
      })
      .join('')
  }

  getLink() {
    return this.link
      ? `<a class="column-chart__link" href="${this.link}">View all</a>`
      : ''
  }
  async update(from, to) {
    this.element.classList.add('column-chart_loading')
    const data = await this.loadData(from, to)
    this.setNewRange(from, to)
    if (data && Object.values(data).length) {
      this.graphicParts.header.textContent = this.getGraphTitle(data)
      this.graphicParts.body.innerHTML = this.getColumnBody(data)
      this.element.classList.remove('column-chart_loading')
    }
    this.data = data
  }

  destroy() {
    this.element.remove()
  }
}
