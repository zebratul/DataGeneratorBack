const { faker } = require('@faker-js/faker');

class NameGenerator {
    constructor(seed, locale) {
        this.faker = faker;
        this.locale = locale;
        this.faker.locale = this.locale;
        this.faker.seed(seed);
        console.log("generating name...");
  }

  generateFirstName() {
      return this.faker.name.firstName();
  }

  generateLastName() {
      return this.faker.name.lastName();
  }

  generateMiddleName() {
      return this.faker.name.middleName();
  }

  generateFullName() {
      return this.faker.name.fullName();
  }
}

module.exports = NameGenerator;