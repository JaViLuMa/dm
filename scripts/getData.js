export class Data {
  async getData(file) {
    this.data = await fetch(file).then((response) => response.json());
  }
}
