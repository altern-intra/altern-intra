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
        const { instance } = req.query;

        const matcher = {};
        if (instance) {
          matcher.instances = [instance];
        }
        this.modulesModelSchema
          .find(matcher)
          .then((results) => {
            res.json({ status: true, data: results });
          })
          .catch((err) => {
            throw err;
          });
      })
      .get('/:id', (req, res) => {
        const { id } = req.params;
        this.modulesModelSchema
          .findById(id)
          .then((module) => {
            res.json({ status: true, data: module });
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
