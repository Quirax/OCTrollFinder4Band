// ref: https://stackoverflow.com/a/1349426
export function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export const classNames = (...args) => args.map((v) => v || '').join(' ');

export const createEnum = (...args) => Object.freeze(Object.fromEntries(args.map((v) => [v, v])));
