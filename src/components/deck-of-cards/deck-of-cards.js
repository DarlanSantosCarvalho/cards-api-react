import {useEffect, useState} from "react";
import "./deck-of-cards.css"

async function createDeck(){
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const deck = await response.json()
    return deck.deck_id
}

async function getCards(deckId){
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`)
    return await response.json()
}

const DeckOfCards = () => {
    const [deck, setDeck] = useState({
        cards: []
    })

    useEffect(() => {
        const fetchData = async() =>{
        const deckId = await createDeck()
        const data = await getCards(deckId)

        setDeck ({
            cards: data.cards
        })
    }
    fetchData()
    }, [])

    return(
        <section>
            <ul className="lista">
                {
                    deck.cards.map((card, index) => {
                    return(
                            <li className="cartas" key={index}>
                                 <img src={card.image} alt={card.value} />
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default DeckOfCards