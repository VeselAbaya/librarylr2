document.addEventListener('DOMContentLoaded', () => {
  // modal init
  document.querySelectorAll('.modal-overlay').forEach(modalOverlay => {
    modalOverlay.onclick = (event) => {
      if (event.target.classList.contains('modal-overlay')) {
        modalOverlay.classList.remove('modal-open')
      }
    };
  });

  // signin/up
  ['signInButton', 'signUpButton'].forEach((buttonId) => {
    const button = document.getElementById(buttonId);
    button && button.addEventListener('click', () => {
      switch (buttonId) {
        case 'signInButton':
          document.getElementById('signInForm')
            .closest('.modal-overlay').classList.add('modal-open');
        break;
        case 'signUpButton':
          document.getElementById('signUpForm')
            .closest('.modal-overlay').classList.add('modal-open');
        break;
      }
    });
  });

  // add book button
  const addBookButton = document.querySelector('.book-card__add-button');
  addBookButton && addBookButton.addEventListener('click', () => {
    const bookCard = addBookButton.parentNode;
    bookCard.innerHTML = `
      <div class="book-card__body">
        <form class="book-card__info book-card__info--left" id="addForm" method="post" action="/book/create">
          <label class="book-card__info-part">
            Title: <input class="book-card__add-input" name="name" type="text">
          </label>
          <label class="book-card__info-part">
            Author: <input class="book-card__add-input" name="author" type="text">
          </label>
          <label class="book-card__info-part">
            Release Date: <input class="book-card__add-input" name="releaseDate" type="date">
          </label>
        </form>
        <input class="book-card__button book-card__button--add" type="submit" form="addForm">
      </div>
    `;
  });

  // info button
  document.querySelectorAll('.book-card__user-info-button').forEach(button => {
    button.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const usersBooksReq = new XMLHttpRequest();
      usersBooksReq.open('GET', `http://localhost:3033/user/${button.textContent}/books`, true);
      usersBooksReq.onreadystatechange = (event) => {
        if (usersBooksReq.readyState === 4) {
          if(usersBooksReq.status === 200) {
            const bookTitles = JSON.parse(usersBooksReq.response).data.map(book => book.name);

            let booksListHTML = '<ul>';
            for (let title of bookTitles) {
              booksListHTML += `<li>${title}</li>`
            }
            booksListHTML += '</ul>';

            const modalOverlay = document.querySelector('.modal-users-books');
            modalOverlay.querySelector('.modal').innerHTML = `
              email: ${button.textContent}
              ${booksListHTML}
            `;
            modalOverlay.classList.add('modal-open');
          }
          else {
            alert("Error");
          }
        }
      };
      usersBooksReq.send();
    }
  });

  // filter button
  const radios = document.querySelectorAll('.filter-list__input');
  document.querySelector('.filter-button').onclick = function() {
    window.location.href = `http://localhost:3033/?${Array.from(radios)
                                                      .filter(radio => radio.checked)
                                                      .map(radio => `${radio.name}=${radio.value}`)
                                                      .join('&')}`
  };

  document.querySelector('.filter-reset').onclick = function() {
    radios.forEach(radio => radio.checked = false)
  };

  // delete button
  const deleteButtons = document.querySelectorAll('.book-card__button');
  deleteButtons && deleteButtons.forEach(button => {
    button.onclick = () => {
      if (confirm('Are you sure you want to delete the book?')) {
        const request = new XMLHttpRequest();
        request.open('DELETE', `/book/delete/${button.dataset['bookid']}`);

        request.onreadystatechange = function() {
          if (request.readyState === 4 && request.status === 200) {
            location.reload();
          }
        };

        request.send();
      }
    }
  })
});
