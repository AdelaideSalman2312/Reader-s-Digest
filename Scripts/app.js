
//  ADD THE COLOR FUNCTION HERE (before createBookCard uses it)//
function getGenreColor(genre) {
    const colors = {
        'Fiction': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'Non-Fiction': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'Memoir': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'Self-Help': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'Biography': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'History': 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        'Science': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'Poetry': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    };
    
    return colors[genre] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}

// Function to create a single book card
function createBookCard(book) {
  let quotesHTML = '';
  
  if (book.quotesImage) {
    quotesHTML = `<img class="quotes-image" src="${book.quotesImage}" alt="${book.title} quotes">`;
  } else if (book.quotes && book.quotes.length > 0) {
    quotesHTML = book.quotes
      .map(quote => `<p>"${quote}"</p>`)
      .join('');
  }

  // ✅ USE THE FUNCTION HERE
  const genreColor = getGenreColor(book.genre);

  return `
    <div class="book-container" data-book-id="${book.id}">
      <img class="profile-image" src="${book.image}" alt="${book.title}">
      
      <!-- ✅ APPLY THE COLOR HERE -->
      <span class="genre-badge" style="background: ${genreColor};">${book.genre || 'Uncategorized'}</span>
      
      <h1>${book.title}</h1>
      <p class="book-description">${book.description}</p>
      <p class="book_author">${book.author.toUpperCase()}</p>
      ${quotesHTML ? `<div class="quotes">${quotesHTML}</div>` : ''}
      
      <div class="book-actions">
        <button class="edit-btn" data-book-id="${book.id}">Edit</button>
        <button class="delete-btn" data-book-id="${book.id}">Delete</button>
      </div>
    </div>
  `;
}

// Rest of your code continues...
function renderBooks(booksToRender = books) {
  // ...
}
// Function to create a single book card
function createBookCard(book) {
  let quotesHTML = '';
  
  if (book.quotesImage) {
    quotesHTML = `<img class="quotes-image" src="${book.quotesImage}" alt="${book.title} quotes">`;
  } else if (book.quotes && book.quotes.length > 0) {
    quotesHTML = book.quotes
      .map(quote => `<p>"${quote}"</p>`)
      .join('');
  }

  return `
    <div class="book-container" data-book-id="${book.id}">
      <img class="profile-image" src="${book.image}" alt="${book.title}">
      <h1>${book.title}</h1>
      <p class="book-description">${book.description}</p>
      <p class="book_author">${book.author.toUpperCase()}</p>
      ${quotesHTML ? `<div class="quotes">${quotesHTML}</div>` : ''}
    </div>
  `;
}

// Function to render books
function renderBooks(booksToRender = books) {
  console.log('Rendering books:', booksToRender.length);
  
  const imageRow = document.querySelector('.image-row');
  
  if (!imageRow) {
    console.error('Error: .image-row element not found!');
    return;
  }
  
  imageRow.innerHTML = booksToRender
    .map(book => createBookCard(book))
    .join('');
    
  console.log('Books rendered successfully!');
}

// Search function
function searchBooks(searchTerm) {
  // If search is empty, show all books
  if (!searchTerm.trim()) {
    renderBooks(books);
    return;
  }
  
  // ✅ Define searchLower FIRST
  const searchLower = searchTerm.toLowerCase();
  
  // ✅ Filter using 'books' (plural), not 'book'
  const filtered = books.filter(book => {
    const titleMatch = book.title.toLowerCase().includes(searchLower);
    const authorMatch = book.author.toLowerCase().includes(searchLower);
    const descriptionMatch = book.description.toLowerCase().includes(searchLower);
    
    // ✅ quotesMatch is now INSIDE the filter function
    let quotesMatch = false;
    if (book.quotes && book.quotes.length > 0) {
      quotesMatch = book.quotes.some(quote => 
        quote.toLowerCase().includes(searchLower)
      );
    }
    
    // ✅ Return the combined result
    return titleMatch || authorMatch || descriptionMatch || quotesMatch;
  }); // ✅ Filter ends here
  
  renderBooks(filtered);
  console.log(`Search: "${searchTerm}" - Found ${filtered.length} books`);
}


renderBooks();



function createBookCard(book) {
  let quotesHTML = '';
  
  if (book.quotesImage) {
    quotesHTML = `<img class="quotes-image" src="${book.quotesImage}" alt="${book.title} quotes">`;
  } else if (book.quotes && book.quotes.length > 0) {
    quotesHTML = book.quotes
      .map(quote => `<p>"${quote}"</p>`)
      .join('');
  }

  return `
    <div class="book-container" data-book-id="${book.id}">
      <img class="profile-image" src="${book.image}" alt="${book.title}">
      <h1>${book.title}</h1>
      <p class="book-description">${book.description}</p>
      <p class="book_author">${book.author.toUpperCase()}</p>
      ${quotesHTML ? `<div class="quotes">${quotesHTML}</div>` : ''}
      
      <!-- ✅ Add these buttons -->
      <div class="book-actions">
        <button class="edit-btn" data-book-id="${book.id}">Edit</button>
        <button class="delete-btn" data-book-id="${book.id}">Delete</button>
      </div>
    </div>
  `;
}

// MODAL FUNCTIONS
// 

const modal = document.getElementById('book-modal');
const bookForm = document.getElementById('book-form');
const modalTitle = document.getElementById('modal-title');

// Open modal for adding new book
function openAddModal() {
  modalTitle.textContent = 'Add New Book';
  bookForm.reset();
  document.getElementById('book-id').value = '';
  modal.classList.add('active');
}

// Open modal for editing existing book
function openEditModal(bookId) {
  const book = books.find(b => b.id === bookId);
  if (!book) return;
  
  modalTitle.textContent = 'Edit Book';
  document.getElementById('book-id').value = book.id;
  document.getElementById('book-title').value = book.title;
  document.getElementById('book-author').value = book.author;
  document.getElementById('book-image').value = book.image;
  document.getElementById('book-description').value = book.description;
  document.getElementById('book-quotes').value = book.quotes ? book.quotes.join('\n') : '';
  
  modal.classList.add('active');
}

// Close modal
function closeModal() {
  modal.classList.remove('active');
  bookForm.reset();
}


// ADD / EDIT BOOK
// 

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const bookId = document.getElementById('book-id').value;
  const quotesText = document.getElementById('book-quotes').value;
  const quotesArray = quotesText
    .split('\n')
    .map(q => q.trim())
    .filter(q => q.length > 0);
  
  const bookData = {
    title: document.getElementById('book-title').value,
    author: document.getElementById('book-author').value,
    genre:document.getElementById('book-genre').value,
    image: document.getElementById('book-image').value,
    description: document.getElementById('book-description').value,
    quotes: quotesArray.length > 0 ? quotesArray : undefined
  };
  
  if (bookId) {
    // EDIT existing book
    const index = books.findIndex(b => b.id === parseInt(bookId));
    books[index] = { ...books[index], ...bookData };
    console.log('Book updated:', books[index]);
  } else {
    // ADD new book
    const newBook = {
      id: Date.now(), // Simple ID generation
      ...bookData
    };
    books.push(newBook);
    console.log('Book added:', newBook);
  }
  
  saveToLocalStorage();
  renderBooks();
  closeModal();
});


// DELETE BOOK
// 

function deleteBook(bookId) {
  if (!confirm('Are you sure you want to delete this book?')) return;
  
  const index = books.findIndex(b => b.id === bookId);
  const deletedBook = books.splice(index, 1)[0];
  
  console.log('Book deleted:', deletedBook);
  saveToLocalStorage();
  renderBooks();
}


// LOCAL STORAGE
// 

function saveToLocalStorage() {
  localStorage.setItem('readerDigestBooks', JSON.stringify(books));
  console.log('Books saved to localStorage');
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem('readerDigestBooks');
  if (saved) {
    // Replace books array with saved data
    books.length = 0; // Clear array
    books.push(...JSON.parse(saved));
    console.log('Books loaded from localStorage:', books.length);
  }
}


// EVENT LISTENERS
// 

// Add book button
document.querySelector('.add-book-btn').addEventListener('click', openAddModal);

// Cancel button
document.querySelector('.cancel-btn').addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Update renderBooks to attach button listeners
function renderBooks(booksToRender = books) {
  console.log('Rendering books:', booksToRender.length);
  
  const imageRow = document.querySelector('.image-row');
  
  if (!imageRow) {
    console.error('Error: .image-row element not found!');
    return;
  }
  
  imageRow.innerHTML = booksToRender
    .map(book => createBookCard(book))
    .join('');
    
  // ✅ Attach event listeners to edit/delete buttons
  attachBookActionListeners();
    
  console.log('Books rendered successfully!');
}

function attachBookActionListeners() {
  // Edit buttons
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const bookId = parseInt(btn.dataset.bookId);
      openEditModal(bookId);
    });
  });
  
  // Delete buttons
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const bookId = parseInt(btn.dataset.bookId);
      deleteBook(bookId);
    });
  });
}
// Get unique genres from books
function getUniqueGenres() {
    const genres = books
        .map(book => book.genre)
        .filter(genre => genre) // Remove undefined/null
        .filter((genre, index, self) => self.indexOf(genre) === index) // Remove duplicates
        .sort(); // Alphabetical order
    
    return genres;
}

// Populate genre filter dropdown
function populateGenreFilter() {
    const genreFilter = document.getElementById('genre-filter');
    const genres = getUniqueGenres();
    
    // Clear existing options (except "All Genres")
    genreFilter.innerHTML = '<option value="all">All Genres</option>';
    
    // Add genre options
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
    
    console.log('Genre filter populated with:', genres);
}
// Track current filter state
let currentGenreFilter = 'all';
let currentSearchTerm = '';

// Updated search function that respects genre filter
function searchBooks(searchTerm) {
    currentSearchTerm = searchTerm;
    applyFilters();
}

// Filter by genre
function filterByGenre(genre) {
    currentGenreFilter = genre;
    applyFilters();
}

// Apply both search and genre filters
function applyFilters() {
    let filtered = books;
    
    // Apply genre filter
    if (currentGenreFilter !== 'all') {
        filtered = filtered.filter(book => book.genre === currentGenreFilter);
    }
    
    // Apply search filter
    if (currentSearchTerm.trim()) {
        const searchLower = currentSearchTerm.toLowerCase();
        filtered = filtered.filter(book => {
            const titleMatch = book.title.toLowerCase().includes(searchLower);
            const authorMatch = book.author.toLowerCase().includes(searchLower);
            const descriptionMatch = book.description.toLowerCase().includes(searchLower);
            
            let quotesMatch = false;
            if (book.quotes && book.quotes.length > 0) {
                quotesMatch = book.quotes.some(quote => 
                    quote.toLowerCase().includes(searchLower)
                );
            }
            
            return titleMatch || authorMatch || descriptionMatch || quotesMatch;
        });
    }
    
    renderBooks(filtered);
    console.log(`Filters applied - Genre: ${currentGenreFilter}, Search: "${currentSearchTerm}", Results: ${filtered.length}`);
}
// Genre filter listener
const genreFilter = document.getElementById('genre-filter');
genreFilter.addEventListener('change', (e) => {
    filterByGenre(e.target.value);
});




// Update search bar listener (replace the old one)//

const searchBar = document.querySelector('.search-bar');
searchBar.addEventListener('input', (e) => {
    searchBooks(e.target.value);
});

//INITIALIZE FROM PAGE LOAD//
loadFromLocalStorage();
populateGenreFilter();
renderBooks();



