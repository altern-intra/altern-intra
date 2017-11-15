import express from 'express';
import AuthentificationModel from './Authentification.model';
import https from 'https';
import * as jwt from 'jsonwebtoken';

const getEnv = require('dotenv').config();

export default class AuthentificationService {
  constructor() {
    this.openIdConfiguration = "https://login.microsoftonline.com/common/.well-known/openid-configuration";
    this.officeInfo = {};
    this.signatureKeys = {};
    
    this.router = express.Router()
      .get("/connectionTest", (req, res) => {
        return res.json({connected: "true"});
      })

      .get("/checkAuth", (req, res) => {
        const token = req.headers['authentification']; 
        if (!token) {
          return res.status(401).json({result: false, error: "token not found"});
        }
        this.getOpenIdConfiguration()
        .then(() => {
          return this.getKeysMap()
        })
        .then(() => {
          let decodedToken = jwt.decode(token, {complete: true});
          let signature = this.signatureKeys.keys.find((elem) => {
            return elem.kid === decodedToken.x5t;
          });
          if (signature) {
          return res.json({sig: signature});
            jwt.verify(token, signature, (err, decoded) => {
              if (err) {
                return res.status(401).json({result: false, error: "token broken"});
              }
              return res.json({result: true, error: "none"});
            })
          }
          return res.status(401).json({result: false, error: "signature not found"});
        })
        .catch((err) => {
          return res.status(500).json({result: false, error: "an internal server occured"});
        })
    })
  }

  getKeysMap() {
    return new Promise((resolve, reject) => {
      https.get(this.officeInfo.jwks_uri, (jwksResult) => {
        let jwksBody;
        jwksResult.on('data', (chunkJwks) => {
          jwksBody = chunkJwks;
        })
        .on('end', () => {
          this.signatureKeys = JSON.parse(jwksBody);
          resolve();
        });
      })
      .on('socket', (socket) => {
        socket.emit('agentRemove');
      })
      .on('error', (err) => {
        reject(err);
      });
    });
  }

  getOpenIdConfiguration() {
    return new Promise((resolve, reject) => {
      https.get(this.openIdConfiguration, (result) => {
        let body;
        result.on('data', (chunk) => {
          body = chunk;
        })
        .on('end', () => {
          this.officeInfo = JSON.parse(body);
          resolve();
        });
      })
      .on('socket', (socket) => {
        socket.emit('agentRemove');
      })
      .on('error', (err) => {
        reject(err);
      });
    })
  }

  getRouter() {
    return this.router;
  }
}