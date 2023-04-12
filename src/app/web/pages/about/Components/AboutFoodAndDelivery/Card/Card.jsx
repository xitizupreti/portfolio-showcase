import React from 'react'

import Head1 from '../../Head/Head1/Head1'
import classes from './Card.module.css'

const Card = (props) => {

    // title text of the section is divided into many parts to use helper component
    // i.e Head1.jsx
    
    return (
        <div style={props.flexDirection ? {flexDirection: 'row-reverse'}: null} className={classes.container}>
            <div className={classes.detail}>
                <div>
                    <Head1 txt={props.txt} lineHeight='1.1'/>
                </div>
                <div>
                    <p>Aenean ut leo sed nulla ullamcorper elementum eu quis lorem. Aliquam iaculis
                        facilisis mauris sed tempus. Nullam bibendum dui in diam pharetra ullamcorper.
                        In ac odio id ligula egestas mattis et vitae ante. Vestibulum id mattis est.
                        Quisque sit amet nisi fermentum enim eleifend placerat.</p>
                </div>
            </div>
            <div className={classes.video}>
                <video autoPlay muted loop src={props.video} />
            </div>
        </div>
    )
}

export default Card
