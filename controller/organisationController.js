const Organisation = require("../model/organisatioModel");
const factory = require("./handlerFactory");

exports.createOrganisation = factory.createOne(Organisation);
exports.getAllOrganisations = factory.getAll(Organisation);
exports.getOrganisation = factory.getOne(Organisation);
exports.updateOrganisation = factory.updateOne(Organisation);
exports.deleteOrganisation = factory.deleteOne(Organisation);
