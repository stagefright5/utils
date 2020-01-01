// const utils = require('../lib/utilFuncs');
import utils from '../lib/utilFuncs.js';
const o = {
    qwerty: 'lfkglkfg',
    b: 'pppppppp',
    f: {
        dnc: 'ssdsdf',
        qw: {
            sgdhf: 999,
            f: {
                mnb: 'weah',
                a: 'wewdef',
            },
            a: 'asAS',
        },
        a: 'ssdsdf',
    },
    s: {
        l: {
            g: 'sfdd', trt: 'dasfdf',
            a: 'edrtert',
        },
        a: 'sdasd',
    },
    c: 'ppppopopopopo',
    lk: 'asdasd',
};

const o2 = {
    a: [
        'asdas',
        89,
    ],
    l: {
        d: {
            f: 0,
            k: [
                1,
                23,
                88,
            ],
        },
        oppp: 'asdasd',
    },
    uuu: {
        lll: [],
    },
    weq: {
        d: 'sadasd',
    },
};

let result; // because, hovering >>> typing.
result = utils.deepReplace(o, 'a', 'MothahFkinA');
console.log(result);

result = utils.deepReplace(o, 'a', 'MothahFkinA', 'all');
console.log(result);

result = utils.deepSearch(o, 'l');
console.log(result);

result = utils.getURLQParams('http://sdf.sdfs.com/llk?bagOf=fur&suma=cumlaude');
console.log(result);

result = utils.kebabFromPorC('YouCanPrepareKebabFromPork');
console.log(result);

result = utils.pOrCFromKebab('you-can-get-pork-from-kebab-too');
console.log(result);

result = utils.getObjAsString(o2, false);
console.log(result);
