import React from 'react'
import './WeatherItem.scss';

export default function WeatherItem(props) {
  const { title, value } = props;

  return (
    <div className='box'>
        <p>{title}</p>
        <p>{value}</p>
    </div>
  )
}