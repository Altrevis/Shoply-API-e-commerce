import dotenv from 'dotenv';
dotenv.config();

import { sequelize, OauthClient } from '../models/index.js';
import bcrypt from 'bcrypt';

async function main() {
  try {
    await sequelize.authenticate();
    console.log('DB connected for seeder');

    const clientId = 'test_client_id';
    const clientSecretPlain = 'test_client_secret';

    const hashed = await bcrypt.hash(clientSecretPlain, 10);

    const [client, created] = await OauthClient.findOrCreate({
      where: { client_id: clientId },
      defaults: {
        client_id: clientId,
        client_secret: hashed,
        name: 'Client Test',
        grants: 'password,refresh_token'
      }
    });

    if (created) console.log('Client créé:', clientId);
    else console.log('Client déjà existant:', clientId);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
