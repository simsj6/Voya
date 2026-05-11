import React from 'react';

export default function SectionHeading({ title, text }) {
    return (
        <div className="section-heading">
            <div><h2>{title}</h2><span /></div>
            {text && <p>{text}</p>}
        </div>
    );
}