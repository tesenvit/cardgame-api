export default () => ({
    port: parseInt(process.env.PORT, 10) || 5000,
    db: {
        mongo: {
            uri: process.env.MONGO_URI || 'mongodb://localhost/cardgame',
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
        expire: process.env.JWT_EXPIRE || '3d',
    },
})
