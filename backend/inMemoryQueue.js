const queue = [];
module.exports = {
  push: (item) => queue.push(item),
  pop: () => queue.shift(),
  size: () => queue.length
};
