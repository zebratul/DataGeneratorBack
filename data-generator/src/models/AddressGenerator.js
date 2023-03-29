const { faker } = require('@faker-js/faker');

class AddressGenerator {
    constructor(seed, locale) {
        this.faker = faker;
        this.locale = locale;
        this.faker.locale = this.locale;
        this.faker.seed(seed);
        console.log("generating address...");
  }

  generateStreetAddress() {
      return this.faker.address.streetAddress();
  }

  generateCity() {
      return this.faker.address.city();
  }

  generateState() {
      return this.faker.address.state();
  }

  generateZipCode() {
      return this.faker.address.zipCode();
  }

  generateCountry() {
      const countryMap = {
          cz: 'Czech Republic',
          en: 'USA',
          en_GB: 'Great Britain',
          fi: 'Finland',
          de: 'Germany',
          it: 'Italy',
          pl: 'Poland',
          es: 'Spain'
      };
      const country = countryMap[this.locale];
      return country;
  }

  generateAddress() {
      return {
          streetAddress: this.generateStreetAddress(),
          city: this.generateCity(),
          state: this.generateState(),
          zipCode: this.generateZipCode(),
          country: this.generateCountry(),
      };
    }
}

module.exports = AddressGenerator;