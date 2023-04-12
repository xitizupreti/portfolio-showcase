import React from 'react'
import AboutFood from './AboutFood/AboutFood'
import AboutDelivery from './AboutDelivery/AboutDelivery'

import classes from './AboutFoodAndDelivery.module.css'

const AboutFoodAndDelivery = () => {

    const foodVideo = "https://preview.ait-themes.club/citadela/fooddelivery/wp-content/uploads/sites/17/2020/11/preparation.mp4"
    const packingVideo = "https://preview.ait-themes.club/citadela/fooddelivery/wp-content/uploads/sites/17/2020/11/packing.mp4"
    return (
        <div className={classes.container}>
            <AboutFood video={foodVideo}/>
            <AboutDelivery video={ packingVideo} />
        </div>
    )
}

export default AboutFoodAndDelivery
