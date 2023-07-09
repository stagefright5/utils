function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [].fill(null, 0, promises.length);
        let count = 0;
        for (let promise of promises) {
            promise
                .then((r) => {
                    count++;
                    results.push(r);
                    if (count === promises.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        }
    });
}


const promise1 = Promise.resolve(3);
const promise2 = Promise.resolve(42);
const promise4 = Promise.reject(new Error('Huehue'));
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

promiseAll([promise1, promise4, promise2, promise3]).then(console.log).catch(console.error)