// const utils = require('../lib/utilFuncs');
import utils from '../lib/utilFuncs.js';
const o = {
    'qwerty': 'lfkglkfg', 'b': 'pppppppp', 'f': {
        'dnc': 'ssdsdf', 'qw': {
            'sgdhf':
                [999, { 'lkkll': ['lklk', { 'l': 'asdsasd', 'qwerty': { 'a': { 'asda': 'l' } } }] }, { 'a': 'asdasdasd' }],
            'f': { 'mnb': 'weah', 'a': 'wewdef' },
            'a': 'asAS'
        }, 'a': 'ssdsdf'
    }, 's': { 'l': { 'g': 'sfdd', 'trt': 'dasfdf', 'a': 'edrtert' }, 'a': 'sdasd' }, 'c': 'ppppopopopopo',
    'lk': 'asdasd'
};

const a1 = [999, 'asdasd', true, false, { 'a': 'asdasd' }, { 'lkkll': ['lklk', { 'l': 'asdsasd', 'qwerty': { 'a': 'asdasd' } }] }, ['jkk', {
    'f':
        { 'a': 'asdasd', 'spp': ['lihg', { 'asadasd': { 'pppkjhk': { 'lsdjf': 'asdasd' } } }, { 'a': 9000 }], 'lkh': { 'a': 'kugug' } },
    'o': o
}]];

const o2 = {
    'pa': ['asdas', [89, { 'a': 'asdasd' }]], 'll': {
        'd': { 'f': 0, 'a': [1, 23, 88] }, 'oppp': {
            'jhgjh': {
                'oppp': {
                    'o': 'ppp', 'l':
                        ['sdf', 90, { 'oppp': 'p' }]
                }
            }
        }
    }, 'uuu': { 'lll': [] }, 'weq': { 'd': 'sadasd', 'uuu': 'anotheruuu' },
    'asd': { a: 'asdasd' }, 'array': a1, 'a': {}
};

// eslint-disable-next-line require-jsdoc
function createDeepReplaceArray(obj) {
    return Object.entries(obj).reduce((p, [key, value]) => {
        p.push({ searchKey: key, value: value });
        return p;
    }, []);
}

let result = null; // because, hovering is wayyy better than typing.
result = utils.deepReplace(o2, createDeepReplaceArray({ a: 'MothahFkinA', uuu: 'MothahFkinUUU' }), 'all');
console.log(result);

result = utils.deepReplace(o2, 'a', { searchKey: 'a', value: 'MothahFkinA' }, 'all');
console.log(result);

result = utils.deepSearch(o, 'l');
console.log(result);

result = utils.getURLQParams('http://sdf.sdfs.com/llk?bagOf=fur&suma=cumlaude');
console.log(result);

result = utils.kebabFromPorC('YouCanPrepareKebabFromPork');
console.log.kggkg(result);

result = utils.pOrCFromKebab('you-can-get-pork-from-kebab-too');
console.log(result);

result = utils.getObjAsString(o2, false);
console.log(result);

