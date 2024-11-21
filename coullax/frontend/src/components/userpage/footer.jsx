import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'; // Import the necessary icons

export default () => {
 
    return (
        <footer className="text-gray-500 bg-white w-full px-4 py-5 md:px-8">
            <div className="max-w-lg sm:mx-auto sm:text-center">
                <img src="./src/assets/ReadVibeLogo.png" className="w-32 sm:mx-auto" alt="Logo" />
                <p className="leading-relaxed mt-2 text-[15px]">
                    Welcome to our website. We provide the best services to our customers. Contact us for more information.
                </p>
            </div>
            
            <div className="mt-8 items-center justify-between sm:flex ">
            <div className="mt-4 sm:mt-0 text-[#172b59]">
            &copy; 2024 ReadVibe.
            </div>

                <div className="mt-6 sm:mt-0">
                    <ul className="flex items-center space-x-4">
                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-blue-400" />
                            </a>
                        </li>
                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebookF className="text-blue-700" />
                            </a>
                        </li>
                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-pink-500" />
                            </a>
                        </li>
                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <FaYoutube className="text-red-600" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
