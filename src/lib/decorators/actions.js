import { createAfterHook, createCustomizableAfterHook, addToTargetAfterHooks } from './action-hook-helpers';

function jsonifyResult(type) {
  return (result) => {
    const attributes = {...result};
    const {id} = result;

    delete attributes.id;

    return { type, id, attributes };
  }
};

function mutData(data) {
  return {data};
};

function jsonifyCollection(type) {
  return function (results) {
    return results.map(jsonifyResult(type));
  };
};

const jsonApiSupport = function(type) {
  return function (target) {
    addToTargetAfterHooks(target, jsonifyCollection(type), mutData);
  };
}

export {jsonApiSupport};
