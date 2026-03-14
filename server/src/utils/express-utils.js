/**
 *
 * @param {import("express").RequestHandler} callback
 * @returns {import("express").RequestHandler}
 */
module.exports.requestHandler = function (callback) {
  return (req, res, next) => {
    Promise.resolve(callback(req, res, next)).catch(next);
  };
};

/**
 *
 * @param {(router: import("express").Router) => void} callback
 * @returns {import("express").Router}
 */
module.exports.createRoutes = function (callback) {
  const router = require('express').Router();
  callback(router);
  return router;
};

/**
 *
 * @param {*} data
 * @returns {{ success: boolean, data: * }}
 */
module.exports.successResponse = function (data) {
  return { success: true, data };
};

/**
 *
 * @param {string} message
 * @param {string} code
 * @returns {{ success: boolean, error: { message: string, code: string } }}
 */
module.exports.errorResponse = function (message, code = 'INTERNAL_SERVER_ERROR') {
  return {
    success: false,
    error: { message, code },
  };
};

/**
 *
 * @param {*} details
 * @param {string} message
 * @param {string} code
 * @returns {{ success: boolean, error: { message: string, code: string, details: * } }}
 */
module.exports.errorResponseWithDetails = function (details, message, code = 'INTERNAL_SERVER_ERROR') {
  return {
    success: false,
    error: { message, code, details },
  };
};
