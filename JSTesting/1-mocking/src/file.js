const { readFile } = require("fs/promises");
const User = require("./user");
const { error } = require("./constants");

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(path) {
    const content = await File.getFileContent(path);
    const validation = File.isValid(content);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    const users = File.parseCSVToJson(content);

    return users;
  }

  static async getFileContent(path) {
    return (await readFile(path)).toString("utf8");
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeader] = csvString.split("\n");
    const fileWithoutHeaderFiltered = fileWithoutHeader.filter(
      (line) => line !== ""
    );
    const isHeaderFields = header === options.fields.join(",");

    if (!isHeaderFields) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    const isContentLengthAccepted =
      fileWithoutHeaderFiltered.length > 0 &&
      fileWithoutHeaderFiltered.length <= options.maxLines;
    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }

  static parseCSVToJson(csvString) {
    const [, ...fileWithoutHeader] = csvString.split("\n");
    const fileWithoutHeaderFiltered = fileWithoutHeader.filter(
      (line) => line !== ""
    );
    const users = fileWithoutHeaderFiltered.map((line) => {
      const [...fields] = line.split(",");
      return new User(...fields);
    });
    console.log("Users: ", users);
    return users;
  }
}

module.exports = File;
