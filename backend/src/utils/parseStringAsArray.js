module.exports = function paseStringAsArray(stringAsArray) {
	return stringAsArray.split(',').map(string => string.trim())
}