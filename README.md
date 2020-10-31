# Overview :

Generate a CSV file from given data.

This data can be an array of arrays, an array of literal objects, or strings.

# Example :

```js
import { downloadCSV } from "download-csv";

const csvData = [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];

downloadCSV(csvData);
```

# Install

```
npm install https://github.com/ayush-shta/download-csv.git --save;
```

```
yarn add https://github.com/ayush-shta/download-csv.git;
```

# Function:

This package includes one function: 

`downloadCSV(data, headers, fileName);`

## Parameters:

The function accept the following `parameters`:


### - **data (required)**:

A required property that represents the CSV data.
This data can be _array of arrays_, _array of literal objects_ or _string_.

**Example of Array of arrays**

```js
// Array of arrays. Each item is rendered as a CSV line
data = [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];
```

**Example of array of literal objects**

```js
// Array of literal objects. 
// Each item is rendered as CSV line however the order of fields will be defined by the headers props. 
// If the headers props are not defined, the component will generate headers from each data item.
data = [
  { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
];
```

**Example of strings**

```js
// A string can be used if the data is already formatted correctly

data = `firstname,lastname
Ahmed,Tomi
Raed,Labes
Yezzi,Min l3b
`;
```

### - **headers (optional)**:

Specifying `headers` helps to define an order of the CSV fields. The csv content will be generated accordingly.

> Notes :
>
> - The meaning of headers with data of type `Array` is to order fields AND prepend those headers at the top of the CSV content.
> - The meaning of headers with data of type `String` data is only prepending those headers as the first line of the CSV content.

##### Custom Header Labels

Custom header labels can be used when converting data of type `Object` to CSV by having the header array itself be an array of literal objects of the form:

```js
{ label: /* Label to display at the top of the CSV */, key: /* Key to the data */ }
```

If the header array is an array of strings, the header labels will be the same as the keys used to index the data objects.

Example:

```js
import { downloadCSV } from "download-csv";

headers = [
  { label: "First Name", key: "firstname" },
  { label: "Last Name", key: "lastname" },
  { label: "Email", key: "email" }
];

data = [
  { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
];

downloadCSV(data, headers);
```

##### Nested JSON data

It is possible to reference nested strings in your data using dot notation

```js
headers = [
  { label: 'First Name', key: 'details.firstName' },
  { label: 'Last Name', key: 'details.lastName' },
  { label: 'Job', key: 'job' },
];

data = [
  { details: { firstName: 'Ahmed', lastName: 'Tomi' }, job: 'manager'},
  { details: { firstName: 'John', lastName: 'Jones' }, job: 'developer'},
];
```
Note: if at any point the nested keys passed do not exist then looks for key with dot notation in the object.

### - **fileName (optional)**:

String to specify the filename of the csv file to download.

