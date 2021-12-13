import React, { useEffect, useState } from 'react';
import axios from "axios";

import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {

    const [singlePokemon, setSinglePokemon] = useState({});

    useEffect(() => {
        const fetchSinglePokemon = async () => {
            try {
                const result = await axios.get(pokemon.url);
                setSinglePokemon(result.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchSinglePokemon();
    }, [pokemon.url])

    return (
        <>
            {
                Object.keys(singlePokemon).length > 0 &&
                <li className='pokemon-card' key={singlePokemon.id}>
                    <h2 className='pokemon-name'>{singlePokemon.name}</h2>
                    <img className='pokemon-img' src={singlePokemon.sprites.other['dream_world']['front_default']} alt=""/>
                    <p>Moves: {singlePokemon.moves.length}</p>
                    <p>Weight: {singlePokemon.weight}</p>

                    <p>Abilities:</p>
                    <ul className='abilities-list'>
                        {
                            singlePokemon.abilities.map((ability) => {
                                return (
                                    <li className='ability-item' key={ability.ability.name}>
                                        {ability.ability.name}
                                    </li>
                                );
                            })
                        }
                    </ul>
                </li>
            }
        </>
    );
};

export default PokemonCard;