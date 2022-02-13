const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/treeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        id: 1,
        name: "John",
        profession: "Student",
        birthDay: 2002,
      },
      {
        id: 2,
        name: "Mike",
        profession: "Teacher",
        birthDay: 1992,
      },
      {
        id: 3,
        name: "Jane",
        profession: "Student",
        birthDay: 1997,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
