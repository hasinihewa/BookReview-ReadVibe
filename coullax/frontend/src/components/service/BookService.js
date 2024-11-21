import axios from 'axios';

class BookService {
    static BASE_URL = 'http://localhost:8082/books';

    // Fetch all books
    static async getAllBooks(token) {
        try {
            const response = await axios.get(`${BookService.BASE_URL}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Fetch a book by ID
    static async getBookById(bookId, token) {
        try {
            const response = await axios.get(`${BookService.BASE_URL}/${bookId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    //getuserbooks only
    static async getBooksByUserId(userId, token) {
        try {
            const response = await axios.get(`${BookService.BASE_URL}/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data; // Ensure this matches the structure of your API response
        } catch (err) {
            throw err;
        }
    }

    // Create a new book
    static async saveBook(bookData, token) {
        try {
            const response = await axios.post(`${BookService.BASE_URL}`, bookData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Update a book
    static async updateBook(bookId, bookData, token) {
        try {
            const response = await axios.put(`${BookService.BASE_URL}/${bookId}`, bookData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Update a book's review
    static async updateBookReview(bookId, review, token) {
        try {
            const response = await axios.put(`${BookService.BASE_URL}/${bookId}/review`, review, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Delete a book
    static async deleteBook(bookId, token) {
        try {
            const response = await axios.delete(`${BookService.BASE_URL}/${bookId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default BookService;
