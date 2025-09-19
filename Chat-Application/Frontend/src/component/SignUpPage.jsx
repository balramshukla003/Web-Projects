import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRocketchat } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signUp } from '../service/DB.Service.';

const SignUpPage = () => {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const Navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
            toast.error("Please fill in all fields.", {
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
            const response = await signUp(formData);

            if (response?.error) {
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
                return;
            }

            toast.success(response.sucess, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setInterval(() => {
                Navigate("/")
            }, 2500);

        } catch (error) {
            const errorMessage = typeof error === "string" ? error : "An unexpected error occurred.";
            toast.error(errorMessage, {
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
                                type="text"
                                name="fullName"
                                placeholder="Enter your name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                            />
                        </label>

                        <label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </label>

                        <label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter your phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </label>

                        <label className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <span onClick={togglePasswordVisibility}>
                                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                            </span>
                        </label>

                    </div>
                    <button type="submit">Register</button>
                </form>

                <div className="content__forgot-buttons">
                    <button onClick={() => {
                        Navigate('/')
                    }}>Existing User? Login Here</button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;