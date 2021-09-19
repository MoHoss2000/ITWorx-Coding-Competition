import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const CycleCard = ({icon, className, cycle_id, start_date, end_date, url, text}) => {
    return (
        <div className="card">
        <div className={`card__side ${className}`}>
          <div className="card__title card__title--3">
            <i className="fas fa-rocket"></i>
            <h4 className="card__heading"> {icon}</h4>
            <h4 className="card__heading"> Cycle {cycle_id}</h4>
          </div>

          <div className="card__details">
            <ul>
            <li> <b>Cycle ID: </b> {cycle_id}</li>
               <li> <b>Start Date: </b> {start_date.slice(0,10)}</li>
               <li> <b>End Date: </b> {end_date.slice(0,10)}</li>
            </ul>
          </div>
        </div>
        <div className={`card__side card__side--back ${className}`}>
          <div className="card__cta">
            <div className="card__price-box">
              <p className="card__price-value">{text}</p>
            </div>
            <Button type='default' style={{'backgroundColor': '#0099cc'}}>   
                <Link to={url} style={{ 'color': 'white'}}> 
                  View
                </Link>  
            </Button>
          </div>
        </div>
      </div>
    )
}

export default CycleCard