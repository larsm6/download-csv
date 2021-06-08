import { buildURI } from "./core";

export const downloadCSV = (data, config={
  headers: [],
  separator: ',',
  enclosingCharacter: '"',
  fileName:"Csv Report",
}) => {
  const fileNameWithExtension = config.fileName + ".csv";
  const url = buildURI(data, headers, {
    seperator: config.separator,
    enclosingCharacter: config.enclosingCharacter
  });

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileNameWithExtension);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
