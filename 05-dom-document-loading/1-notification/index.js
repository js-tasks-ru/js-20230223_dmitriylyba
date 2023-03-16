export default class NotificationMessage {
  static shownMessage
  timer
  constructor(message = '', { duration = 1000, type = 'success' } = {}) {
    this.message = message
    this.duration = duration
    this.durationInSec = duration / 1000
    this.type = type

    this.render()
  }
  get template() {
    return `
      <div class="notification ${this.type}" style="--value:${this.durationInSec}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">success</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `
  }

  render() {
    const element = document.createElement('div')
    element.innerHTML = this.template
    this.element = element.firstElementChild
  }
  show(main = document.body) {
    console.dir(NotificationMessage)
    if (NotificationMessage.shownMessage) {
      NotificationMessage.shownMessage.remove()
    }
    main.append(this.element)

    this.timer = setTimeout(() => {
      this.remove()
    }, this.duration)

    NotificationMessage.shownMessage = this
  }

  remove() {
    if (this.element) {
      this.element.remove()
    }
  }

  destroy() {
    this.remove()
    this.element = null
    NotificationMessage.shownMessage = {}
  }
}
