class AppData extends Error {
  constructor(success, data, statusCode) {
    super();
    this.success = success
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default AppData;
