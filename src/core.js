/**
 * Simple safari detection based on user agent test
 */
const isSafari = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const isJsons = array =>
  Array.isArray(array) &&
  array.every(row => typeof row === "object" && !(row instanceof Array));

const isArrays = array =>
  Array.isArray(array) && array.every(row => Array.isArray(row));

const jsonsHeaders = array =>
  Array.from(
    array
      .map(json => Object.keys(json))
      .reduce((a, b) => new Set([...a, ...b]), [])
  );

const jsons2arrays = (jsons, headers) => {
  headers = headers || jsonsHeaders(jsons);

  // allow headers to have custom labels, defaulting to having the header data key be the label
  let headerLabels = headers;
  let headerKeys = headers;
  if (isJsons(headers)) {
    headerLabels = headers.map(header => header.label);
    headerKeys = headers.map(header => header.key);
  }

  const data = jsons.map(object =>
    headerKeys.map(header => getHeaderValue(header, object))
  );
  return [headerLabels, ...data];
};

const getHeaderValue = (property, obj) => {
  const foundValue = property
    .replace(/\[([^\]]+)]/g, ".$1")
    .split(".")
    .reduce(function(o, p, i, arr) {
      // if at any point the nested keys passed do not exist, splice the array so it doesnt keep reducing
      if (o[p] === undefined) {
        arr.splice(1);
        return null;
      } else {
        return o[p];
      }
    }, obj);
  // if at any point the nested keys passed do not exist then looks for key `property` in object obj
  return foundValue === undefined
    ? property in obj
      ? obj[property]
      : ""
    : foundValue;
};

const elementOrEmpty = element => (element || element === 0 ? element : "");

const joiner = (data, config = {
  separator: ",",
  enclosingCharacter:'"'
}) => {

  return data
    .filter(e => e)
    .map(row =>
      row
        .map(element => elementOrEmpty(element))
        .map(column => `${config.enclosingCharacter}${column}${config.enclosingCharacter}`)
        .join(config.separator)
    )
    .join(`\n`);
};

const arrays2csv = (data, headers, config = {
  separator: ",",
  enclosingCharacter:'"'
}) =>
  joiner(headers ? [headers, ...data] : data, config);

const jsons2csv = (data, headers) => joiner(jsons2arrays(data, headers), config = {
  separator: ",",
  enclosingCharacter:'"'
});

const string2csv = (data, headers) =>
  headers ? `${headers.join()}\n${data}` : data;

const toCSV = (data, headers, config = {
  separator: ",",
  enclosingCharacter:'"'
}) => {
  if (isJsons(data)) return jsons2csv(data, headers, config);
  if (isArrays(data)) return arrays2csv(data, headers, config);
  if (typeof data === "string") return string2csv(data, headers);
  throw new TypeError(
    `Data should be a "String", "Array of arrays" OR "Array of objects" `
  );
};

export const buildURI = (data, headers, config = {
  separator: ",",
  enclosingCharacter:'"'
}) => {
  const csv = toCSV(data, headers);
  const type = isSafari() ? "application/csv" : "text/csv";
  const blob = new Blob(["", csv], { type });
  const dataURI = `data:${type};charset=utf-8,${""}${csv}`;

  const URL = window.URL || window.webkitURL;

  return typeof URL.createObjectURL === "undefined"
    ? dataURI
    : URL.createObjectURL(blob);
};
