import 'react-toastify/dist/ReactToastify.css';
import '../css/Login.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaRocketchat } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import { login } from '../service/DB.Service.';
import { useAuth } from '../context/AuthProvider';


const LoginPage = () => {
    const Navigate = useNavigate();

    const { setAuthUser, setUserLoggedIn } = useAuth();

    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [socket, setSocket] = useState(null);

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailOrPhone || !password) {
            toast.error("All fields are required!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        try {
            const response = await login(emailOrPhone, password);

            if (response.error) {
                toast.error(response.error, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (response.success) {
                const { token, ...rest } = response.data;
                localStorage.setItem('Chat-Application-Token', response.data.token);
                setAuthUser(rest);
                setUserLoggedIn(true);

                toast.success(response.success, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                Navigate('/');
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again later.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const handleSignUp = () => {
        Navigate('/signup');
    };

    return (
        <div className="container">
            <ToastContainer />
            <div className="content">
                <div className="imageCont">
                    <FaRocketchat size={50} color="blue" />
                    <h1>Chat Application</h1>
                </div>

                <form className="content__form" onSubmit={handleSubmit}>
                    <div className="content__inputs">
                        <label>
                            <input
                                required
                                type="text"
                                placeholder="Phone or Email"
                                value={emailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                            />
                        </label>

                        <label className="password-container">
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p onClick={togglePasswordVisibility}>
                                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                            </p>
                        </label>
                    </div>
                    <button type="submit" className="login-button">
                        Log In
                    </button>
                </form>

                <div className="content__forgot-buttons">
                    <button onClick={() => { handleSignUp(); }}>New User? Sign Up Here</button>
                    <button onClick={() => {
                        toast.info("Working on it...", {
                            position: "top-right",
                            autoClose: 2000,
                        });
                    }}>Forgot Password?</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
