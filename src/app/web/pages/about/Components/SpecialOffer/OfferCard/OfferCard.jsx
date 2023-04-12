import React from 'react'

import classes from './OfferCard.module.css'

const offerCard = (props) => {
    return (
        <div className={classes.container}>
            <div className={classes.imgContainer}>
                <img src={props.img} alt=""/>
                <div className={classes.sale}> <p>SALE</p> </div>
            </div>
            <div className={classes.foodName}>{props.foodName}</div>
            <div className={classes.foodPrice}>
                <span>{props.Oldprice}</span>
                <span>{props.price}</span>
            </div>
        </div>
    )
}

export default offerCard
