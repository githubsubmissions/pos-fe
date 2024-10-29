export default class DeloopExceptions extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Deloop Exceptions';
  }
}
