import React from 'react'
import Card from '../Card/Card'


const AboutFood = (props) => {

    const txt = {
        title: 'About Food',
        spanTxt1: 'Local',
        text: 'and',
        spanTxt2: 'organic',
        brokeTxt: 'ingredients only'
    }
    return (
        <div>
            <Card video={props.video} txt={txt}/>
        </div>
    )
}

export default AboutFood
