const authenticateUser = require('../middlewares/authenticate');
const { isAdmin, isSuperAdmin } = require('../middlewares/CheckUserRole');
const authRoutes = require('./auth/route');
const SuperAdminRoutes = require('./user/route');


module.exports = (app) => {
    app.use('/auth', authRoutes);
    app.use('/user', authenticateUser, isSuperAdmin, SuperAdminRoutes);

};
