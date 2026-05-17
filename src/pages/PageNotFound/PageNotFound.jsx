import { Link } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound() {
  return (
    <div className="not-found">
      <h2>404 — Page Not Found</h2>
      <button>
        <Link to="/" className="link">← Back home</Link>
      </button>
    </div>
  );
}
