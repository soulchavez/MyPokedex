/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import PokemonDisplay from './src/components/PokemonDisplay';
import {CondensedPokemon, Pokemon} from './src/services/types';
import { pokemonList } from './src/services/PokemonService';

function App(): JSX.Element {

  const [pokemons, setPokemons] = useState<CondensedPokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState(-1);

  const getPokemons = async () => {
    const res = await pokemonList();
    if (res?.status === 200){
      setPokemons(res.data);
      console.log(res.data);
    }
  };

  const colors = ['#54C6EA', '#7CD1A8', '#F4A964', '#3A93C6', '#717EF6' ];
  //colors[Math.ceil(Math.random() * 5)]

  function renderItem({item, index}:{item: CondensedPokemon, index: number}){
    return(
      <TouchableOpacity style={{...styles.card, backgroundColor: index % 5 === 0 ? colors[4] : index % 4 === 0 ? colors[3] : index % 3 === 0 ? colors[2] : index % 2 === 0 ? colors[1] : colors[0] }} onPress={() => setSelectedPokemon(item.id)}>
        <Text style={styles.cardText}>{item.name}</Text>
        <Text style={styles.cardText}>#{item.id}</Text>
      </TouchableOpacity>
    );
  }

  useEffect(()=>{

    getPokemons();

  }, []);

  return (
    <SafeAreaView style={{backgroundColor:'#ee4343', paddingBottom: 40}}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#ee4343'} />
      <PokemonDisplay id={selectedPokemon} />
      <FlatList data={pokemons} renderItem={renderItem} numColumns={2} keyExtractor={(item, index) => index.toString()} contentContainerStyle={{backgroundColor: '#ededed', paddingHorizontal: '5%', paddingVertical: 16, gap: 16, columnGap: 16}}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card:{
    width: '45%',
    backgroundColor: '#54C6EA',
    paddingVertical: 16,
    marginRight: '2.5%',
    marginLeft: '2.5%', 
    borderRadius: 15
  }, 
  cardText:{
    fontSize: 18, 
    fontWeight: '800',
    textAlign:'center',
    color: '#fff', 
    textTransform: 'capitalize'
  }
});

export default App;
