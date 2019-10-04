document.addEventListener('DOMContentLoaded', () => {
  const takeButton = document.querySelector('.book-card__take-button');
  if (takeButton) {
    takeButton.onclick = () => {
      if (confirm('Do you really want to take this book?')) {
        const date = prompt('Please, write expired date in form mm/dd/yyyy');
        if (Date.parse(date) < Date.now()) {
          alert('Wrong date!');
        }

        const bookId = location.href.slice(location.href.lastIndexOf('/')+1);
        const request = new XMLHttpRequest();
        request.open('PATCH', `http://localhost:3033/book/take/${bookId}`, true);
        request.setRequestHeader('Content-type', 'application/json');
        request.send(JSON.stringify({expiredDate: date}));

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            window.location.reload();
          }
        }
      }
    };
  }

  const handoverButton = document.querySelector('.book-card__handover-button');
  handoverButton && (handoverButton.onclick = () => {
    const bookId = location.href.slice(location.href.lastIndexOf('/')+1);

    const request = new XMLHttpRequest();
    request.open('PATCH', `http://localhost:3033/book/handover/${bookId}`, true);
    request.send();

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        window.location.reload();
      }
    }
  });
});
