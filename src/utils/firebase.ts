import { createContext, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  limit,
  where,
  onSnapshot,
  startAfter,
  endAt,
  startAt,
} from 'firebase/firestore';
import _ from 'lodash';

const projectId = process.env.REACT_APP_ENVIRONMENT === 'dev' ? 'deathfinance' : 'composeart-f9a7a';

const app = initializeApp({
  apiKey: process.env.REACT_APP_ENVIRONMENT === 'dev' ? 'AIzaSyA9-uYwBORSpwtOZyavuDEtGFT6HPR8hoc' : 'AIzaSyBK-EdRy8HJWm9LiMeLPr-q_kBTfSfTcVY',
  authDomain: `${projectId}.firebaseapp.com`,
  projectId,
  databaseURL: `https://${projectId}.firebaseio.com`,
});

export const auth = getAuth(app);
export const db = getFirestore(app);

const functions = getFunctions(app);
const createUser = httpsCallable(functions, 'createUser');
const connectDiscordUser = httpsCallable(functions, 'connectDiscordUser');
const simulateFight = httpsCallable(functions, 'simulateFight');
const registerFighter = httpsCallable(functions, 'registerFighter');
const getAddressNFTs = httpsCallable(functions, 'getAddressNFTs');

interface PayloadTypes {
  collections: [];
  season: any,
  user: any,
  account: string | null | undefined;
  chain: string | null | undefined;
}

interface RemotePayloadTypes {
  blockNumber: any;
  contractAddress: any;
  randomness: string | null | undefined;
}

const defaultPayload: PayloadTypes = {
  collections: [],
  season: {},
  account: '',
  chain: '',
  user: {},
};

const defaultRemoteChainPayload: RemotePayloadTypes = {
  blockNumber: '',
  contractAddress: '',
  randomness: '',
};

export const PayloadContext = createContext(defaultPayload);
export const RemoteChainPayloadContext = createContext(defaultRemoteChainPayload);

function delay(delay: any) {
  return new Promise (function(fulfill) {
    setTimeout(fulfill, delay);
  });
};

export const useLocalStorage = (key: string, initialValue: any) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export const fetchAssets = async (address: any) => {
  const result = await getAddressNFTs({
    ownerAddress: address,
  });

  return result.data;
};

export const remoteCreateUser = async (address: any) => {
  await createUser({
    address,
  });
};

export const remoteConnectDiscordUser = async (token: any, address: any) => {
  await connectDiscordUser({
    token,
    address,
  });
};

export const remoteSimulateFight = async ({
  f1,
  f2,
  randomness,
  blocknumber,
}: any) => {
  const result = await simulateFight({
    isSimulated: randomness && blocknumber ? true : false,
    player1Id: f1.id,
    player1Collection: f1.collection,
    player2Id: f2.id,
    player2Collection: f2.collection,
    f1,
    f2,
    random: randomness || '0',
    blockNumber: blocknumber || '1',
  });

  return result.data;
};

export const remoteRegisterFighter = async ({
  owner,
  collection,
  contract,
  token_id,
  player,
}: any) => {
  const result = await registerFighter({
    ownerAddress: owner,
    collection,
    contract,
    token_id,
    playerId: player,
  });

  return result.data;
};

export const getSeason = async () => {
  const docRef = doc(db, `nft-death-games`, 'season_0');
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const getUser = async (address: any) => {
  const docRef = doc(db, `nft-death-games/season_0/users`, address);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const getSimulation = async (simulationId: any) => {
  const docRef = doc(db, `nft-death-games/season_0/simulations`, simulationId);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const getMatch = async (matchId: any) => {
  const docRef = doc(db, `nft-death-games/season_0/matches`, matchId);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const getCollections = async () => {
  const collections: any = [];

  const querySnapshot = await getDocs(collection(db, "nft-death-games/season_0/collections"));

  querySnapshot.forEach((docSnap) => {
    collections.push({
      id: docSnap.id,
      ...docSnap.data(),
    });
  });

  return collections;
};

export const getBracketMatches = async (id: any) => {
  const ref1 = collection(db, `nft-death-games/season_0/tournament/${id}/matches`);

  const matches: any = [];

  const snapshot1 = await getDocs(ref1);
  snapshot1.forEach((d) => {
    matches.push(d.data());
  });

  return matches;
};

export const getLatestFighters = async () => {
  const fighters: any = [];

  const ref1 = collection(db, `nft-death-games/season_0/fighters`);
  const query1 = query(ref1, orderBy("timestamp", "desc"), limit(9));

  const snapshot1 = await getDocs(query1);

  snapshot1.forEach((docSnap) => {
    fighters.push(docSnap.data());
  });

  return fighters;
};

export const getTournamentMatch = async (bracket: string, id: string) => {
  const docRef = doc(db, `nft-death-games/season_0/tournament/${bracket}/matches`, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const getFighter = async (id: string) => {
  const docRef = doc(db, `nft-death-games/season_0/fighters`, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const getAllFighters = async () => {
  const fighters: any = [];

  const ref1 = collection(db, `nft-death-games/season_0/fighters`);
  const query1 = query(ref1, orderBy("timestamp", "desc"));

  const snapshot1 = await getDocs(query1);

  snapshot1.forEach((docSnap) => {
    fighters.push(docSnap.data());
  });

  return fighters;
};

export const getCollectionFighters = async (collectionId: any) => {
  const fighters: any = [];

  const ref1 = collection(db, `nft-death-games/season_0/fighters`);
  const query1 = query(ref1, where("collection", "==", collectionId), orderBy("timestamp", "desc"));

  const snapshot1 = await getDocs(query1);

  snapshot1.forEach((docSnap) => {
    fighters.push(docSnap.data());
  });

  return fighters;
};


export const getCollectionPlayers = async (collectionId: any) => {
  const ref1 = collection(db, `nft-death-games/season_0/collections/${collectionId}/players`);

  const players: any = [];

  const snapshot1 = await getDocs(ref1);
  snapshot1.forEach((d) => {
    players.push(d.data());
  });

  return players;
};

export const getRandomPlayer = async (collections: any) => {
  let player: any = {};

  if (collections.length) {
    const collection1 = _.sample(collections);
    const random = _.random(10, 75);

    const ref1 = collection(db, `nft-death-games/season_0/collections/${collection1.id}/players`);
    const query1 = query(ref1, where("power", "==", random), limit(1));

    const snapshot1 = await getDocs(query1);
    snapshot1.forEach((d) => {
      player = d.data();
    });

    if (_.isEmpty(player)) {
      const ref2 = collection(db, `nft-death-games/season_0/collections/${collection1.id}/players`);
      const query2 = query(ref2, orderBy("power", "desc"), limit(1));

      const snapshot2 = await getDocs(query2);
      snapshot2.forEach((d) => {
        player = d.data();
      });
    }
  }

  return player;
};

export const getOwnerFighters = async (address: any) => {
  const fighters: any = [];

  const ref1 = collection(db, `nft-death-games/season_0/fighters`);
  const query1 = query(ref1, where("owner", "==", address));

  const snapshot1 = await getDocs(query1);

  snapshot1.forEach((docSnap) => {
    fighters.push({
      id: docSnap.id,
      ...docSnap.data(),
    });
  });

  return fighters;
};

export const getBracketFights = async (bracket: any) => {
  const fights: any = [];

  const ref1 = collection(db, `nft-death-games/season_0/fights`);
  const query1 = query(ref1, where("bracket", "==", bracket));

  const snapshot1 = await getDocs(query1);

  snapshot1.forEach((docSnap) => {
    fights.push({
      id: docSnap.id,
      ...docSnap.data(),
    });
  });

  return fights;
};

export const getMatchFights = async (bracket: any, matchId: any) => {
  const fights: any = [];

  const ref1 = collection(db, `nft-death-games/season_0/fights`);
  const query1 = query(ref1, where("bracket", "==", bracket), where("match_id", "==", matchId));

  const snapshot1 = await getDocs(query1);

  snapshot1.forEach((docSnap) => {
    fights.push({
      id: docSnap.id,
      ...docSnap.data(),
    });
  });

  return fights;
};

export const chainQuery = doc(db, 'chains/goerli');

export const seasonQuery = doc(db, 'nft-death-games/season_0');

export const collectionsQuery = query(collection(db, `nft-death-games/season_0/collections`));

export const allFightersQuery = query(collection(db, `nft-death-games/season_0/fighters`), where("is_invalid", "==", false), where("is_doping", "==", false));
export const ownerFightersQuery = (address: string) => query(collection(db, `nft-death-games/season_0/fighters`), where("owner", "==", address));
export const collectionFightersQuery = (collectionId: string) =>  query(collection(db, `nft-death-games/season_0/fighters`), where("is_invalid", "==", false), where("is_doping", "==", false), where("collection", "==", collectionId));

export const userQuery = (address: string) => doc(db, 'nft-death-games/season_0/users', address);
export const allUsersQuery = query(collection(db, `nft-death-games/season_0/users`));

export const latestMatchQuery = query(collection(db, `nft-death-games/season_0/matches`), orderBy("block", "desc"), limit(1));
export const allMatchesQuery = (block: string) => query(collection(db, `nft-death-games/season_0/matches`), orderBy("block", "desc"), startAt(block), limit(100));
export const collection1MatchesQuery = (collectionId: string) => query(collection(db, `nft-death-games/season_0/matches`), where("collection1", "==", collectionId), orderBy("block", "desc"), limit(50));
export const collection2MatchesQuery = (collectionId: string) => query(collection(db, `nft-death-games/season_0/matches`), where("collection2", "==", collectionId), orderBy("block", "desc"), limit(50));
export const fighter1MatchesQuery = (fighterId: string) => query(collection(db, `nft-death-games/season_0/matches`), where("fighter1", "==", fighterId), orderBy("block", "desc"), limit(50));
export const fighter2MatchesQuery = (fighterId: string) => query(collection(db, `nft-death-games/season_0/matches`), where("fighter2", "==", fighterId), orderBy("block", "desc"), limit(50));
export const owner1MatchesQuery = (ownerId: string) => query(collection(db, `nft-death-games/season_0/matches`), where("owner1", "==", ownerId), orderBy("block", "desc"), limit(50));
export const owner2MatchesQuery = (ownerId: string) => query(collection(db, `nft-death-games/season_0/matches`), where("owner2", "==", ownerId), orderBy("block", "desc"), limit(50));

export const bracketMatchesQuery = (bracket: string) =>  query(collection(db, `nft-death-games/season_0/tournament/${bracket}/matches`));
export const bracketFightsQuery = (bracket: string) =>  query(collection(db, `nft-death-games/season_0/fights`), where("bracket", "==", bracket));
