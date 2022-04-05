export const order = (array, orderBy) => {
  if (orderBy === "asc") {
    array = array.slice().sort((a, b) => {
      /*  var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0; */
      return a.name.localeCompare(b.name);
    });
  } else if (orderBy === "dsc") {
    array = array.slice().sort((a, b) => {
      /* var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0; */
      return b.name.localeCompare(a.name);
    });
  } /* else if (orderBy === "hp") {
    array = array
      .map((a) => a.Fields)
      .map((f) => f.slice().sort((b, a) => a.price - b.price));
  } else if (orderBy === "lp") {
    array = array.map((a) =>
      a.Fields.map((f) => f.slice().sort((b, a) => b.price - a.price))
    );

  } */ else if (orderBy === "hr") {
    array = array.slice().sort((a, b) => b.score - a.score);
  } else if (orderBy === "lr") {
    array = array.slice().sort((a, b) => a.score - b.score);
  }

  return array;
};
