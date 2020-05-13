// el timeago no se si lo voy a usar para esta aplicacion

const { format } = require('timeago.js');

const helpers = {

};

helpers.format = (timestamp) => {
    return format(timestamp);
};

module.exports = helpers;