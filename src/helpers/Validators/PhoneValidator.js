export const PhoneValidator = (str) => {
    if (str === null) return true;
    if (str && str.length === 0) return false;
    return str?.length > 8;
}