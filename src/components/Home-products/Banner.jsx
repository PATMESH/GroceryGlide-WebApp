import React from 'react'
import groceries from '../Images/fruits-and-vegetables.png'
import leftbanner from '../Images/banner11.png'
import rightbanner from '../Images/banner12.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping,  faTruckFast } from '@fortawesome/free-solid-svg-icons'

function Banner() {
  return (
    <div className='banner-main'>
        <div className='banner1'>
        <img src={leftbanner} className="banner-left"></img>
        <div className='banner-text'>
        <h3>
          Groceries Delivered<FontAwesomeIcon
           icon={faCartShopping}  />
        </h3>
        <h3 style={{color:"darkgoldenrod",Size:"38px"}}><FontAwesomeIcon icon={faTruckFast}/>  within 24hrs</h3>
        </div>
        <img src={groceries} className='banner-img'></img>
        <img src={rightbanner} className='banner-right'></img>
        </div>
    </div>
  )
}

export default Banner