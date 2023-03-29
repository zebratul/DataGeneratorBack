const NameGenerator = require('./NameGenerator');
const AddressGenerator = require('./AddressGenerator');
const PhoneGenerator = require('./PhoneGenerator');
const DataCorruptor = require('./DataCorruptor');
const seedrandom = require('seedrandom');
const { hashCode } = require('../utils/hash');

class DataGenerator {
    constructor(seed, locale, page, corruptionLevel) {
        this.page = (page-1)*10;
        this.nameGenerator = new NameGenerator(seed, locale);
        this.addressGenerator = new AddressGenerator(seed, locale);
        this.phoneGenerator = new PhoneGenerator(seed, locale);
        this.corruptionLevel = corruptionLevel;
        this.dataCorruptor = new DataCorruptor(seed, corruptionLevel);
        this.rng = seedrandom(hashCode(seed));
        this.lastIndex = 0;
  }

  generateData(numPages = 1) {
      console.log("generating final data");
      const data = [];
      for (let i = 1; i < (numPages * 10)+1; i++) {
          const name = this.nameGenerator.generateFullName(this.rng);
          const address = this.addressGenerator.generateAddress(this.rng);
          const phone = this.phoneGenerator.generatePhoneNumber(this.rng);
          data.push({
              index:  i + this.page,
              id: Math.floor(this.rng() * 1000000),
              name,
              address,
              phone,
        });
      }
      this.lastIndex += numPages * 10;
      console.log("corrupting data...", this.corruptionLevel);
      return this.dataCorruptor.corruptData(data);
  }
}

module.exports = DataGenerator;