export function createCustomizableMixin(cb) {
  return function (...args) {
    return function (target) {
      Object.assign(target.prototype, cb(...args));
    };
  };
}

export function createAfterAction(cb) {
  return function (target) {
    const existingHooks = target.prototype.afterHooks || [];

    Object.assign(target.prototype, {afterHooks: [...existingHooks, cb]});
  };
}
