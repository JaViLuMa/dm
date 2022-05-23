export class MapTableRows {
  totalSiteSections(sites) {
    let sum = 0;

    sites.forEach((site) => (sum += site.siteSections.length));

    return sum;
  }

  addEventOnClickToTableRows(data) {
    data.forEach((row) => {
      const mainRow = document.getElementById(`main-row-${row.id}`);

      if (mainRow) {
        mainRow.addEventListener("click", () => {
          const hiddenRow = document.getElementById(`hidden-row-${row.id}`);

          if (hiddenRow.style.display === "table-row") {
            hiddenRow.style.display = "none";
          } else {
            hiddenRow.style.display = "table-row";
          }
        });
      }
    });
  }

  pagination(data) {
    let currentPage = 1;

    const numberOfRowsInput = document.getElementById("number-of-rows");
    let pageSize = numberOfRowsInput.value;

    this.renderTableRows(data, currentPage, pageSize);

    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");

    numberOfRowsInput.addEventListener("change", (e) => {
      pageSize = e.target.value;
      this.renderTableRows(data, currentPage, pageSize);
    });

    nextButton.addEventListener("click", () => {
      if (currentPage * pageSize < data.result.length) currentPage++;
      this.renderTableRows(data, currentPage, pageSize);
    });

    prevButton.addEventListener("click", () => {
      if (currentPage > 1) currentPage--;
      this.renderTableRows(data, currentPage, pageSize);
    });
  }

  hiddenRowInformation(sites) {
    return sites
      .map(
        (site) => `
    <div class="row--hidden__container--item">
    <table class="item__table">
    <tbody>
    ${site.siteSections
      .map(
        (section) =>
          `<tr class="item__row-specific"><td>${section.name}</td><td>${
            section.isDeleted ? "YES" : "NO"
          }</td></tr>`
      )
      .join("")}
    </tbody>
    </table>
    </div>
    `
      )
      .join("");
  }

  renderTableRows(data, currentPage, pageSize) {
    const tableBody = document.getElementById("table-body");

    const filterData = data.result.filter((_, index) => {
      let start = (currentPage - 1) * pageSize;
      let end = currentPage * pageSize;

      if (index >= start && index < end) {
        return true;
      }
    });

    tableBody.innerHTML = filterData
      .map(
        (row) =>
          `
        <tr id="main-row-${
          row.id
        }"  class="table__row--specific"><td><img class="row--specific--icon" src="static/images/row-icon.svg" alt="${
            row.id
          } icon" />${
            row.name
          }</td><td style="padding-left: 12px">${this.totalSiteSections(
            row.sites
          )}</td><td style="padding-left: 12px">${
            row.isDeleted ? "YES" : "NO"
          }</td></tr>
        <tr id="hidden-row-${
          row.id
        }" class="table__row--hidden"><td colspan="3" class="table__data-cell__div">
        <div class="row--hidden__title"><p>WEBSITE SECTIONS</p></div>
        <div class="row--hidden__container">
        ${this.hiddenRowInformation(row.sites)}
        </div></td></tr>
      `
      )
      .join("");

    this.addEventOnClickToTableRows(filterData);
  }

  mapRows(data) {
    this.pagination(data);
  }
}
