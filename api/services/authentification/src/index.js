import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import AuthentificationService from './Authentification.service';
import blueBird from 'bluebird';

const mongoConfig =  require('dotenv').config();
mongoose.Promise = blueBird;
const promise = [
  mongoose.connect("mongodb://" + process.env.MONGO_HOST + "/" + process.env.MONGO_DB, {useMongoClient: true})
];
const serverUse = [
  bodyParser.json(),
];

Promise.all(promise)
  .then(() => {
    let app = express();
    let apiRouter = express.Router();
    let authentificationService = new AuthentificationService();

    apiRouter.use("/", authentificationService.getRouter());

    app.use("/auth", apiRouter);
    app.use("/", (req, res) => {
      return res.json({error: 404, message: "not found"});
    });
    app.listen(8080, () => {
      console.log("server listen port 8080, waiting connection...")
    });
  })
  .catch((err) => {
    console.log("Error during server initialisation. Read stack trace for more details");
    console.log(err);
  });