const functions = require('firebase-functions');
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

  const baseUrl = functions.config().app.id === 'deathfinance' ? 'https://wagdie.app' : 'https://death.finance';
  const storageBaseUrl = `https://storage.googleapis.com/${functions.config().app.id}.appspot.com`;
  const metaLogo = functions.config().app.id === 'deathfinance' ? `${baseUrl}/meta-logo-dev.png` : `${baseUrl}/meta-logo.png`;

  console.log(path);
  console.log(query);
  console.log(storageBaseUrl)

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
            description: `Who will be victorious? This match was run on block ${simulation.block || '-'} with a chaos value of ${simulation.randomness || '-'}.`,
            image: simulation.image_url,
          });

          response.status(200).send(index);
        } else {
          response.redirect(`${baseUrl}/simulator`);
        }
      } else {
        index = setMetas(index, {
          title: 'Simulate Fights | Fight Club',
          description: 'Simulate fights between NFTs.',
          image: metaLogo,
        });

        response.status(200).send(index);
      }
    } else if (path[1] === 'profile') {
      index = setMetas(index, {
        title: 'Profile | Fight Club',
        description: path[2] ? `Checkout ${path[2]}'s fighters.` : 'Register your fighter to compete in the Fight Club.',
        image: path[2] ? `${storageBaseUrl}/profiles/${path[2]}.png` : metaLogo,
      });

      response.status(200).send(index);
    } else if (path[1] === 'faq') {
      index = setMetas(index, {
        title: 'FAQ | Fight Club',
        description: 'Answering all your questions regarding NFT Fight Club.',
        image: metaLogo,
      });

      response.status(200).send(index);
    } else if (path[1] === 'rewards') {
      index = setMetas(index, {
        title: 'Rewards | Fight Club',
        description: 'By participating in death.finance you will earn Grim PFP NFTs!',
        image: `${storageBaseUrl}/season_0/rewards.png`,
      });

      response.status(200).send(index);
    } else if (path[1] === 'season') {
      if (path[3] === 'collections') {
        index = setMetas(index, {
          title: path[4] ? path[4] : 'Collections | Fight Club',
          description: path[4] ? `Checkout ${path[4]} collection's stats and fighters` : 'Checkout the collections participating in NFT Fight Club',
          image: path[4] ? `${storageBaseUrl}/collections/${path[4]}.png` : metaLogo,
        });

        response.status(200).send(index);
      } else if (path[3] === 'fighters') {
        index = setMetas(index, {
          title: path[4] ? path[4] : 'Fighters | Fight Club',
          description: path[4] ? `Checkout ${path[4]}'s stats` : 'Checkout the fighters participating in NFT Fight Club',
          image: path[4] ? `${storageBaseUrl}/fighters/${path[4]}.png` : metaLogo,
        });

        response.status(200).send(index);
      } else if (path[3] === 'matches' && path[4]) {
        const matchDoc = await db.collection('nft-death-games')
          .doc('season_0')
          .collection('matches')
          .doc(path[4])
          .get();

        if (matchDoc.exists) {
          const match = matchDoc.data();
          const fighter1 = match.player1;
          const fighter2 = match.player2;

          const name1 = `${fighter1.collection} #${_.truncate(fighter1.token_id, { length: 7 })}`;
          const name2 = `${fighter2.collection} #${_.truncate(fighter2.token_id, { length: 7 })}`;

          index = setMetas(index, {
            title: `${name1} vs ${name2}`,
            description: `Checkout match results at death.finance. This match was run on block ${match.block} with a chaos value of ${match.randomness}.`,
            image: `${storageBaseUrl}/matches/${path[4]}.png`,
          });

          response.status(200).send(index);
        } else {
          response.redirect(`${baseUrl}/matches`);
        }
      } else if (path[3] === 'tournament') {
        index = setMetas(index, {
          title: 'Tournament | NFT Fight Club',
          description: 'Register your fighter to compete in th Fight Club.',
          image: metaLogo,
        });

        response.status(200).send(index);
      } else {
        index = setMetas(index, {
          title: functions.config().app.id === 'deathfinance' ? 'WAGDIE Fight Club' : 'NFT Fight Club',
          description: 'Register your fighter to compete in the Fight Club.',
          image: metaLogo,
        });

        response.status(200).send(index);
      }
    } else {
      index = setMetas(index, {
        title: functions.config().app.id === 'deathfinance' ? 'WAGDIE Fight Club' : 'NFT Fight Club',
        description: 'Register your fighter to compete in the Fight Club.',
        image: metaLogo,
      });

      response.status(200).send(index);
    }
  } catch (error) {
    console.log(error);
    response.status(500);
  }
});
