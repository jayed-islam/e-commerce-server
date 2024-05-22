import app from './app';
import config from './app/config';

import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Ecommerce app listening on port ${config.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

main();
