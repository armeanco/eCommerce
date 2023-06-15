const path = require("path");

module.exports = {
    i18n: {
        locales: ['en', 'am', 'ru'],
        defaultLocale: 'en',
    },
    react: { useSuspense: false },
    localePath: path.resolve("./public/locales"),
}