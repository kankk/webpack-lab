class HelloButton {
  constructor(text) {
    this.button = document.createElement('button');
    this.button.innerHTML = text;
    this.button.onclick = () => {
      alert('hello world');
    }

    return this.button;
  }
}

export default HelloButton