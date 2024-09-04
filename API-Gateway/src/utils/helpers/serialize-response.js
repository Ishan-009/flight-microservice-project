function serializeErrorObject(error) {
  return {
    statusCode: error.statusCode,
    explanation: error.explanation,
  };
}

function serializeUserObject(user) {
  const { password, createdAt, updatedAt, ...filteredObject } = user.dataValues;
  return filteredObject;
}

module.exports = {
  serializeErrorObject,
  serializeUserObject,
};
