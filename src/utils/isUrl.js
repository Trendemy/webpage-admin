const isUrl = (val) =>
    typeof val === 'string' &&
    (val.startsWith('http') ||
        val.startsWith('https') ||
        val.startsWith('blob:'));

export default isUrl;
