import React, { Component } from 'react'
import './Card.css'
export default class Card extends Component {
    render() {
        let cardStyle = null;
       
        switch(this.props.title){
            case 'CLUBS':
               cardStyle = 'card-position-1'
            break;
            case 'DIAMONDS':
                cardStyle = 'card-position-2'
            break;
            case 'HEARTS':
                cardStyle = 'card-position-3'
            break;
            case "SPADES":
                cardStyle = 'card-position-4'
            break;
            default:
                cardStyle =  'card-position-5'
        }
        
        return (
           <img src={this.props.link} alt={this.props.title} className={`card-image ${cardStyle}`}/>
        )
    }
}
