function run() {
    Object.defineProperty(Object.prototype, Symbol.iterator, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: function() {
            const keys = Object.keys(this);
            let index = 0;
            
            return {
                next: () => {
                    if (index < keys.length) {
                        const key = keys[index];
                        index++;
                        return { value: this[key], done: false };
                    } else {
                        return { done: true };
                    }
                }
            };
        }
    });
}
run();
const [a, b] = {a: 1, b: 2} ;
console.log(a, b); // 输出 1 2