import React from 'react'

import classes from './QandACard.module.css'

const QandACard = (props) => {
    return (
        <div className={classes.container}>
            <div><h4>{props.question}</h4></div>
            <div><p>{props.answer}</p></div>
        </div>
    )
}

export default QandACard
