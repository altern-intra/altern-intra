const express = require('express');
const { ModulesModel } = require('intra-models');

/* GET modules listing. */

class ModulesRouter {
  constructor(db) {
    this.db = db;
    this.modulesModel = new ModulesModel(this.db);
    this.modulesModelSchema = this.modulesModel.getSchema();
    this.router = express.Router();
    this.router
      .get('/', (req, res) => {
        this.modulesModel
          .getModules({
            instance: 'LYN-0-1',
          })
          .then((results) => {
            res.json({ status: true, data: results });
          })
          .catch((err) => {
            throw err;
          });
      });
  }
  getRouter() {
    return this.router;
  }
}

module.exports = ModulesRouter;
