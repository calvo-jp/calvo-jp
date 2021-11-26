const coalesce = (...args: any[]) => {
  for (const arg of args) {
    if (typeof arg !== 'undefined') {
      return arg;
    }
  }
};

export default coalesce;
