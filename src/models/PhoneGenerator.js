const { faker } = require('@faker-js/faker');

class PhoneGenerator {
    constructor(seed, locale) {
        this.faker = faker;
        this.locale = locale;
        this.faker.locale = this.locale;
        this.faker.seed(seed);
        console.log("generating phone...");
  }

  generatePhoneNumber() {
      return faker.phone.number();
  }
}

module.exports = PhoneGenerator;