import React from "react";
const name = import.meta.env.VITE_AUTHOR_NAME || 'yannan zhang'

const Info = () => {
    return (
        <div>
            <h1>MyNote</h1>
            <h2>v1.0</h2>
            <div>
                <span>
                    Author: {name}
                </span>
                <p>description:</p>
                <p>credits:</p>
                <p>AI usage:</p>
                <p>Work hours: 60hrs</p>
                <p>Hard point:</p>
            </div>
        </div>
    )
}

export default Info