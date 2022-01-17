import { createContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, collection, getDocs, getDoc, doc, query, orderBy, limit, where } from 'firebase/firestore/lite';
import _ from 'lodash';

const app = initializeApp({
  apiKey: 'AIzaSyBK-EdRy8HJWm9LiMeLPr-q_kBTfSfTcVY',
  authDomain: 'composeart-f9a7a.firebaseapp.com',
  projectId: 'composeart-f9a7a',
  databaseURL: 'https://composeart-f9a7a.firebaseio.com',
});

const db = getFirestore(app);
const functions = getFunctions(app);
const simulateFight = httpsCallable(functions, 'simulateFight');

interface PayloadTypes {
  collections: [];
  fighters: [];
  account: string | null | undefined;
}

const defaultPayload: PayloadTypes = {
  collections: [],
  fighters: [],
  account: '',
};

export const PayloadContext = createContext(defaultPayload);

export const remoteSimulateFight = async ({
  fighterOneStats,
  fighterTwoStats,
  randomness,
  blocknumber,
}: any) => {
  const options = {
    isSimulated: randomness && blocknumber ? true : false,
    fighterOneStats,
    fighterTwoStats,
    random: randomness || '0',
    blockNumber: blocknumber || '1',
  };

  const result = await simulateFight(options);

  return result.data;
};

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

export const getCollectionPlayers = async (collectionId: any) => {
  const ref1 = collection(db, `nft-death-games/season_0/collections/${collectionId}/players`);

  const players: any = [];

  const snapshot1 = await getDocs(ref1);
  snapshot1.forEach((d) => {
    players.push({
      collection: collectionId,
      ...d.data(),
    });
  });

  return players;
};


export const getRandomPlayers = async (collections: any) => {
  let player1: any = {};
  let player2: any = {};

  if (collections.length) {
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
  }

  return {
    player1,
    player2,
  };
};

export const getRandomPlayer = async (collections: any) => {
  let player: any = {};

  if (collections.length) {
    const collection1 = _.sample(collections);
    const random = _.random(4, 86);

    const ref1 = collection(db, `nft-death-games/season_0/collections/${collection1.id}/players`);
    const query1 = query(ref1, where("power", "==", random), limit(1));

    const snapshot1 = await getDocs(query1);
    snapshot1.forEach((d) => {
      player = {
        collection: collection1.id,
        ...d.data(),
      };
    });

    if (_.isEmpty(player)) {
      const ref2 = collection(db, `nft-death-games/season_0/collections/${collection1.id}/players`);
      const query2 = query(ref2, orderBy("power", "desc"), limit(1));

      const snapshot2 = await getDocs(query2);
      snapshot2.forEach((d) => {
        player = {
          collection: collection1.id,
          ...d.data(),
        };
      });
    }
  }

  return player;
};

