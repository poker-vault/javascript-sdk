const bootstrappedData = window.BOOTSTRAPPED_DATA;
delete window.BOOTSTRAPPED_DATA;

module.exports.get = function (key, defaultVal) {
    if (defaultVal === undefined) {
        defaultVal = {};
    }
    return bootstrappedData[key] || defaultVal;
};
