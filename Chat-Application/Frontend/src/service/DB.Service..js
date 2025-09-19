import { toast } from 'react-toastify';
const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;

export async function signUp(formData) {
    try {
        const response = await fetch(`${backendURL}/api/auth/signUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
            return { error: errorMessage };
        }

        const responseData = await response.json();
        console.log("DB service Signup response:", responseData.message);
        return { sucess: responseData.message };

    } catch (error) {
        const errorMessage = typeof error === "string" ? error : "A Server error occurred.";
        return { error: errorMessage };
    }
}


export async function login(emailOrPhone, password) {
    try {
        const response = await fetch(`${backendURL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailOrPhone, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || 'Login failed. Please try again.' };
        }

        const data = await response.json();
        return { success: data.message || 'Login successful!', data: data };

    } catch (err) {
        return { error: 'A server error occurred. Please try again later.' };
    }
}



export async function fetchAllUsers() {
    const token = localStorage.getItem("Chat-Application-Token");

    try {
        const response = await fetch(`${backendURL}/api/message/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log("All users fetching error: " + errorData)
            toast.error(errorData.message || `HTTP error! status: ${response.status}`);
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const users = await response.json();
        console.log("All users fetched successfully: ", users);
        return users;


    } catch (err) {
        toast.error(`An error occurred: ${err.message}`);
        console.error('An error occurred: fetching users : ', err);
    }
}
