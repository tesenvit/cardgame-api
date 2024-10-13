export default (): object => ({
    port: parseInt(process.env.PORT, 10) || 5000,
    db: {
        postgres: {
            url: process.env.POSTGRES_URL || '',
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
        expire: process.env.JWT_EXPIRE || '3d',
    },
})
