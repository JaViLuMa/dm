export const getData = async (file) =>
  fetch(file).then((response) => response.json());
