import { Data } from "./getData.js";

const json = "../data/tags.json";
class DoSomething extends Data {
  constructor(file) {
    super();
    this.file = file;
  }

  async init() {
    await this.getData(this.file);
  }

  consoleData() {
    console.log(this.data);
  }

  totalSiteSections(sites) {
    let sum = 0;

    sites.forEach((site) => (sum += site.siteSections.length));

    return sum;
  }

  append() {
    const tableBody = document.getElementById("table-body");

    tableBody.innerHTML = this.data.result
      .map(
        (result) =>
          `<tr class="table__row--specific"><td>${
            result.name
          }</td><td>${this.totalSiteSections(result.sites)}</td><td>${
            result.isDeleted ? "YES" : "NO"
          }</td></tr>`
      )
      .join("");
  }
}

const data = new DoSomething(json);

data.init().then(() => {
  data.consoleData();
  data.append();
});
