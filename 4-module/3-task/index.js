function checkAge(cell) {
  if (cell.textContent < 18) {
    cell.style.textDecoration = 'line-through';
  }
}

function checkGender(cell) {
  switch (cell.textContent) {
  case 'm':
    cell.classList.add('male');
    return;
  case 'f':
    cell.classList.add('female');
    return;
  }
}

function checkStatus(cell) {
  if (cell.dataset.available === 'true') {
    cell.classList.add('available');
  } else {
    cell.classList.add('unavailable');
  }
}


function highlight(table) {
  let CellNumberAge = 1;
  let CellNumberGender = 2;
  let CellNumberStatus = 3;

  for (let i = 0; i < table.tBodies[0].rows.length; i++) {
    let row = table.tBodies[0].rows[i];

    let cellAge = row.cells[CellNumberAge];
    checkAge(cellAge);

    let cellGender = row.cells[CellNumberGender];
    checkGender(cellGender);

    let cellStatus = row.cells[CellNumberStatus];
    if (cellStatus.hasAttribute('data-available')) {
      checkStatus(cellStatus);
    } else {
      cellStatus.hidden = 'true';
    }
  }
}
