/* 'esversion: 8' */
function recursiveGetVal(Obj, key) {
  for (let outerKey of Object.keys(Obj)) {
    if ((Object.keys(Obj[outerKey])).length > 0) {
      this.recursiveGetVal(Obj[outerKey], key);
    } else {
      if (outerKey === key) {
        return Obj[key];
      }
    }
  }
}

function checkStudioSettingsProperties(settingsJson, defaultStudioSettings) {
  Object.keys(defaultStudioSettings).map(key => {
    if (!settingsJson[key]) {
      settingsJson[key] = defaultStudioSettings[key];
    } else if (typeof defaultStudioSettings[key] === 'object') {
      this.checkStudioSettingsProperties(settingsJson[key], defaultStudioSettings[key]);
    } else {
      if (settingsJson[key] !== defaultStudioSettings[key]) {
        settingsJson[key] = defaultStudioSettings[key];
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
      objectAsString += `${v[0]}: ${this.getObjAsString(v[1])}`;
    }
  });
  if (objectAsString[objectAsString.length - 1] === ',') {
    objectAsString = objectAsString.slice(0, -1);
  }
  return objectAsString += '}';
}