import { Link } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound() {
  return (
    <main className="not-found form-card">
      <h1>404 — Page Not Found</h1>
      <button className="primary">
        <Link to="/" className="link">← Back home</Link>
      </button>
    </main>
  );
}
