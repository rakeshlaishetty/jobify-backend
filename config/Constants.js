export const MONGODB_SECRET = {
    USER_NAME: process.env.MONGO_USERNAME,
    PASSWORD: process.env.MONGO_PASSWORD
}

export const SERVER_CREDS = {
    PORT_NUMBER : process.env.PORT_NUMBER || 8080,
    JWT_SECRET : process.env.JWT_SECRET,
}

export const ROLES = {
    SUPERADMIN : 'superAdmin',
    ADMIN : 'Admin',
    User : 'User',
}

export const DEFAULTUSERS = {
    SUPERADMIN : process.env.DEFAULT_SUPER_ADMIN, 
    ADMIN : process.env.DEFAULT_ADMIN, 
}

export const HASH_SECRETS = {
    SALT_ROUNDS : Number(process.env.SALT_ROUNDS),
}