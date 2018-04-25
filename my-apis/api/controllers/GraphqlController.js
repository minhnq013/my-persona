/**
 * GraphqlController
 *
 * @description :: Server-side logic for managing graphqls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const { graphql } = require("graphql");
const actionUtil = require("sails/lib/hooks/blueprints/actionUtil");

// Import the adapter
const WaterlineGraphql = require("../../utils/WaterlineGraphql");

module.exports = {
  index(req, res) {
    // default index action
    const query = req.body.query;

    // Get the schemas
    const schemas = sails.services.graphqlSchema;

    // Use your schemas here...
    // Execute the query
    graphql(schemas, query).then(result => {
      if (result.errors) {
        res.status(400);
        res.send(result.errors);
      }
      res.json(result.data);
    });
  }
};
