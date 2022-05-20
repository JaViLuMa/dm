import { Main } from "./main.js";

const json = "../data/tags.json";

const data = new Main(json);

data.init().then(() => {
  data.consoleData();
  data.renderTableRowsWithData();
});
