import React from 'react'
import classes from './Head1.module.css'

const Head1 = (props) => {
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <h2>
                    <strong>{props.txt.title}</strong>
                </h2>
            </div>
            <div className={classes.subtitle}>
                <h2 style={props.lineHeight ? {lineHeight: props.lineHeight}: null}>
                    <strong>
                        <span>{props.txt.spanTxt1} {' '}</span>
                        
                        {props.txt.text} 
                        {props.txt.spanTxt2 ? <span>{' '}{props.txt.spanTxt2} </span>: null}
                        <br />
                        {
                            props.txt.brokeTxt ? props.txt.brokeTxt : null || 
                            props.txt.brokeAndSpan ? <span>{props.txt.brokeAndSpan}</span>: null
                        }
                    </strong>
                </h2>
            </div>
        </div>
    )
}

export default Head1
