/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Pokemon} from '../services/types';
import {getSinglePokemon} from '../services/PokemonService';

interface PokemonDisplayProps {
  id: number;
}

export default function PokemonDisplay({id}: PokemonDisplayProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [currentPic, setCurrentPic] = useState<'front' | 'back'>('front');
  const getPokemon = async () => {
    const res = await getSinglePokemon(id);
    if (res?.status === 200) {
      setPokemon(res.data);
      console.log(res.data);
    }
  };

  useEffect(() => {
    getPokemon();
  }, [id]);

  return (
    <View style={styles.displayContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity
          onPress={() => {
            setCurrentPic(currentPic === 'front' ? 'back' : 'front');
          }}>
          <Image
            style={{width: 20, height: 20, objectFit: 'contain'}}
            source={require('../assets/triangulo1.svg')}
          />
        </TouchableOpacity>
        <Image
          style={styles.pokemonImage}
          source={{
            uri:
              currentPic === 'front' ? pokemon?.images[0] : pokemon?.images[1],
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setCurrentPic(currentPic === 'front' ? 'back' : 'front');
          }}>
          <Image
            style={{width: 44, height: 44,objectFit: 'contain'}}
            source={require('../assets/triangulo2.svg')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.pokemonInfoContainer}>
        <View style={styles.pokemonInfo}>
  
          <Text style={styles.pokemonName}>{pokemon?.name}</Text>
          <Text style={styles.type}>{pokemon?.types.toString()}</Text>
          <View style={styles.measurements}>
            <View>
              <Text style={styles.subtitle}>Height</Text>
              <Text>{pokemon?.height * 10}cm</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>Weight</Text>
              <Text>{pokemon?.weight / 10}kg</Text>
            </View>
          </View>
        </View>
        <View style={styles.abilities}>
          <Text style={styles.subtitle}>Abilities</Text>
          <Text>{pokemon?.abilities.toString()}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  displayContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: '5%',
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    padding: 24,
  },
  type:{
    color:'#FF5353',
    fontWeight: '800',
    textTransform: 'capitalize',
    fontSize: 16
  },
  pokemonImage: {
    width: 240,
    height: 240,
  },
  measurements: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 10,
  },
  pokemonInfoContainer: {
    margin: 'auto',
  },
  pokemonInfo: {},
  abilities: {
    marginTop: 24,
  },

  pokemonName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    color: '#000',
    textTransform: 'capitalize',
  },

  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    color: '#3D86DD',
  },
});
