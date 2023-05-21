/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const UserRouter = require('../routers/user_router');
const HealthcheckRouter = require('../routers/health_check');
const AuthenticationRouter = require('../routers/authentication_router');

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

class DSWA {
  constructor() {
    this._app = express();
    this._app.use(express.json());
    this._app.use(cors(corsOptions));
    this._app.use(UserRouter);
    this._app.use(HealthcheckRouter);
    this._app.use(AuthenticationRouter);
    DSWA.connect();
  }

  get app() {
    return this._app;
  }

  static async connect() {
    mongoose.Promise = global.Promise;

    try {
      await mongoose.connect(
        `mongodb+srv://${config.mongo.username}:${config.mongo.password}@${config.mongo.address}/?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      );

      console.log('Successfully connected to Mongo database');
    } catch (error) {
      console.log(`Error connecting to MongoDB: ${error}`);
      throw error;
    }
  }
}

module.exports = DSWA;
