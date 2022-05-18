import { getData } from "./getData.js";

const json = "data/tags.json";

const data = await getData(json);

console.log(data);

// const container = document.getElementById("container");

// container.innerHTML = data.result
//   .map(
//     (result) => `
//       <p id=${result.id} class="address">${result.address}</p>
//     `
//   )
//   .join("");
