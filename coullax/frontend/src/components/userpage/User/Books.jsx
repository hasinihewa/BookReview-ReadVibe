import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService';
import BookService from '../../service/BookService';
import avatar from '../../../assets/user2.png';

const UserBooks = () => {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const booksnoreview = books.filter(book => !book.review);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userProfile = await UserService.getMyProfile(token);
                const userId = userProfile.ourUsers ? userProfile.ourUsers.id : null;
                if (userId) {
                    setUser(userProfile.ourUsers);
                    const userBooks = await BookService.getAllBooks(token);
                    setBooks(userBooks);
                } else {
                    console.error("User ID not found in the profile.");
                }
            } catch (err) {
                console.error("Error fetching user or books data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleClick = () => {
        if (user && user.id) {
            navigate(`/getreview?uId=${user.id}`);
        } else {
            console.error("User ID not available");
        }
    };

    const handleAddReviewClick = (bookId) => {
        if (bookId) {
            navigate(`/putreview?bookId=${bookId}`);
        } else {
            console.error("Book ID not available");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 mb-8">
            <div className="items-start justify-between sm:flex mt-6">
                <div>
                    <h2 className="text-gray-800 text-2xl font-semibold">Your Books and Reviews</h2>
                    <p className="mt-2 text-gray-600 text-base">
                        Manage your reviews and share your thoughts on other books here.
                    </p>
                </div>
                <button
                    onClick={handleClick}
                    className="inline-flex items-center justify-center gap-1 py-2 px-4 font-medium text-white bg-[#315b4f] hover:bg-[#5b7c70] rounded-lg"
                >
                    Add Book
                </button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Your Reviews */}
                <div className="bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Reviews</h3>
                    <ul className="divide-y">
                        {Array.isArray(books) &&
                            books.length > 0 &&
                            user &&
                            books
                                .filter(book => book.userId === user.id)
                                .map((book, idx) => (
                                    <li key={idx} className="py-4">
                                        <h4 className="text-lg font-semibold text-gray-700">{book.title}</h4>
                                        <p className="text-gray-600">{book.author}</p>
                                        <p className="text-sm text-gray-500">
                                            {book.review ? book.review : 'No reviews yet 😞'}
                                        </p>
                                    </li>
                                ))}
                    </ul>
                </div>

                {/* Right Column: Other Reviews */}
                <div className="bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Books Without Reviews</h3>
                    <ul className="divide-y">
                        {Array.isArray(booksnoreview) &&
                            booksnoreview.length > 0 &&
                            user &&
                            booksnoreview
                                .filter(book => book.userId !== user.id)
                                .map((book, idx) => (
                                    <li key={idx} className="py-4 flex items-start justify-between">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-700">{book.title}</h4>
                                            <p className="text-gray-600">{book.author}</p>
                                            <p className="text-sm text-gray-500">{book.publishedDate}</p>
                                        </div>
                                        <button
                                            onClick={() => handleAddReviewClick(book.id)}
                                            className="ml-4 px-4 py-2 bg-[#6e9489] text-white rounded-md hover:bg-[#5b7c70]"
                                        >
                                            Add Review
                                        </button>
                                    </li>
                                ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserBooks;
