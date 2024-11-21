import React from 'react';
import backgroundImage from '../../assets/aboutus.jpg'; // Adjust the import path accordingly

export default function AboutUs() {
    return (
        <section className="bg-gray-100 flex items-center">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    {/* Left Section with Text Content */}
                    <div className="max-w-lg">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About ReadVibe</h2>
                        <p className="mt-4 text-gray-600 text-lg">
                            Welcome to **ReadVibe**, your ultimate destination for book reviews, recommendations, and an active community of book lovers. Whether you're a casual reader or a dedicated bibliophile, ReadVibe is here to provide you with honest and thoughtful reviews to help you discover your next great read.
                        </p>
                        <p className="mt-4 text-gray-600 text-lg">
                            Our team of avid readers and reviewers carefully curates reviews across all genres, from fiction to non-fiction, bestsellers to hidden gems. At ReadVibe, we believe that a good book can change your life, and our mission is to connect readers with the books that resonate with them.
                        </p>
                        <p className="mt-4 text-gray-600 text-lg">
                            Not only do we offer insightful reviews, but we also encourage lively discussions and reviews from our community. Share your thoughts, explore diverse opinions, and engage with fellow book enthusiasts. Join ReadVibe, where every page turned is a new adventure.
                        </p>
                        <div className="mt-8">
                            <a 
                                href="#reviews"
                                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-full custom-hover-bg" 
                                style={{ backgroundColor: '#6e9489' }}
                            >
                                Explore Our Latest Reviews <span className="ml-2">&#8594;</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Section with Image */}
                    <div className="mt-12 ml-12 md:mt-0" style={{ width: '120%', height: '700px' }}>
                        <img 
                            src={backgroundImage} 
                            alt="About Us Image" 
                            className="object-cover rounded-lg shadow-md w-full h-full" 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
