const bookContainer = document.getElementById("book-container");
const addButton = document.getElementById("add-btn");
const closeModal = document.getElementById("close-btn");
const modal = document.getElementById("modal");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const bookRead = document.getElementById("read");
const addBook = document.getElementById("add-book");
const noBooks = document.getElementById("no-books");
const form = document.getElementById("form")

let myLibrary = [];

addButton.addEventListener("click", () => {
    modal.showModal();
})

closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.close();
})

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

function Book(title, author, pages, isRead){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead;
}

addBook.addEventListener("click", (e) => {

    e.preventDefault(); 
    if (form.checkValidity()) {
        const bookToAdd = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
        myLibrary.push(bookToAdd);
        addBookToLibrary();
        modal.close();
        form.reset();
        if (myLibrary.length === 0) {
            noBooks.style.display = "block";
        } else if (myLibrary.length > 0) {
            noBooks.style.display = "none";
        }
    } else {
        form.reportValidity();
    }
})

function addBookToLibrary(){
    const bookToAdd = myLibrary[myLibrary.length - 1];
    const readStatus = bookToAdd.isRead ? "Read" : "Not Read";
    const isReadChecked = bookToAdd.isRead ? "read-btn" : "not-read-btn";
        
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");
    bookCard.innerHTML = `
        <p class="title">${bookToAdd.title}</p>
        <p class="author">${bookToAdd.author}</p>
        <p class="pages">${bookToAdd.pages}</p>
        <button class="${isReadChecked}">${readStatus}</button>
        <button class="remove-btn">Remove</button>
    `;
    bookContainer.appendChild(bookCard);
}

bookContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const card = e.target.closest(".card");
        const title = card.querySelector(".title").textContent;
        myLibrary = myLibrary.filter(book => book.title !== title);      
        card.remove();
        if (myLibrary.length === 0) {
            noBooks.style.display = "block";
        }
    }
});