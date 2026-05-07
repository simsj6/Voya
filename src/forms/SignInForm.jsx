import { React, useState } from 'react';
import './Form.css'

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <main className="page auth-page">
            <section className="form-card auth-card">
                <h1>Sign In</h1>
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
                    <button className="primary">Sign In</button>
                </label>
            </section>
        </main>
    );
}