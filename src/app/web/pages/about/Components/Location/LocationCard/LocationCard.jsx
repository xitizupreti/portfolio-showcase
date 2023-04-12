import React from 'react'

import classes from './LocationCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


const LocationCard = (props) => {
    return (
        <div className={classes.container}>
            {props.details.map((detail, index) => {
                return (
                    <article key={index} className={classes.LocationCard}>
                        <figure className={classes.imgContainer}>
                            <img src={detail.img} alt="" />
                        </figure>
                        <div className={classes.cardInfo}>
                            <div className={classes.title}>
                                <a href="."><h4>{detail.title}</h4></a>
                            </div>
                            <div className={classes.rating}>
                                <span><FontAwesomeIcon icon={faStar} color='#ea2251' size='sm' /></span>
                                <span><FontAwesomeIcon icon={faStar} color='#ea2251' size='sm' /></span>
                                <span><FontAwesomeIcon icon={faStar} color='#ea2251' size='sm' /></span>
                                <span><FontAwesomeIcon icon={faStar} color='#ea2251' size='sm' /></span>
                                <span><FontAwesomeIcon icon={faStar} color='#ea2251' size='sm' /></span>
                            </div>
                            <div className={classes.paragraph}>
                                <p>{detail.detail}</p>
                            </div>
                            <div className={classes.address}>
                                <span>ADDRESS:</span>
                                <span>{detail.address}</span>
                            </div>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}

export default LocationCard
