import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css'

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/profile");
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.error || "Login failed.");
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
                <h1>Sign In</h1>
                {error && <p className="form-error">{error}</p>}
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
                <button className="primary" type="submit">Sign In</button>
                <p className="form-link">
                    No account? <Link className="sign" to="/signup">Sign up</Link>
                </p>
            </form>
        </main>
    );
}
