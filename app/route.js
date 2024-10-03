const authenticateUser = require('../middlewares/authenticate');
const { isAdmin,isAdminOrSuperAdmin, isSuperAdmin } = require('../middlewares/CheckUserRole');
const authRoutes = require('./auth/route');
const SuperAdminRoutes = require('./user/route');
const companyRoutes = require("./companyJobs/company/route")
const jobRoutes = require("./companyJobs/jobs/routes")


module.exports = (app) => {
    app.use('/auth', authRoutes);
    app.use('/user', authenticateUser, isSuperAdmin, SuperAdminRoutes);
    app.use('/company', authenticateUser, isAdminOrSuperAdmin, companyRoutes);
    app.use('/jobs', authenticateUser, isAdminOrSuperAdmin, jobRoutes);

};
