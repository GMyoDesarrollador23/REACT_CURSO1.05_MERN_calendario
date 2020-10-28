const moment = require("moment");

const isDate = (value, { req, location, path }) => {
   if (!value) return false;
   const facha = moment(value);
   if (facha.isValid()) return true;
   else return false;
};

module.exports = isDate;
