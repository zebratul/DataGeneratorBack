const NameGenerator = require('../models/NameGenerator');
const AddressGenerator = require('../models/AddressGenerator');
const PhoneGenerator = require('../models/PhoneGenerator');
const DataGenerator = require('../models/DataGenerator');
const DataCorruptor = require('../models/DataCorruptor');
const { hashCode } = require('./hash');

const generateData = (locale, seed, page, corruptionLevel) => {
    const hashedSeed = hashCode(seed);
    const dataGenerator = new DataGenerator(hashedSeed, locale, page, corruptionLevel, NameGenerator, AddressGenerator, PhoneGenerator, DataCorruptor);
    return dataGenerator.generateData();
};

module.exports = {
    generateData,
    hashCode
};
