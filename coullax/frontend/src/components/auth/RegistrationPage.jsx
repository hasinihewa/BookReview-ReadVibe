import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import { FaArrowLeft } from "react-icons/fa";

function RegistrationPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contact_no: '',
        address:'',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [contactError, setContactError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    //const roles = ['USER','PHYSIO','RESIPTIONIST','COUCH','MANAGER'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'contact_no') {
            const phonePattern = /^\d{10}$/;
            setContactError(!phonePattern.test(value) ? 'Invalid contact number' : '');
        }else if (name === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(!emailPattern.test(value) ? 'Invalid email address' : '');
        }else if (name === 'password') {
            const passwordPattern = /^.{5,}$/;
            setPasswordError(!passwordPattern.test(value) ? 'Password must be at least 5 characters' : '');
          }
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (contactError || emailError || passwordError) {
            setError('');
            setTimeout(() => {
                setError('');
            }, 5000);
            return;
        }

        try {
            const res = await UserService.userRegister(formData);
            console.log(res);
            
            if (res.statusCode === 200) {
                alert('User registered successfully');
                window.location.href = '/login';
            } else {
                setError(res.message);
            }
            
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }

    

    return (
<main className="w-full flex">
    <div className="relative flex-1.5 hidden items-center justify-center h-screen lg:flex">
    <img src="./src/assets/signup.jpg"  className="mx-auto h-full w-fit" />

    </div>
    <div className="flex-1 flex items-center justify-center h-screen  bg-[#6e9489]  ">
        <div className="w-full space-y-6 text-gray-300 sm:max-w-md">
                <div className=" shadow p-4 py-4 sm:p-6 sm:rounded-lg min-w-full">
                    <div className="text-center">
                        <div className="mt-2 space-y-2">
                            <h3 className="text-white text-2xl font-bold sm:text-3xl">Create an account</h3>
                            <p className="">Already have an account?<a href="/login" className="font-medium text-green-900 hover:text-green-500"> Login</a></p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <div>
                            <label className="font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full mt-2 px-3 py-2 bg-white text-gray-800 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full mt-2 px-3 py-2 bg-white text-gray-800 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
                            />
                             {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

                        </div>
                        <div>
                            <label className="font-medium">Contact Number</label>
                            <input
                                type="text"
                                name="contact_no"
                                value={formData.contact_no}
                                onChange={handleChange}
                                required
                                className="w-full mt-2 px-3 py-2 bg-white text-gray-800 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
                            />
                            {contactError && <p className="text-red-500 text-sm mt-1">{contactError}</p>}
                        </div>
                        <div>
                            <label className="font-medium">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="w-full mt-2 px-3 py-2 bg-white text-gray-800 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
                            />
                        </div>
                        
                        <div>
                            <label className="font-medium">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full mt-2 px-3 py-2 bg-white text-gray-800 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? 'Hide' : ''} 
                            </button>
                            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                        </div>

                        <button className="w-full px-4 py-2 text-white font-medium bg-green-900 hover:bg-green-500 active:bg-green-600 rounded-lg duration-150" type='submit'>
                            Sign Up
                        </button>
                        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                    </form>
                </div>
        </div>
    
    </div>
</main>
    );
}

export default RegistrationPage;