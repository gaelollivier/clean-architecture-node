const ObjectID = require('mongodb').ObjectID;

/**
 * Builds a mongoDB query filtering for a given list of object ids
 * If ids is not an array, returns an empty query (i.e: no filter)
 *
 * @param {?Array<string>} ids
 */
const idsFilter = ids => {
  if (!Array.isArray(ids)) {
    return {};
  }

  return { _id: { $in: ids.map(ObjectID) } };
};

module.exports = {
  idsFilter,
};
