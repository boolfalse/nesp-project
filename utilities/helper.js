'use strict';

module.exports = {
    is_natural: (n) => {
        n = n.toString(); // force the value in case it is not
        let n1 = Math.abs(n),
            n2 = parseInt(n, 10);

        return !isNaN(n1) && n2 === n1 && n1.toString() === n;
    },
    random_string: (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result = '';

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    },
};
