/* eslint no-unused-vars: 0 */
const mongoose = require('mongoose');

const { ObjectID } = mongoose.Schema;

const Module = new mongoose.Schema({
  title: String,
  codeModule: String,
  competence: String,
  description: String,
  semester: Number,
  credits: Number,
  timeline: {
    begin: Date,
    end: Date,
    end_register: Date,
  },
  instances: [],
  registered: [],
  assistant: [],
  resp: [],
});

class ModuleClass {
  constructor(db) {
    this.db = db;
    this.module = Module;
    this.schema = this.getSchema();
  }

  getSchema() {
    return this.db.model('Module', this.module.loadClass(ModuleClass));
  }
  getModules(params = {}) {
    const { instance, semester, codeModule } = params;
    let { activites, registered } = params;
    activites = activites || 0;
    registered = registered || 0;
    return new Promise((resolve, reject) => {
      this.schema
        .find({}, { activites, registered })
        .lean()
        .then((results) => {
          let resultsFiltered = results;
          if (instance) {
            resultsFiltered = resultsFiltered.map((result) => {
              if (result.activites) { result.activites = result.activites[instance]; }
              if (result.registered) { result.registered = result.registered[instance]; }
              if (result.resp) { result.resp = result.resp[instance]; }
              if (result.assistant) { result.assistant = result.assistant[instance]; }
              return result;
            });
          }
          resolve(resultsFiltered);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = ModuleClass;
