import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import UserService from '../service/UserService';
import AboutUs from './aboutUs';
import Contactus from './contactus';
import Footer from './footer';
import Logo from '../../assets/ReadVibeLogo.png';
import BackGround from '../../assets/actual1.jpg';  // Updated background image import


const Landingpage = () => {
    const [state, setState] = useState(false);
    const isAuthenticated = UserService.isAuthenticated();

    // const navigation = [
    //     { title: "Home", path: "/login" },
    //     { title: "About Us", path: "/AboutUs" },
    // ];

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const imageStyle = {
        width: '90vw',
        height: '75vh',
        objectFit: 'cover'
    };

    const Brand = () => (
        <div className="flex items-center justify-between py-5 md:block">
            <a href="javascript:void(0)">
                <img src={Logo} width={80} height={80} className="imageStyle" alt="Logo" />
            </a>
            <div className="md:hidden">
                <button className="menu-btn text-gray-400 hover:text-gray-300"
                    onClick={() => setState(!state)}
                >
                    {state ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1010-1.414z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <div className="relative flex flex-col items-left justify-center min-h-screen w-99vw bg-gray-100 overflow-x-hidden">
            <div className="bg-gray-100 min-h-screen flex flex-col overflow-x-hidden">
                <header className="h-[100px] overflow-hidden" style={{ backgroundColor: '#6e9489' }}>
                    <div className={`md:hidden ${state ? "mx-2 pb-0" : "hidden"}`}>
                        <Brand className="w-4 h-4" />
                    </div>
                    <nav className={`md:text-sm ${state ? "absolute z-20 top-0 inset-x-0 bg-gray-800 rounded-xl mx-2 mt-0 md:mx-0 md:mt-0 md:relative md:bg-transparent" : ""}`}>
                        <div className="gap-x-8 items-center max-w-screen-lg mx-auto px-4 md:flex md:px-6">
                            <Brand className="w-8 h-8" />
                            <div className={`flex-1 items-center mt-2 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                                <div className="flex-1 gap-x-4 items-center justify-end mt-2 space-y-0 md:flex md:space-y-0 md:mt-0">
                                    <a href="/login" className="block text-gray-300 hover:text-gray-400 text-lg py-2 px-3">
                                        Log in
                                    </a>
                                    <a href="/register" className="flex items-center justify-center gap-x-2 py-2.5 px-4 mt-3 w-full text-sm text-white font-medium hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-lg sm:mt-0 sm:w-auto" style={{ backgroundColor: '#6e9489' }}>
                                        Sign up
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

                <section className="relative flex-1">
                    <div
                        className="w-full h-screen"
                        style={{
                            backgroundImage: `url(${BackGround})`,  // Set new background image here
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col text-center text-white z-10 bg-black bg-opacity-50 p-5">
                        <h2 className="text-4xl font-extrabold mx-auto md:text-5xl">
                            Explore the Best Books with Expert Reviews
                        </h2>
                        <p className="max-w-2xl mx-auto text-gray-300 mt-4">
                            Join us to discover the latest books, reviews, and recommendations from book enthusiasts and experts.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()} className="justify-center items-center gap-x-3 sm:flex mt-6">
                            <input
                                type="text"
                                placeholder="Enter your email for book updates"
                                className="w-full px-3 py-2.5 text-gray-400 bg-gray-700 focus:bg-gray-900 duration-150 outline-none rounded-lg shadow sm:max-w-sm sm:w-auto"
                            />
                            <button
                                className="flex items-center justify-center gap-x-2 py-2.5 px-4 mt-3 w-full text-sm text-white font-medium hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-lg sm:mt-0 sm:w-auto"
                                style={{ backgroundColor: "#6e9489" }}
                            >
                                Get Book Updates
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                </section>

                <div className="py-6">
                    <AboutUs />
                    <Contactus />
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Landingpage;
