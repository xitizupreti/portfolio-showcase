import React from 'react'
import Head2 from '../Head/Head2/Head2'

import classes from './SpecialOffer.module.css'
import OfferCard from './OfferCard/OfferCard'


const SpecialOffer = () => {

    const txt = {
        title: 'Monthly Special Offers',
        subtitle: 'After Reservation Only'
    }

    const specialFoods = [
        {
            img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&c' +
                's=tinysrgb&dpr=2&h=750&w=1260',
            foodName: 'Chicken Burger',
            price: '$10.00',
            Oldprice: '$20.00'
        },
        {
            img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&c' +
                's=tinysrgb&dpr=2&h=750&w=1260',
            foodName: 'Chicken Burger',
            price: '$10.00',
            Oldprice: '$20.00'
        },
        {
            img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&c' +
                's=tinysrgb&dpr=2&h=750&w=1260',
            foodName: 'Chicken Burger',
            price: '$10.00',
            Oldprice: '$20.00'
        },
        {
            img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&c' +
                's=tinysrgb&dpr=2&h=750&w=1260',
            foodName: 'Chicken Burger',
            price: '$10.00',
            Oldprice: '$20.00'
        },
        
    ]

    return (
        <div className={classes.container}>
            <Head2 txt={txt}/>
            <div className = {classes.cardContainer}>
                {
                    specialFoods.map((food, i) => {
                        return (
                            <OfferCard 
                            key={i}
                            img={food.img} 
                            foodName={food.foodName} 
                            price={food.price}
                            Oldprice={food.Oldprice}
                            />
                            
                        )
                    })
                }
               
            </div>
        </div>
    )
}

export default SpecialOffer
