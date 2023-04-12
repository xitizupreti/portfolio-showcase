import React from 'react'
import Card from '../Card/Card'


const AboutDelivery = (props) => {
    const txt = {
        title: 'About delivery',
        spanTxt1: 'Zero waste',
        text: 'and',
        brokeAndSpan: 'environment-friendly'
    }

    return (
        <div>
            <Card video={props.video} txt={txt} flexDirection='row-reverse'/>
        </div>
    )
}

export default AboutDelivery
