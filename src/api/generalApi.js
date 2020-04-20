const models = require('../../models');

exports.getAllUsers = async function(req, res) {
    const results = await models.sequelize.models.User.findAll();
    console.log(`results: ${JSON.stringify(results)}`);
    return results;
}

