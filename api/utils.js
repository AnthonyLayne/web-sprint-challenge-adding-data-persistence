const validateKeys = (validKeys, obj) => {
  const objKeys = Object.keys(obj);

  return validKeys.every((k) => objKeys.includes(k));
};

module.exports = {
  validateKeys,
};
