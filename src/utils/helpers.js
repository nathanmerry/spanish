const helpers = {
  randomNumber(length) {
    return Math.floor(Math.random() * length);
  },

  shuffleArr(array) {
    var tmp,
      current,
      top = array.length;
    if (top)
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    return array;
  },

  randomIndexes(length, maxRange, revokeIndex) {
    let indexes = [];

    while (indexes.length < length) {
      var r = this.randomNumber(maxRange);

      if (r === revokeIndex) {
        return this.randomIndexes(length, maxRange, revokeIndex);
      } else if (indexes.indexOf(r) === -1) {
        indexes.push(r);
      }
    }

    return indexes;
  }
};

export default helpers;
