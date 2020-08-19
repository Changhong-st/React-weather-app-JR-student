import React from 'react'
import './navbar.css'

class NavBar extends React.Component{
    constructor(props){
        super(props)
        this.handleCountryInput = this.handleCountryInput.bind(this);
        this.handleCityInput = this.handleCityInput.bind(this);
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
    }
    handleCountryInput(e){
        this.props.handleCountry(e.target.value);
    }
    handleCityInput(e){
        this.props.handleCity(e.target.value);
    }

    handleInputSubmit(e){
        this.props.handleSubmit(e);
    }

render(){
    return(
        <div className="row">
            <div className="col-md navbar">       
                <input className="country-input" placeholder="Enter Country" onChange={this.handleCountryInput} />
                <input className="city-input" placeholder="Enter City" onChange={this.handleCityInput} />
                <input className="input-submit" type="submit" onClick={this.handleInputSubmit} />
            </div>
        </div>
    );
   
}                 
}

export default NavBar;
