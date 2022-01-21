const functions  = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash');
const fs = require('fs');

admin.initializeApp(functions.config().firebase);

const firebaseFunction = functions.region('us-central1');

const setMetas = (index, { title, description, image }) => {
  index = index.replace('TWITTER_DYNAMIC_TITLE', title);
  index = index.replace('TWITTER_DYNAMIC_DESC', description);
  index = index.replace('TWITTER_DYNAMIC_IMAGE', image);

  index = index.replace('DYNAMIC_TITLE', title);
  index = index.replace('DYNAMIC_DESC', description);
  index = index.replace('DYNAMIC_IMAGE', image);

  return index;
};

exports.preRender = firebaseFunction.https.onRequest(async (request, response) => {
  const path = request.path ? request.path.split('/') : request.path;
  const query = request.query;
  const db = admin.firestore();

  console.log(path)
  console.log(query);

  try {
    let index = fs.readFileSync('./web/index.html').toString();

    if (path[1] === 'simulator') {
      if (path.length === 3) {
        const simulationId = path[2];

        const simulationDoc = await db.collection('nft-death-games')
          .doc('season_0')
          .collection('simulations')
          .doc(simulationId)
          .get();

        if (simulationDoc.exists) {
          const simulation = simulationDoc.data();
          const fighter1 = simulation.fighter1;
          const fighter2 = simulation.fighter2;

          const name1 = `${fighter1.collection} #${_.truncate(fighter1.token_id, { length: 7 })}`;
          const name2 = `${fighter2.collection} #${_.truncate(fighter2.token_id, { length: 7 })}`;

          index = setMetas(index, {
            title: `${name1} vs ${name2}`,
            description: `We have a great matchup today folks. It's ${name1} versus ${name2}! This match was run on block ${simulation.block} with ${simulation.randomness} randomness.`,
            image: simulation.image_url,
          });

          response.status(200).send(index);
        } else {
          response.redirect('https://death.finance/simulator');
        }
      } else {
        index = setMetas(index, {
          title: 'NFT Fight Club Simulation',
          description: 'Simulate fights between two NFTs using on-chain smart contract and on-chain randomness.',
          image: 'https://death.finance/meta-logo.png',
        });

        response.status(200).send(index);
      }
    } else {
      index = setMetas(index, {
        title: 'NFT Fight Club',
        description: 'Welcome to the NFT fight club, a competition between NFT personas in order to prove which ones are the best NFTs money can buy.',
        image: 'https://death.finance/meta-logo.png',
      });

      response.status(200).send(index);
    }
  } catch (error) {
    console.log(error);
    response.status(500);
  }
});
