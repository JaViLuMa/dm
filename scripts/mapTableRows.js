import { HTMLFormat } from "./htmlFormat.js";

export class MapTableRows {
  constructor() {
    this.HTMLFormat = new HTMLFormat();
  }

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
          const arrowIcon = document.getElementById(`arrow-icon-${row.id}`);

          if (hiddenRow.style.display === "table-row") {
            hiddenRow.style.display = "none";
            arrowIcon.classList = "website__icon--arrow icon--arrow--normal";
          } else {
            hiddenRow.style.display = "table-row";
            arrowIcon.classList = "website__icon--arrow icon--arrow--color";
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

  tooltip(deleted, html) {
    if (deleted) {
      return html`<span
        style="color: #eb5757; margin-right: 16px;"
        class="tooltip"
        >●<span class="tooltip--text">Not Operational</span></span
      >`;
    } else {
      return html`<span
        style="color: #27ae60; margin-right: 16px;"
        class="tooltip"
        >●<span class="tooltip--text">Operational</span></span
      >`;
    }
  }

  isOperational(deleted) {
    if (deleted) {
      return `<span style="color: #eb5757; margin-right: 4px;">●</span>`;
    } else {
      return `<span style="color: #27ae60; margin-right: 4px;">●</span>`;
    }
  }

  hiddenRowInformation(sites, html) {
    return `${sites
      .map(
        (site) => html`
          <div class="container--item">
            <table class="item__table--hidden">
              <tbody>
                ${site.siteSections.map(
                  (section) =>
                    html`<tr class="table--hidden__row">
                      <td class="checkbox hidden__row__checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="chx-${section.id}-hidden"
                          />
                        </label>
                      </td>
                      <td class="hidden__row--section">${section.name}</td>
                      <td class="hidden__row--operational">
                        ${this.tooltip(section.isDeleted, html)}<img
                          src="static/images/more-icon.svg"
                          alt="more-icon-${section.id} icon"
                        />
                      </td>
                    </tr>`
                )}
              </tbody>
            </table>
          </div>
        `
      )
      .join("")}`;
  }

  renderTableRows(data, currentPage, pageSize, isChecked) {
    const html = this.HTMLFormat.html;
    const tableBody = document.getElementById("table-body");

    const filterData = data.result.filter((_, index) => {
      let start = (currentPage - 1) * pageSize;
      let end = currentPage * pageSize;

      if (index >= start && index < end) {
        return true;
      }
    });

    const amountOfRows = document.getElementById("amount-of-rows");

    let from = pageSize * currentPage - pageSize + 1;
    let to =
      pageSize * currentPage > data.result.length
        ? data.result.length
        : pageSize * currentPage;

    amountOfRows.innerHTML = `${from} - ${to} of ${data.result.length}`;

    tableBody.innerHTML = `
    ${filterData
      .map(
        (row) => html`
          <tr class="table__body__row">
            <td class="checkbox" class="row__checkbox">
              <label for="chx-${row.id}" class="visually-hidden"
                >Checkbox ${row.id}</label
              >
              <input
                id="chx-${row.id}"
                type="checkbox"
                ${isChecked ? "checked" : ""}
              />
            </td>
            <td id="data-cell-${row.id}" class="row--website">
              <img
                class="website__icon"
                src="static/images/row-icon.svg"
                alt="row-icon-${row.id} icon"
                width="16px"
                height="16px"
              />
              <img
                id="arrow-icon-${row.id}"
                class="website__icon--arrow"
                src="static/images/arrow-icon.svg"
                alt="arrow-icon-${row.id} icon"
                width="6px"
                height="8px"
              />
              ${row.name}
            </td>
            <td class="row--sections">${this.totalSiteSections(row.sites)}</td>
            <td class="row--status">
              ${this.isOperational(row.isDeleted)}Operational
            </td>
          </tr>
          <tr id="hidden-row-${row.id}" class="row--hidden">
            <td colspan="4">
              <div class="row--hidden__title"><p>WEBSITE SECTIONS</p></div>
              <div class="row--hidden__container">
                ${this.hiddenRowInformation(row.sites, html)}
              </div>
            </td>
          </tr>
        `
      )
      .join("")}
    `;

    this.addEventOnClickToTableRows(filterData);
  }

  mapRows(data) {
    this.pagination(data);
  }
}
