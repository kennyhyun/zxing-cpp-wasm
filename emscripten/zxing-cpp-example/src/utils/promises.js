export const resolveAllInARow = (array = [], resolver) =>
  array.reduce(async (promise, ...args) => {
    const resolvedArray = await promise;
    return resolvedArray.concat(await resolver(...args));
  }, Promise.resolve([]));
