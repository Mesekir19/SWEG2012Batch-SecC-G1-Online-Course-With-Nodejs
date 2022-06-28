module.exports = {
    isLoggedin(req, res, next) {
        if (req.session.userID) {
            
            return next();
        }
        // else if (req.session.userID=="YmaruTeam") {
        //     return next();
        // }
        else{
        return res.redirect('/auth/login');
        }
        
    },

    isLoggedinAdimn(req, res, next) {
        if (req.session.admin) {
            return next();
        }
        // else if (req.session.userID=="YmaruTeam") {
        //     return next();
        // }
        else{
        return res.redirect('/auth/login');
        }
    },

    isNotLoggedin(req, res, next) {
        if (!req.session.userID) {
            return next();
        }
        else
        return res.redirect('/');
    },

    isLoggedOut(req, res, next) {

        req.session.destroy();
        return next();
        // return res.redirect('/auth/login');
    }

}
