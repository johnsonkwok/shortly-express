var session = require('../models/session');
var Promise = require('bluebird');

const parseData = options => {
  return _.reduce(options, (parsed, value, key) => {
    parsed.string.push(`${key} = ?`);
    parsed.values.push(value);
    return parsed;
  }, { string: [], values: [] });
};

const parseCookies = (req, res, next) => {
  let cookie = req.headers.cookie || '';
  let cookies = {};
  if (cookie.length !== 0) {
    let cookieJar = cookie.split('; ');
    cookieJar.forEach((cookie) => {
      let pair = cookie.split('=');
      cookies[pair[0]] = pair[1];
    });
  }
  Object.assign(req.cookies, cookies);
  next();
}

module.exports = parseCookies;
