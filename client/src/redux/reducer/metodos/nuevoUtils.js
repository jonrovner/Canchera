export const filtrarTodo = (clubes, payload) => {
  let { ciudad, size, clubName } = payload;

  // filtro por ciudad, si es que existe.
  if (ciudad) {
    clubes = clubes.filter((club) =>
      club.ciudad.toUpperCase().includes(ciudad.toUpperCase())
    );
  }

  // filtro por size, si es que existe.
  if (size) {
    clubes = clubes.filter((club) => {
      let test = club.Fields.map((field) => {
        return field.players;
      });
      return test.includes(+size);
    });
  }

  // filtro por clubName si es que existe.
  if (clubName) {
    clubes = clubes.filter((club) =>
      club.name.toUpperCase().includes(clubName.toUpperCase())
    );
  }

  // devuelvo lo que haya quedado en clubes.
  return clubes;
};
