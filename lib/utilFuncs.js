/* 'esversion: 8' */
function isKVObject(entity) {
  return entity !== null &&
    !Array.isArray(entity) &&
    typeof entity === 'object' &&
    Object.keys(entity).length;
}

/**
 * Get the value of a key of an object at any level.
 * @param {*} Obj Object on which the search should be done.
 * @param {*} key - (string) the key whose value should be returned.
 * @returns Value of the first occurance of the key. If not found, null.
 */
function deepSearch(Obj, key) {
  let value = null;
  return (function _deepSearch(Obj) {
    if (!value) {
      for (let outerKey of Object.keys(Obj)) {
        if (isKVObject(Obj[outerKey]) && outerKey !== key) {
          value = _deepSearch(Obj[outerKey]);
        } else {
          if (outerKey === key) {
            value = Obj[key];
          }
        }
      }
    }
    return value;
  })(Obj);
}

/**
 * Replace the value of a key of an object at any level.
 * @param {*} Obj Object in which the replace should be done.
 * @param {*} key (string) the key whose value should be replaced.
 * @param {*} replacementStrategy ('first' | 'all') Whether to replace only the first match or all the matches.
 * Defaults to 'first'.
 * @returns the original Obj with replaced value for the key.
 */
function deepReplace(Obj, searchKey, value, replacementStrategy = 'first') {
  let replaced = false;
  return (function _deepReplace(Obj) {
    for (let outerKey of Object.keys(Obj)) {
      if (isKVObject(Obj[outerKey]) && outerKey !== searchKey && !replaced) {
        _deepReplace(Obj[outerKey]);
      } else {
        if (outerKey === searchKey) {
          Obj[searchKey] = value;
          if (replacementStrategy === 'first') {
            replaced = true;
          }
        }
      }
    }
    return Obj;
  })(Obj);
}

