export default class Task {
  constructor(name, pinned = false) {
    this.name = name;
    this.pinned = pinned;
  }

  pinChange() {
    this.pinned = !this.pinned;
  }
}
