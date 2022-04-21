/**
 * 函数式编程
 * 对运算过程进行抽象，相同的输入始终要得到相同的输出，用来描述数据或函数之间的映射
 * 纯函数是根据相同的输入返回相同的输出，如果函数依赖于外部的状态就无法保证输出相同，就会带来副作用
 * 函数柯里化
 */
// const BlogController = {
//     // index (posts) {
//     //     return Views.index(posts)
//     // },
//     index: Views.index
// }
//
// function checkAge (age) {
//     let min = 18
//     return age >= min
// }
// // 普通的纯函数
// function checkAges (min, age) {
//     return age  >= min
// }
// console.log(checkAge(18, 20))
// //函数柯里化
// function checkAgess (min) {
//     return function (age) {
//         return age >= min
//     }
// }
// let checkAge18 = checkAgess(18)
// console.log(checkAge18(25))
// // 箭头函数
// let checkAg = min => (age => age >= min)
//
//
// //函数组合--洋葱代码
// function compose (f, g) {
//     return function (value) {
//         return f(g(value))
//     }
// }
// //求数组中的最后一个元素
// function _reverse (arr) {
//     return arr.reverse()
// }
// function _first (arr) {
//     return arr[0]
// }
// function _toUpper (s) {
//     return s.toUpperCase()
// }
// const last = compose(_first, _reverse)
// const upper = compose(_toUpper, last)
// console.log(last([0, 5, 'ab']), upper([0, 5, 'ab']))

// const _ = require('lodash')
// // const f = _.flowRight(_.toUpper, _.first, _.reverse)
// // const f1 = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse)
// // console.log(f([0, 5, 'ab']))
// // _.split( )
// const split = _.curry((sep, str) => _.split(str, sep))
// const join = _.curry((sep, array) => _.join(array, sep))
// const log = v => {
//     console.log(v)
//     return v
// }
// const trace = _.curry((tag, v) => {
//     console.log(tag, v)
//     return v
// })
// const map = _.curry((fn, array) => _.map(array, fn))
// //问题代码
// // const s = _.flowRight(join('-'), log,  _.toLower, log, split(' '))
// // const s = _.flowRight(join('-'), log,  map(_.toLower), log, split(' '))
// const s = _.flowRight(join('-'), trace('map之后'),  map(_.toLower), trace('map之前'), split(' '))
// // console.log(_.split('NEWER SAY DIE', ' '))
//
// console.log(s('NEWER SAY DIE'))










function forEach(array, fn) {
    for (let i  = 0; i < array.length; i++) {
        fn(array[i], i)
    }
}
let arr = [1, 4, 90, 78]
// forEach(arr, (v, i) => console.log(v, i))


function filter(array, fn) {
    let arr = []
    for (let i  = 0; i < array.length; i++) {
        if (fn(array[i])) {
            arr.push(array[i])
        }
    }
    return arr
}

// console.log(arr.filter(i => i > 100))
// console.log(filter(arr, (item) => (item > 100)));

function once (fn) {
    let done = false
    return function () {
        if (!done) {
            console.log('执行啦执行啦');
            done = true
            return fn.apply(this, arguments)
        }
    }
}
let pay = once(function (money) {
    // console.log('支付了'+money);
})
pay(34)
pay(34)
pay(34)
pay(34)

function map (arr, fn) {
    let result = []
    for (let i of arr) {
        result.push(fn(i))
    }
    return result
}

// console.log(map([1, 45], (v) => Math.atan(v)));

function every (arr, fn) {
    let bool = true
    for (let i of arr) {
        // if (!fn(i)) {
        //     return false
        // }
        bool = fn(i)
        if (!bool) {
            break
        }
    }
    return bool
}
// console.log(every([1, 2, 3], (v) => v > 0))
function some (arr, fn) {
    let bool = true
    for (let i of arr) {
        bool = fn(i)
        if (bool) {
            break
        }
    }
    return bool
}
// console.log(some([1, 2, 3], (v) => v > 0))
/*
* 闭包的本质：函数在执行的时候会放到一个执行栈上，当函数执行完毕以后会从执行栈上移除，但是堆上的
* 作用域成员因为被外部引用不能释放，因此内部函数依然可以访问外部函数的成员
*
*
* */
Math.pow(4, 2)
Math.pow(45, 2)
Math.pow(49, 3)
function makePower (power) {
    return num => Math.pow(num, power)
}
let tow = makePower(2)
let three = makePower(3)
// console.log(tow(4), three(4));

/**
 * 纯函数：相同的输入永远会得到相同的输出，而且没有任何可观察的副作用
 * slice用来截取指定部分，不会改变原数组，纯函数
 * splice对数组进行操作，会改变原数组,非纯函数
 *
 */
// let arrs = [1, 2, 3, 4, 5]
// console.log(arrs.slice(0, 3))
// console.log(arrs.slice(0, 3))
//
// let arrts = [1, 2, 3, 4, 5]
// console.log(arrts.splice(0, 3))
// console.log(arrts.splice(0, 3))

const _ = require('lodash')
// const array = ['jack', 'tom', 'lucy', 'kate']
// console.log(_.first(array), _.last(array), _.toUpper(array[0]), _.reverse(array), _.each(array,(v, i) => {
//     console.log(v, '----', i);
// }), _.includes(array, 34), _.find(array, v => v === 'tom'),  _.findIndex(array, v => v === 'tom'))


function getArea (r) {
    console.log(r)
    return Math.PI * r * r

}

function getAreas (r) {
    console.log(r)
    return Math.PI * r * r * 2

}
// let getAreaWithMemory = _.memoize(getArea)

//模拟memoize
// function memoize (fn) {
    // let cache = {}
    // return function () {
    //     let key = JSON.stringify(arguments)
    //     cache[key] = cache[key] || fn.apply(fn, arguments)
    //     return cache[key]
    // }
// }
function memoize (fn) {
    let result = {}
    return function () {
        let key = JSON.stringify(arguments)
        result[key] = result[key] || fn.apply(fn, arguments)
        return result[key]
    }
}
let getAreaWithMemory = _.memoize(getArea)
let getAreaWithMemorys = memoize(getAreas)

//
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(50))
// console.log(getAreaWithMemory(1000))
//
//
// console.log(getAreaWithMemorys(4))
// console.log(getAreaWithMemorys(50))
// console.log(getAreaWithMemorys(1000))
// console.log(getAreaWithMemorys(1000))

function getSum (a, b, c) {
    return a + b + c
}
const curried = _.curry(getSum)
// console.log(curried(1, 2, 3));
// console.log(curried(1)(2)(3))
// console.log(curried(1,2)(3))
// ''.match(/\s+/g)
// ''.match(/\d+/g)
function match (reg, str) {
    return str.match(reg)
}
let sM = _.curry(function (reg, str) {
    return str.match(reg)
})
const haveSpace = sM(/\s+/g)
const haveNum = sM(/\d+/g)
console.log(haveSpace('hello word'));
console.log(haveNum('h3ello23234 word12'));

function filters (reg, arr) {
    return arr.filter(v => v.match(reg))
}

console.log(filters(/\s+/g, ['h2', 'p8 0', 'op']));
const sF = _.curry((fn, arr) => arr.filter(fn))

console.log(sF(haveSpace,['h2', 'p8 0', 'op']), '--', sF(haveSpace,['h2', 'p8 0', 'op']));
const findSpace = sF(haveSpace)
console.log(findSpace(['h2', 'p8 0', 'op']))