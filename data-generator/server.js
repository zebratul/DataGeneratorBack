const express = require('express');
const cors = require('cors');
const DataGenerator = require('./src/models/DataGenerator');

class Server {
    constructor() {
        this.app = express();
        this.port = 5000;
        this.dataGenerator = new DataGenerator();
        this.middlewares();
        this.routes();
  }

  middlewares() {
      this.app.use(express.json());
      this.app.use(cors());
  }

  routes() {
      this.app.get('/api/generate-data', (req, res) => {
          const { region, locale, seed } = req.query;
          if (!region) {
              return res.status(400).json({ error: 'Region not provided' });
          }
          if (!locale) {
              return res.status(400).json({ error: 'Locale not provided' });
          }
          const data = this.dataGenerator.generateData(region, locale, seed);
          return res.json(data);
    });
  }

  listen() {
      this.app.listen(this.port, () => {
          console.log(`Server.js running on port ${this.port}`);
      });
  }
}

const server = new Server();
server.listen();
