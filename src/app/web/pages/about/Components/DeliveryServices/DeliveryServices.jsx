import React from 'react'

import classes from './DeliveryServices.module.css'
import img1 from '../../assets/images/logo-d.png'
import img2 from '../../assets/images/logo-u.png'
import img3 from '../../assets/images/logo-w.png'


const DeliveryServices = () => {
    return (
        <div className={classes.mainContainer}>
            <div className={classes.container}>
                
            <div className={classes.textAndBtn}>
                <div><p>Order Now</p></div>
                <div><h2>Citadela Delivery</h2></div>
                <div><a href="."><div>Browse Food</div></a> </div>
            </div>

            <div className={classes.services}>
                <div>
                    <h2><strong>3RD-PARTY DELIVERY SERVICES</strong></h2>
                </div>
                <div className={classes.brandLogos}>
                    <div>
                        <a href="."><img src={img1} alt="" /></a>
                    </div>
                    <div>
                        <a href="."><img src={img2} alt="" /></a>
                    </div>
                    <div>
                        <a href="."><img src={img3} alt="" /></a>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default DeliveryServices
