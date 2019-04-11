class Totoro {
  
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  jump() {
    return `Totoro(${this.name}) jump`;
  }
}

export default Totoro;