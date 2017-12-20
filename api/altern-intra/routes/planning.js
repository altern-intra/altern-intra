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
        const instance = req.params.instance;

        let {startDate, endDate} = req.params;
        if (startDate === undefined) {
          startDate = moment();
        }
        if (endDate === undefined) {
          endDate = moment().add(7, "days");
        }
        const matcher = {
          $match: {
                  instances: [instance],
                  begin: {
                    $lte: endDate.format('YYYY-MM-DD')
                  },
                  end: {
                    $gte: startDate.format('YYYY-MM-DD')
                  }
          }};
        this.modulesModelSchema.aggregate([matcher,
        {
          $lookup: {
            from: "activities",
            localField: "_id",
            foreignField: "moduleId",
            as: "activities"
          }}, {
            $unwind: {
              path: "$activities",
              preserveNullAndEmptyArrays: true
            }
          },{
          $lookup: {
            from: "events",
            localField: "activities._id",
            foreignField: "activityId",
            as: "activities.eventsFounds"
          }
        }]).then((result) => {
          console.log(result)
          res.send(result)
        });
      });
        // Promise.all([
        //     this.modulesModelSchema
        //     .find({
        //       instances: [instance],
        //       begin: {
        //         $lte: endDate.format('YYYY-MM-DD')
        //       },
        //       end: {
        //         $gte: startDate.format('YYYY-MM-DD')
        //       }
        //   }).lean(), this.activityModelSchema
        //     .find({
        //       instance_location: instance,
        //       begin: {
        //         $lte: endDate.format('YYYY-MM-DD')
        //       },
        //       end: {
        //         $gte: startDate.format('YYYY-MM-DD')
        //       }
        //   }).lean(), this.eventModelSchema
        //     .find({
        //       codeInstance: instance,
        //       begin: {
        //         $lte: endDate.format('YYYY-MM-DD')
        //       },
        //       end: {
        //         $gte: startDate.format('YYYY-MM-DD')
        //       }
        //     }).lean()])
        //   .then((result) => {
        //     const [ modules, activities, events ] = result;
        //     const tmp = modules.map((module, index) => {
        //       module.activitiesFound = activities.filter(activity => activity.moduleId && activity.moduleId.toString() === module._id.toString())
        //       return module
        //     });
        //
        //     res.json({status: true,
        //       instance,
        //       tmp
        //     });
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //     res.json({status: false, msg: err});
        //   })
  }
  getRouter() {
    return this.router;
  }
}

module.exports = PlanningRouter;
