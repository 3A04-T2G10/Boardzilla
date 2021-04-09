import React from 'react';
import Plot from 'react-plotly.js';
const StockHolder = (props) =>{
    return(
        <div>
            <div>
                {/* React Plotly library */}
                {props.Query?(<Plot
                    data={[
                        {
                        x: props.Stock_X_Values,
                        y: props.Stock_Y_Values,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'blue'},
                        }
                    ]}
                    layout={{width: 450, height: 350, title: props.Query+' Stock'}}
                />):null}
                <p>{props.Query?('The most Recent Date: '+props.Stock_X_Values[0]):null}</p>
                <p>{props.Query?('Stock: '+props.Stock_Y_Values[0] + ' units'):null}</p>

            </div>
        </div>
    );
};

export default StockHolder;