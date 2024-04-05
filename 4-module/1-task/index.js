function makeFriendsList(friends) {
  let ulElement = document.createElement('ul');

  for (let frend of friends) {
    let liElement = `<li>${frend.firstName} ${frend.lastName}</li>`;
    ulElement.insertAdjacentHTML('beforeend', liElement);
  }

  return ulElement;
}
