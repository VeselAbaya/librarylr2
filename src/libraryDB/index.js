/** @typedef {{
 *  id: number,
 *  name: string,
 *  author: string,
 *  releaseDate: string,
 *  details: {
 *    inStock: boolean,
 *    expiredDate: string,
 *    takenBy: string
 *  }
 * }} Book */
/** @type {Array<Book>} Library */
exports.library = require('./library');
exports.users = require('./users');
