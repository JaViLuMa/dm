export class MapTableRows {
  totalSiteSections(sites) {
    let sum = 0;

    sites.forEach((site) => (sum += site.siteSections.length));

    return sum;
  }

  addEventOnClickToTableRows(data) {
    data.forEach((row) => {
      const dataCellRow = document.getElementById(`data-cell-${row.id}`);

      if (dataCellRow) {
        dataCellRow.addEventListener("click", () => {
          const hiddenRow = document.getElementById(`hidden-row-${row.id}`);
          const arrowIcon = document.getElementById(`arrow-row-${row.id}`);

          if (hiddenRow.style.display === "table-row") {
            hiddenRow.style.display = "none";
            arrowIcon.classList =
              "row--specific--icon--arrow icon--arrow--normal";
          } else {
            hiddenRow.style.display = "table-row";
            arrowIcon.classList =
              "row--specific--icon--arrow icon--arrow--color";
          }
        });
      }
    });
  }

  pagination(data) {
    let currentPage = 1;

    const numberOfRowsInput = document.getElementById("number-of-rows");
    let pageSize = numberOfRowsInput.value;

    const chxHeader = document.getElementById("checkbox-header");

    let isChecked = false;

    chxHeader.addEventListener("click", () => {
      isChecked = chxHeader.checked;
      this.renderTableRows(data, currentPage, pageSize, isChecked);
    });

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

  isOperational(deleted) {
    if (deleted) {
      return `<span style="color: #eb5757; margin-right: 4px;">●</span>`;
    } else {
      return `<span style="color: #27ae60; margin-right: 4px;">●</span>`;
    }
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
          `<tr class="item__row-specific">
          <td class="row--hidden--checkbox">
          <label>
          <input type="checkbox" name="chx" />
          </label>
          </td>
          <td>${
            section.name
          }</td><td class="row--hidden--operational">${this.isOperational(
            section.isDeleted
          )}</td></tr>`
      )
      .join("")}
    </tbody>
    </table>
    </div>
    `
      )
      .join("");
  }

  renderTableRows(data, currentPage, pageSize, isChecked) {
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
        <tr class="table__row--specific">
        <td class="checkbox">
        <label>
        <input type="checkbox" name="chx" ${isChecked && "checked"} />
        </label>
        </td>
        <td id="data-cell-${row.id}">
        <img class="row--specific--icon" src="static/images/row-icon.svg" alt="row-icon-${
          row.id
        } icon" />
        <img id="arrow-row-${
          row.id
        }" class="row--specific--icon--arrow" src="static/images/arrow-icon.svg" alt="arrow-icon-${
            row.id
          } icon" />
          ${row.name}</td>
        <td style="padding-left: 12px">${this.totalSiteSections(row.sites)}</td>
        <td style="padding-left: 12px">${this.isOperational(
          row.isDeleted
        )}Operational</td>
        </tr>
        <tr id="hidden-row-${
          row.id
        }" class="table__row--hidden"><td colspan="4" class="table__data-cell__div">
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
