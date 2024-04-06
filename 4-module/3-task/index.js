function highlight(table) {
  let CellAge = 1;
  let CellGender = 2;
  let CellStatus = 3;

  for (let i = 0; i < table.tBodies[0].rows.length; i++) {
    let row = table.tBodies[0].rows[i];

    if (row.cells[CellAge].textContent < 18) {
      row.style.textDecoration = 'line-through';
    }

    if (row.cells[CellGender].textContent === 'm') {
      row.classList.add('male');
    }
    if (row.cells[CellGender].textContent === 'f') {
      row.classList.add('female');
    }

    if (row.cells[CellStatus].hasAttribute('data-available')) {
      if (row.cells[CellStatus].dataset.available === 'true') {
        row.classList.add('available');
      } else {
        row.classList.add('unavailable');
      }
    } else {
      row.hidden = 'true';
    }
  }
}
