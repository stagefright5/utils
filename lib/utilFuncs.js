/* eslint-disable no-invalid-this */
export default (function Utils() {
  const fn = {};
  const globalThis = (function __getGlobal() {
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    throw new Error('unable to locate global object');
  })();

  /**
   * @param {*} entity
   * @return {boolean}
   */
  function __isKVObject(entity) {
    return !!(entity !== undefined &&
      entity !== null &&
      !Array.isArray(entity) &&
      typeof entity === 'object' &&
      Object.keys(entity).length);
  }

  /**
   * Get the value of a key of an object at any level.
   * @param {*} Obj Object on which the search should be done.
   * @param {string} searchKey the key whose value should be returned.
   * @param {boolean} searchAll Whether to search all aor to stop after getting the first match. Defaults to false.
   * @return {*} Value of the first occurance of the key. If not found, null.
   */
  function deepSearchHelper(Obj, searchKey, searchAll = false) {
    const value = [];
    return (function __deepSearch(Obj) {
      if (Array.isArray(Obj)) {
        if (searchAll || !value.length) {
          Obj.forEach((e) => {
            __deepSearch(e);
          });
        }
      } else if (__isKVObject(Obj)) {
        Object.keys(Obj).forEach((key) => {
          if (key === searchKey) {
            const newValue = Obj[searchKey];
            value.push(newValue);
          }
          if (searchAll || !value.length) {
            __deepSearch(Obj[key]);
          }
        });
      }
      return value;
    })(Obj);
  }

  /**
   *
   * @param {*} cxt the "this" context to check the property
   * @param {string} property property name
   * @return {boolean} "true" if the object has that property, else, "false".
   */
  function __saferHasOwnProperty(cxt, property) {
    return Object.prototype.hasOwnProperty.call(cxt, property);
  }

  /**
   * Replace the value of a key of an object at any level.
   * @param {*} entity Object in which the replace should be done.
   * @param {Array<{searchKey: string, value: any}> | {searchKey: string, value: any}} skVArray (string) the key whose value
   * should be replaced.
   * @param {string} replacementStrategy 'first' | 'all' Whether to replace only
   * the first match or all the matches.
   * Defaults to 'first'.
   * @return {*} the original Obj with replaced value for the "searchKey"
   * according to the "replacementStrategy".
   */
  function deepReplaceHelper(entity, skVArray, replacementStrategy = 'first') {
    const skVObjType = (x) => Object.keys(x).length == 2 && __saferHasOwnProperty(x, 'searchKey') && __saferHasOwnProperty(x, 'value');
    if ((!Array.isArray(skVArray))) {
      if (!skVObjType(skVArray)) {
        throw Error('type of " skVArray" is Array<{searchKey: string, value: any}> | {searchKey: string, value: any}');
      }
      skVArray = [skVArray];
    } else if (Array.isArray(skVArray) && skVArray.some((x) => !skVObjType)) {
      throw Error('type of " skVArray" is Array<{searchKey, value}>');
    }
    skVArray.forEach((skVObj) => {
      fn.replaced = false;
      fn.d = { one: [], two: [], three: [] };
      __deepReplace(skVObj.searchKey, skVObj.value, entity, replacementStrategy);
    });
    delete fn.replaced;
    return { entity, recurseStats: fn.d };
  }

  /**
   * @param {*} searchKey (string) the key whose value should be replaced.
   * @param {*} value value of the key
   * @param {*} entity Object in which the replace should be done.
   * @param {string} replacementStrategy 'first' | 'all' Whether to replace only the first match or all the matches.
   * @return {*} the original Obj with replaced value for the "searchKey"
   * according to the "replacementStrategy".
   */
  function __deepReplace(searchKey, value, entity, replacementStrategy = 'first') {
    if (Array.isArray(entity)) {
      entity.forEach((arrayElm) => {
        if (replacementStrategy !== 'first' || !fn.replaced) {
          __deepReplace(searchKey, value, arrayElm, replacementStrategy);
        }
      });
    } else if (__isKVObject(entity)) {
      Object.keys(entity).forEach((key) => {
        if (replacementStrategy !== 'first' || !fn.replaced) {
          if (key !== searchKey && (__isKVObject(entity[key]) || Array.isArray(entity[key]))) {
            __deepReplace(searchKey, value, entity[key], replacementStrategy);
          } else if (key === searchKey) {
            entity[searchKey] = value;
            if (replacementStrategy === 'first') {
              fn.replaced = true;
            }
          }
        }
      });
    }
    return entity;
  }

  /**
  * Accepts a string with Query parameters.
  * @param {string} urlWithSearchParams A string with query parameters.
  * @return {*} An object of query params.
  */
  function getSearchParams(urlWithSearchParams) {
    const paramsObj = {};
    const search = urlWithSearchParams.split('?')[1];
    if (search) {
      const params = search.split('&');
      if (params) {
        for (const x of params) {
          const y = x.split('=');
          if (y.length > 1) {
            paramsObj[y[0]] = y[1];
          } else {
            return Error('url does not contain search params');
          }
        }
        return paramsObj;
      } else {
        return Error('url does not contain search params');
      }
    } else {
      return Error('url does not contain search params');
    }
  }

  /**
   * @param {string} url url string
   * @return {*} Object with key:value as query parameter's key and value
   */
  function easierConstructParams(url) {
    const q = {};
    Array.from(new URL(url).searchParams).forEach((kvArr) => {
      q[kvArr[0]] = kvArr[1];
    });
    return q;
  }

  /**
   * Creates a string that looks like an object
   * @param {*} entity An object (can be a nested)
   * @param {boolean} stringifyNonObjects
   * @return {string} String from obj
   */
  function getObjAsString(entity, stringifyNonObjects = false) {
    let returnValue = entity;
    if (!__isKVObject(entity) && !Array.isArray(entity)) {
      returnValue = stringifyNonObjects ? JSON.stringify(entity) : entity;
    } else if (Array.isArray(entity)) {
      returnValue = entity.reduce((r, e, i, array) =>
        r += `${getObjAsString(e, stringifyNonObjects)}${array.length - 1 !== i ? ',' : ''}`, '[') +
        ']';
    } else if (__isKVObject(entity)) {
      returnValue = Object.entries(entity)
        .reduce((r, e, i, array) =>
          r += `${e[0]}: ${getObjAsString(e[1], stringifyNonObjects)}${array.length - 1 !== i ? ',' : ''}`, '{') +
        '}';
    }
    return returnValue;
  }

  /**
   * Converts pascal/camel cased text to kebab case
   * @param {*} pascalOrCamelText - pascal/camel cased string.
   * @return {string} kebab cased string that is
   * equivalent to the inputpascal/camel text.
   */
  function kebabFromPorC(pascalOrCamelText) {
    try {
      return !pascalOrCamelText ? '' :
        (pascalOrCamelText[0].toLowerCase() + pascalOrCamelText.slice(1)
          .replace(/([A-Z])/g, '-$1')
          .toLowerCase())
          .replace(/\s/g, '');
    } catch (e) {
      throw Error('Please send the string that is in pascal/camel case.');
    }
  }

  /**
   * Converts kebab cased text to pascal/camel case
   * @param {*} kebabText - kebab cased string.
   * @param {*} pascal - Boolean. "true" if the it should
   * return pascal cased string.
   * @return {string} pascal or camel cased string that
   * is equivalent to the input kebab text.
   */
  function pOrCFromKebab(kebabText, pascal = false) {
    if (!kebabText) return '';
    try {
      const pascalText = kebabText.split('-')
        .map((x) => (x[0].toUpperCase() + x.slice(1)).trim())
        .join('');
      return pascal ? pascalText :
        pascalText[0].toLowerCase() + pascalText.slice(1);
    } catch (e) {
      throw Error('WTF Dude!? This is not magic. Google "what is kebab case"');
    }
  }

  return {
    deepSearch: deepSearchHelper,
    deepReplace: deepReplaceHelper,
    kebabFromPorC,
    pOrCFromKebab,
    getObjAsString,
    getURLQParams: function (url) {
      if (globalThis.URL) {
        return easierConstructParams(url);
      } else {
        return getSearchParams(url);
      }
    },

  };
})();
