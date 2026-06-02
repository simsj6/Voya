import React from "react";
import styles from "./ActivityCard.module.css";

export default function ActivityCard({ title, body }) {
    return (
        <section className={`${styles.activityCard}`}>
            <div>
                <h2>{title}</h2>
                <span />
                <p>{body}</p>
            </div>
        </section>
    );
}