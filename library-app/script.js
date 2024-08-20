const bookContainer = document.getElementById("book-container");
const addButton = document.getElementById("add-btn")
const closeModal = document.getElementById("close-btn")
const modal = document.getElementById("modal")
let bookTitle = document.getElementById("title")
const bookAuthor = document.getElementById("author")
const bookPages = document.getElementById("pages")
const bookRead = document.getElementById("read")
const addBook = document.getElementById("add-book")
const readButton = document.getElementById("read-btn")
const removeButton = document.getElementById("remove-btn")

let myLibrary = [];

addButton.addEventListener("click", () => {
    modal.showModal();
})

closeModal.addEventListener("click", () => {
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

addBook.addEventListener("click", () => {
    console.log("title: " + bookTitle.value);
    console.log("auth: " + bookAuthor.value);
    console.log("pages: " + bookPages.value);
    console.log("isRead: " + bookRead.value);
    const bookToAdd = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.value);
    console.log("title: " + bookToAdd.title);
    console.log("auth: " + bookToAdd.author);
    console.log("pages: " + bookToAdd.pages);
    console.log("isRead: " + bookToAdd.isRead);
    myLibrary.push(bookToAdd);
})

function addBookToLibrary(){
    for (let i = 0; i < myLibrary.length; i++) {
        const bookDiv = document.createElement("div")
        bookDiv.textContent = myLibrary[i];
        document.body.appendChild(bookDiv)
    }
}

