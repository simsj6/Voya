import React from 'react';
import styles from './SectionHeading.module.css';

export default function SectionHeading({ title, text }) {
    return (
        <div className={styles.sectionHeading}>
            <div><h2>{title}</h2><span /></div>
            {text && <p>{text}</p>}
        </div>
    );
}