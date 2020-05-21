import React, { Component } from 'react'
import './Card.css'
import Card from './Card';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
export default class Cardlist extends Component {
    constructor(props){
        super(props);
        this.state = {
            startStatus:false,
            startGameStatus:false,
            finishedStatus:false,
            cardLeft:0,
            deckId:'',
            cards1:[], cards2:[]
        }
        this.renderCard = this.renderCard.bind(this);
        this.addCard = this.addCard.bind(this);
        this.resetGame = this.resetGame.bind(this);

    }
    componentDidMount(){
        let url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
        axios.get(url).then(res => {
            const data = res.data;
            setTimeout(( () => {
                this.setState({startStatus:true, deckId: data.deck_id})
            }),3000)
        })
    }
    resetGame(){
        let url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
        axios.get(url).then(res => {
            const data = res.data;
            this.setState({startStatus:false});
            setTimeout(( () => {
                this.setState({cards1:[], cards2:[],deckId: data.deck_id, startStatus:true, startGameStatus:false})
            }),3000)
        });
     }

    renderCard(){
        let url = `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=2`
        axios.get(url).then(res => {
            const data = res.data;
            this.setState({cardLeft: data.remaining})
            const card1 = {img: data.cards[0].image, alt:data.cards[0].suit, id:uuidv4()};
            const card2 = {img: data.cards[1].image, alt:data.cards[1].suit, id:uuidv4()}
            this.setState({
                cards1:[...this.state.cards1,card1],
                cards2:[...this.state.cards2,card2],
                startGameStatus:true
            })
        })
    }
    addCard(){
        this.renderCard();
    }

    render() { 
        let gameStatus = this.state.cardLeft === 0 ? (
                <button onClick={this.resetGame} className="gameover-btn">Play Again</button>
            ): ( 
                    <button className="gameboard-btn" onClick={this.addCard}>Deal Me A Card</button>
            );

        let gameModuel = this.state.startGameStatus ? ( 
            <div className="gameboard">
                <div className="gameboard-header">
                    {gameStatus}
                </div>
                    <div className="top-card-container">
                        {this.state.cards1.map( el => (
                            <Card link={el.img} key={el.id} title={el.alt}/>
                        ))}
                    </div>

                   
                    <div className="bottom-card-container">
                        {this.state.cards2.map( el => (
                            <Card link={el.img} key={el.id} title={el.alt}/>
                        ))}
                    </div>

                        <h2>{this.state.cardLeft}</h2>
                </div>
    
            ):  
                (<div className="intro-container">
                        <h1>Crash Of Cards</h1>
                        <button className="game-start-btn" onClick={this.renderCard}> Click To begin Game !</button>
                </div>)

        
        return (
            <section>
                {this.state.startStatus ? (
                <div className="main-container">
                    {gameModuel} 
                </div>) :( 
                <div className="loading-container">
                    <h3>Loading</h3> 
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>) }    
            </section>
        )
    }
}
