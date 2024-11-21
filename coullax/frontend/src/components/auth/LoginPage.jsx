import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await UserService.login(email, password);
            if (userData.token) {
                localStorage.setItem("token", userData.token);
                localStorage.setItem("role", userData.role);
                location.href = "/dashboard";
            } else {
                setError(userData.message);
            }
        } catch (error) {
            console.error(error);
            setError("Failed to log in. Please try again.");
            setTimeout(() => setError(""), 5000);
        }
    };

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600 space-y-5">
                <div className="text-center pb-8">
                    <img src="./src/assets/ReadVibeLogo.png" width={150} className="mx-auto" />
                    <div className="mt-5">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                        <p>
                            Don't have an account?{" "}
                            <a href="/register" className="font-medium text-green-600 hover:text-green-500">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-x-3">
                            <input type="checkbox" id="remember-me-checkbox" className="checkbox-item peer hidden" />
                            <label
                                htmlFor="remember-me-checkbox"
                                className="relative flex w-5 h-5 bg-white peer-checked:bg-green-600 rounded-md border ring-offset-2 ring-green-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                            ></label>
                            <span>Remember me</span>
                        </div>
                        <a href="javascript:void(0)" className="text-center text-green-900 hover:text-green-900">
                            Forgot password?
                        </a>
                    </div>
                    <button
                        className="w-full py-3 bg-[#6e9489] text-white text-lg font-semibold rounded-md focus:outline-none"
                        >
                        Sign in
                    </button>
                </form>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                <p className="text-center">
                    Don't have an account?{" "}
                    <a href="/register" className="font-medium text-green-600 hover:text-green-500">
                        Sign up
                    </a>
                </p>
            </div>
        </main>
    );
}

export default LoginPage;
