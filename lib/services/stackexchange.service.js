const { Base } = require('./common');

class Stackexchange extends Base {
  static supporterImgParams = ['query', 'stackexchangesite'];

  get imgNamedParams() {
    const { github } = this.data;
    return {
      query: github.repo,
      stackexchangesite: 'stackoverflow',
    };
  }
}

class StackExchangeQuestions extends  Stackexchange {}

class StackExchangeReputation extends  Stackexchange {}

class StackExchangeMonthlyQuestions extends  Stackexchange {}

module.exports = {
  StackExchangeQuestions,
  StackExchangeReputation,
  StackExchangeMonthlyQuestions,
};
