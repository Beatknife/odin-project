const bookContainer = document.getElementById("book-container");
const openModal = document.getElementById("add-btn")
const closeModal = document.getElementById("close-btn")
const modal = document.getElementById("modal")

openModal.addEventListener("click", () => {
    modal.showModal();
})

closeModal.addEventListener("click", () => {
    modal.closest();
})

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

const myLibrary = ["book1", "book2", "book3"];

function Book(author, title, pages, isRead){
    this.author = author,
    this.title = title,
    this.pages = pages
    this.isRead = isRead
}

function getUsersBook(){
    const author = prompt("Author? ");
    const title = prompt("Title? ");
    const pages = Number(prompt("Pages? "));
    const isRead = prompt("Did you read it? ")
    const bookToAdd = new Book(author, title, pages, isRead);
    myLibrary.push(bookToAdd);
}

// getUsersBook();

function addBookToLibrary(){
    for (let i = 0; i < myLibrary.length; i++) {
        const bookDiv = document.createElement("div")
        bookDiv.textContent = myLibrary[i];
        document.body.appendChild(bookDiv)
    }
}

