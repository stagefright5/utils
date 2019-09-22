/* 'esversion: 8' */
function isKVObject(entity) {
  return entity !== null &&
    !Array.isArray(entity) &&
    typeof entity === 'object' &&
    Object.keys(entity).length;
}
function deepSearch(Obj, key) {
  for (let outerKey of Object.keys(Obj)) {
    if ((Object.keys(Obj[outerKey])).length > 0 && outerKey !== key) {
      return deepSearch(Obj[outerKey], key);
    } else {
      if (outerKey === key) {
        return Obj[key];
      }
    }
  }
}

function checkSettingsProperties(settingsJson, defaultSettings) {
  Object.keys(defaultSettings).map(key => {
    if (!settingsJson[key]) {
      settingsJson[key] = defaultSettings[key];
    } else if (typeof defaultSettings[key] === 'object') {
      checkSettingsProperties(settingsJson[key], defaultSettings[key]);
    } else {
      if (settingsJson[key] !== defaultSettings[key]) {
        settingsJson[key] = defaultSettings[key];
      }
    }
  });
}

/**
* Accepts a string with Query parameters.
* @param urlWithSearchParams A string with query parameters.
* @returns An object of query params.
*/
function getSearchParams(urlWithSearchParams) {
  const paramsObj = {};
  const search = urlWithSearchParams.split('?')[1];
  if (search) {
    const params = search.split('&');
    if (params) {
      for (let x of params) {
        let y = x.split('=');
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
function easierConstructParams(url) {
  const q = {};
  Array.from(new URL(url).searchParams).forEach(kvArr => {
    q[kvArr[0]] = kvArr[1];
  });
  return q;
}

/**
 * Creates a string that looks like an object (breaks if the value is an array)
 * @param {*} object An object (can be a nested)
 */
function getObjAsString(object) {
  if (!(object instanceof Object)) {
    return object;
  }
  if (object instanceof Array) {
    return '[' + object.toString() + ']';
  }
  let objectAsString = '{';
  Object.entries(object).forEach(v => {
    if (!(v[1] instanceof Object)) {
      objectAsString += `${v[0]}: ${v[1]},`;
    } else {
      objectAsString += `${v[0]}: ${this.getObjAsString(v[1])},`;
    }
  });
  if (objectAsString[objectAsString.length - 1] === ',') {
    objectAsString = objectAsString.slice(0, -1);
  }
  return objectAsString += '}';
}

/**
 * Converts pascal/camel cased text to kebab case
 * @param {*} pascalOrCamelText - pascal/camel cased string.
 * @returns kebab cased string that is equivalent to the input pascal/camel text.
 */
function pOrCToKebab(pascalOrCamelText) {
  return !pascalOrCamelText ? '' :
    (pascalOrCamelText[0].toLowerCase() + pascalOrCamelText.slice(1).replace(/([A-Z])/g, '-$1').toLowerCase()).replace(/\s/g, '');
}


/**
 * Converts kebab cased text to pascal/camel case
 * @param {*} kebabText - kebab cased string.
 * @param {*} pascal - Boolean. "true" if the it should return pascal cased string.
 * @returns pascal or camel cased string that is equivalent to the input kebab text.
 */
function kebabToPOrC(kebabText, pascal = false) {
  if (!kebabText) return '';
  let pascalText = (kebabText.split('-').map(x => (x[0].toUpperCase() + x.slice(1)).trim()).join(''));
  return pascal ? pascalText : pascalText[0].toLowerCase() + pascalText.slice(1);
}
