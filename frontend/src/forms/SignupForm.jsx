import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return "Please enter a valid email address.";
        }
        if (!password || password.length < 8) {
            return "Password must be at least 8 characters.";
        }
        if (password !== confirmPassword) {
            return "Passwords do not match.";
        }
        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.error || "Signup failed.");
                return;
            }

            localStorage.setItem("User", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);

            navigate("/profile");
        } catch (err) {
            console.error(err);
            setError("Network error. Is the server running?");
        }
    };

    return (
        <main className="page auth-page">
            <form className="form-card auth-card" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                {error && <p>{error}</p>}
                <label className="field">
                    <span>Email</span>
                    <input
                        type="email"
                        placeholder="YourEmail@email.com"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                    />
                </label>
                <label className="field">
                    <span>Password</span>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                </label>
                <label className="field">
                    <span>Confirm Password</span>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(event) => {
                            setConfirmPassword(event.target.value)
                        }}
                    />
                </label>
                <button className="primary" type="submit">Sign Up</button>
                <p>
                    Already have an account? <Link className="sign" to="/signin">Sign in</Link>
                </p>
            </form>
        </main>
    );
}
