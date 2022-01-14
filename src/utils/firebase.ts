import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, query, orderBy, limit } from 'firebase/firestore/lite';
import _ from 'lodash';
import { createContext } from 'react';
import moment from 'moment';

const app = initializeApp({
  apiKey: 'AIzaSyBK-EdRy8HJWm9LiMeLPr-q_kBTfSfTcVY',
  authDomain: 'composeart-f9a7a.firebaseapp.com',
  projectId: 'composeart-f9a7a',
  databaseURL: 'https://composeart-f9a7a.firebaseio.com',
});

const db = getFirestore(app);

export const getCollections = async () => {
  const collections: any = [];

  const querySnapshot = await getDocs(collection(db, "nft-death-games/season_0/collections"));

  querySnapshot.forEach((doc) => {
    collections.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return collections;
};

export const getFighters = async () => {
  const fighters: any = [];

  const querySnapshot = await getDocs(collection(db, "nft-death-games/season_0/fighters"));

  querySnapshot.forEach((docSnap) => {
    fighters.push({
      id: docSnap.id,
      ...docSnap.data(),
    });
  });

  return fighters;
};

export const getPlayers = async (fighters: any) => {
  const players: any = [];

  for (const fighter of fighters) {
    const docRef = doc(db, `nft-death-games/season_0/collections/${fighter.collection}/players`, fighter.player);
    const docSnap = await getDoc(docRef);

    players.push({
      fighter: fighter.id,
      ...docSnap.data(),
    });
  }

  return players;
};

export const getRandomPlayers = async (collections: any) => {
  let player1: any = {};
  let player2: any = {};

  const collection1 = _.sample(collections);
  const collection2 = _.sample(_.filter(collections, (c: any) => c.id !== collection1.id));

  const ref1 = collection(db, `nft-death-games/season_0/collections/${collection1.id}/players`);
  const query1 = query(ref1, orderBy("power", "desc"), limit(1));

  const ref2 = collection(db, `nft-death-games/season_0/collections/${collection2.id}/players`);
  const query2 = query(ref2, orderBy("power", "desc"), limit(1));

  const snapshot1 = await getDocs(query1);
  snapshot1.forEach((d) => {
    player1 = {
      collection: collection1.id,
      ...d.data(),
    };
  });

  const snapshot2 = await getDocs(query2);
  snapshot2.forEach((d) => {
    player2 = {
      collection: collection2.id,
      ...d.data(),
    };
  });

  return {
    player1,
    player2,
  };
};

