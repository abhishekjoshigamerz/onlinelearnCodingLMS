module.exports.checkAdminAuthentication = function(req, res, next){
    if(req.session.isLoggedIn && req.session.user){
        return next();

    }

    return res.redirect('/');
}