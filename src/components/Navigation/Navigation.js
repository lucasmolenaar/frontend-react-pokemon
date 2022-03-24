import React from 'react';
import './Navigation.css';
import axios from "axios";

const Navigation = ( { handleSetAllPokemons, nextPokemonUrl, setNextPokemonUrl, previousPokemonUrl, setPreviousPokemonUrl, isDisabled }) => {

    const fetchPreviousPokemons = async () => {
        if (previousPokemonUrl) {
            try {
                const result = await axios.get(previousPokemonUrl);
                setPreviousPokemonUrl(result.data.previous);
                handleSetAllPokemons(result.data.results);
            } catch (e) {
                console.error(e);
            }
        }
    }

    const fetchNextPokemons = async () => {
        try {
            const result = await axios.get(nextPokemonUrl);
            setPreviousPokemonUrl(result.data.previous);
            setNextPokemonUrl(result.data.next);
            handleSetAllPokemons(result.data.results);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <ul className='nav'>
            <li>
                <button
                    disabled={!previousPokemonUrl}
                    type='button'
                    className='nav-item'
                    onClick={fetchPreviousPokemons}
                >
                    Vorige
                </button>
            </li>

            <li>
                <button
                    disabled={!nextPokemonUrl}
                    type='button'
                    className='nav-item'
                    onClick={fetchNextPokemons}
                >
                    Volgende
                </button>
            </li>
        </ul>
    );
};

export default Navigation;