export function addSpacesToNumber(number) {
    let str = String(number);
    str = str.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    return str;
}