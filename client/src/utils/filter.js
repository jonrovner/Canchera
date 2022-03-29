export const filter = (clubes, payload) => {
  let currentClubes = clubes;

  if (payload.ciudad.length > 0) {
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    currentClubes = clubes.filter(
      (c) =>
        removeAccents(c.ciudad.toLowerCase()).search(
          payload.ciudad.toLowerCase()
        ) >= 0
    );
  }

  if (payload.clubName.length > 0) {
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    currentClubes = clubes.filter(
      (c) =>
        removeAccents(c.name.toLowerCase()).search(
          payload.clubName.toLowerCase()
        ) >= 0
    );
  }

  if (payload.size.length > 0) {
    currentClubes = clubes.filter((c) =>
      c.Fields.some((f) => Number(f.players) === Number(payload.size))
    );
  }

  return currentClubes;
};
