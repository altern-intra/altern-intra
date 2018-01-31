const express = require('express');
const { ModulesModel, EventModel, ActivityModel } = require('intra-models');
const moment = require('moment');

class PlanningRouter {
  constructor(db) {
    this.db = db;
    this.modulesModel = new ModulesModel(this.db);
    this.modulesModelSchema = this.modulesModel.getSchema();
    this.activityModel = new ActivityModel(this.db);
    this.activityModelSchema = this.activityModel.getSchema();
    this.eventModel = new EventModel(this.db);
    this.eventModelSchema = this.eventModel.getSchema();
    this.router = express.Router();
    this.router
      .get('/:instance', (req, res) => {
        const { instance } = req.params;

        let { startDate, endDate } = req.params;
        if (startDate === undefined) {
          startDate = moment();
        }
        if (endDate === undefined) {
          endDate = moment().add(7, 'days');
        }
        const matcher = {
          $match: {
            instances: [instance],
            begin: {
              $lte: endDate.format('YYYY-MM-DD'),
            },
            end: {
              $gte: startDate.format('YYYY-MM-DD'),
            },
          },
        };
        this.modulesModelSchema.aggregate([matcher,
          {
            $lookup: {
              from: 'activities',
              localField: '_id',
              foreignField: 'moduleId',
              as: 'activities',
            },
          }, {
            $unwind: {
              path: '$activities',
              preserveNullAndEmptyArrays: true,
            },
          }, {
            $lookup: {
              from: 'events',
              localField: 'activities._id',
              foreignField: 'activityId',
              as: 'activities.eventsFounds',
            },
          }])
          .then((result) => {
            res.send(result);
          });
      });
  }
  getRouter() {
    return this.router;
  }
}

module.exports = PlanningRouter;
