import React, { useEffect, useState } from 'react';
import axios from "axios";

import PokemonCard from "./components/PokemonCard/PokemonCard";
import Navigation from "./components/Navigation/Navigation";

import './App.css';
import logo from './assets/logo.png';

function App() {
    const [previousPokemonUrl, setPreviousPokemonUrl] = useState(null);
    const [nextPokemonUrl, setNextPokemonUrl] = useState(null);
    const [allPokemons, setAllPokemons] = useState([]);

    useEffect(() => {
        const fetchAllPokemons = async () => {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
                setAllPokemons(result.data.results);
                setNextPokemonUrl(result.data.next);
            } catch (e) {
                console.error(e);
            }
        }
        fetchAllPokemons();
    }, [])

  return (
    <div className='app'>
        <img className='logo' src={logo} alt="pokemon-logo"/>

        <Navigation
            handleSetAllPokemons={setAllPokemons}
            nextPokemonUrl={nextPokemonUrl}
            setNextPokemonUrl={setNextPokemonUrl}
            previousPokemonUrl={previousPokemonUrl}
            setPreviousPokemonUrl={setPreviousPokemonUrl}
        />

          <ul className='pokemon-list'>
              {
                  Object.keys(allPokemons).length > 0 &&
                      allPokemons.map((pokemon, index) => {
                          return (
                              <PokemonCard
                                  pokemon={pokemon}
                                  key={index}
                              />
                          );
                      })
              }
          </ul>
    </div>
  );
}

export default App;
