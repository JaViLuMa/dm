import { Data } from "./getData.js";
import { MapTableRows } from "./mapTableRows.js";

export class Main extends Data {
  constructor(file) {
    super();
    this.file = file;
    this.mapTableRows = new MapTableRows();
  }

  async init() {
    await this.getData(this.file);
  }

  consoleData() {
    console.log(this.data);
  }

  renderTableRowsWithData() {
    this.mapTableRows.mapRows(this.data);
  }
}
