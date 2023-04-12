import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import classes from './Head2.module.css'

const Head2 = (props) => {
    return (
        <div className={classes.container}>
            <div>
                <div className={classes.title}><p>{props.txt.title}</p></div>
                <div className={classes.subTitle}><h2>{props.txt.subtitle}</h2></div>
            </div>
            {props.txt.linkTitle &&
            <div className={classes.link}>
                <p>
                    <a href=".">{props.txt.linkTitle}</a>
                    <FontAwesomeIcon icon={faArrowRight} color='#ea2251' size='sm' />
                </p>
            </div>}
        </div>
    )
}

export default Head2
