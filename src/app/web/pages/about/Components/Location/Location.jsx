import React from 'react'
import Head2 from '../Head/Head2/Head2'
import LocationCard from './LocationCard/LocationCard'
import img1 from '../../assets/images/img1.jpg'
import img2 from '../../assets/images/img2.jpg'
import img3 from '../../assets/images/img3.jpg'

import classes from './Location.module.css'
// import GoogleMap from './GoogleMap/GoogleMap'


const Location = () => {
    const txt = {
        title: 'Our Bistro',
        subtitle: 'Locations',
        linkTitle: 'all contact detail'
    }

    const locationDetail = [
        {
            img: img1,
            title: 'Bistro – Downtown',
            address: '1400 14th St NW, Washington, DC 20005',
            detail: 'Etiam nibh neque, aliquam ut ornare in, porttitor eu quam. Maecenas magna dui, e fficitur ut laoreet vel, euismod eget erat vestibulum.'
        },
        {
            img: img2,
            title: 'Bistro – Capitol',
            address: '501 E Capitol St SE, Washington, DC 20003',
            detail: 'Etiam nibh neque, aliquam ut ornare in, porttitor eu quam. Maecenas magna dui, e fficitur ut laoreet vel, euismod eget erat vestibulum.'
        },
        {
            img: img3,
            title: 'Bistro – Anacostia',
            address: '1400 Good Hope Rd SE, Washington, DC 20050',
            detail: 'Etiam nibh neque, aliquam ut ornare in, porttitor eu quam. Maecenas magna dui, e fficitur ut laoreet vel, euismod eget erat vestibulum.'
        },
    ]
    return (
        <div className={classes.container}>
            <Head2 txt={txt}/>
            <LocationCard details={locationDetail} />
            {/* <GoogleMap /> */}
        </div>
    )
}

export default Location
