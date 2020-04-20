const { ttl } = require('../CONSTS/consts');
const cacheManager = require('cache-manager');
var memoryCache = cacheManager.caching({store: 'memory', max: ttl, ttl});


module.exports.store = async function (options) {
    const results = await memoryCache.set(options.key, `${JSON.stringify(options.value)}`, { ttl: options.ttl || ttl });
    return results;
}

module.exports.get = async function (options) {
    const results = await memoryCache.get(options.key);
    if(!results) { return false; }
    return JSON.parse(results);
}