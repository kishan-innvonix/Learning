import React from 'react'

const Hi = (props) => {
    return (
        <>
            <h1>{props.greet}</h1>
            {props.children}
        </>
    )
}

export default Hi