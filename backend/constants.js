const COOKIE_SETTINGS = {
    REFRESH_TOKEN: {
        httpOnly: true,
        maxAge: 18000000,
    },
};

const ACCESS_TOKEN_EXPIRATION = 1800000;


module.exports = {
    COOKIE_SETTINGS,
    ACCESS_TOKEN_EXPIRATION,
}