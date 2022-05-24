export class HTMLFormat {
  htmlEscape(str) {
    const text = document.createTextNode(str);
    const p = document.createElement("p");

    p.appendChild(text);

    return p.innerHTML;
  }

  /** Format HTML inside template string literals */
  html(literalSections, ...subsets) {
    return literalSections.raw.reduce((acc, lit, i) => {
      let subset = subsets[i - 1];

      if (Array.isArray(subset)) {
        subset = subset.join("");
      }

      if (acc.endsWith("$")) {
        subset = htmlEscape(subset);
        acc = acc.slice(0, -1);
      }

      return acc + subset + lit;
    });
  }
}
