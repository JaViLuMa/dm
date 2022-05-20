export class MapTableRows {
  totalSiteSections(sites) {
    let sum = 0;

    sites.forEach((site) => (sum += site.siteSections.length));

    return sum;
  }

  addEventOnClickToTableRows(data) {
    data.result.forEach((row) => {
      const mainRow = document.getElementById(`main-row-${row.id}`);

      mainRow.addEventListener("click", () => {
        const hiddenRow = document.getElementById(`hidden-row-${row.id}`);

        if (hiddenRow.style.display === "table-row") {
          hiddenRow.style.display = "none";
        } else {
          hiddenRow.style.display = "table-row";
        }
      });
    });
  }

  mapRows(data) {
    const tableBody = document.getElementById("table-body");

    tableBody.innerHTML = data.result
      .map(
        (result) =>
          `<tr id="main-row-${result.id}"  class="table__row--specific"><td>${
            result.name
          }</td><td>${this.totalSiteSections(result.sites)}</td><td>${
            result.isDeleted ? "YES" : "NO"
          }</td></tr><tr id="hidden-row-${
            result.id
          }" class="table__row--hidden"><td colspan="3" class="table__data-cell__div"><div style="background-color: red">${
            result.id
          }</div></td></tr>`
      )
      .join("");

    this.addEventOnClickToTableRows(data);
  }
}
