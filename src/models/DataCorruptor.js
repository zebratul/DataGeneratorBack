const seedrandom = require('seedrandom');

class DataCorruptor {
    constructor(seed, corruptionLevel) {
        this.rng = seedrandom(seed);
        this.corruptionLevel = corruptionLevel;
        this.charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }

  deleteCharacter(str) {
      const deleteIndex = Math.floor(this.rng() * str.length);
      return str.substring(0, deleteIndex) + str.substring(deleteIndex + 1);
  }

  addRandomCharacter(str) {
      const addIndex = Math.floor(this.rng() * (str.length + 1));
      const addedChar = this.charSet.charAt(Math.floor(this.rng() * this.charSet.length));
      return str.substring(0, addIndex) + addedChar + str.substring(addIndex);
  }

  swapCharacters(str) {
      const swapIndex = Math.floor(this.rng() * (str.length - 1));
      return str.substring(0, swapIndex) + str.charAt(swapIndex + 1) + str.charAt(swapIndex) + str.substring(swapIndex + 2);
  }

  corruptField(field) {
      const maxErrors = Math.floor(this.corruptionLevel) + (this.rng() < (this.corruptionLevel % 1) ? 1 : 0);
      let newField = field;
      for (let i = 0; i < maxErrors; i++) {
          const errorType = Math.floor(this.rng() * 3);
          switch (errorType) {
              case 0:
                  newField = this.deleteCharacter(newField);
                  break;
              case 1:
                  newField = this.addRandomCharacter(newField);
                  break;
              case 2:
                  newField = this.swapCharacters(newField);
                  break;
              default:
                  break;
          }
      }
      return newField;
  }

  corruptData(data) {
      return data.map((item) => ({
          ...item,
          name: this.corruptField(item.name),
          address: {
            ...item.address,
            streetAddress: this.corruptField(item.address.streetAddress),
            city: this.corruptField(item.address.city),
            state: this.corruptField(item.address.state),
            zipCode: this.corruptField(item.address.zipCode),
            country: this.corruptField(item.address.country),
          },
          phone: this.corruptField(item.phone),
      }));
    }
}

module.exports = DataCorruptor;