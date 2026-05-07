import { React, useState } from 'react';

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <main className="page auth-page">
            <section className="form-card auth-card">
                <h1>Sign Up</h1>
                <label className="field">
                    <span>Email</span>
                    <input
                        placeholder="YourEmail@email.com"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                    />
                    <input
                        placeholder="Password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                    <input
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(event) => {
                            setConfirmPassword(event.target.value)
                        }}
                    />
                    <button className="primary">Sign Up</button>
                </label>
            </section>
        </main>
    );
}