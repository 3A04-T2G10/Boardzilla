import React from 'react';

const WeatherHolder = (props) =>{
    return(
        <div>
            <div className>
                {/* Location */}
                <h1>{props.city}</h1>
                <h1>{props.country}</h1>

                

                {/* Degree */}
                {props.temp_celsius?(<h3 className="py-2"> {"Today's Celsius degree: "+props.temp_celsius}&deg; </h3>):null}
                
                

                {/* Maximum and Minimum Degree */}
                {props.temp_min&&props.temp_max?(<h3>
                <span className = "py-2">{"Lowest Temperature: "+props.temp_min}&deg;</span><br/>
                <span className = "py-2">{"Highest Temperature: "+props.temp_max}&deg;</span>
                </h3>):null}
             
                {/* Weather */}
                
                {props.weatherIcon?<h5 className ="py-4">
                    <i className={`wi ${props.weatherIcon} display-1`}></i>
                </h5>:null}
                <h3> {props.description}</h3>

            </div>
        </div>
    );
};


export default WeatherHolder;