export class MapTableRows {
  totalSiteSections(sites) {
    let sum = 0;

    sites.forEach((site) => (sum += site.siteSections.length));

    return sum;
  }

  mapRows(data) {
    const tableBody = document.getElementById("table-body");

    tableBody.innerHTML = data.result
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
