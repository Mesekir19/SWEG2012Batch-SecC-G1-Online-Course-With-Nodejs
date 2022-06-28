const router = require("express").Router();
const { body } = require("express-validator");

/* pages route */
const {
		homePage,
		signup,
		signupPage,
		login,
		loginPage,
		
		aboutusPage,
		contactusPage,
		contactus,
		courseuploadPage,
		editPage,
		edit,
		profilePage,
		updateuser,
		updateuserPage,
		courseupload,
		enrollPage,
		enroll,
		interfaceforbothPage,
		interfaceforboth,
		materialPage,
		material,
		reportpagePage,
		reportpage,
		teachPage,
		teach,
		teacherReportPage,
		teacherReport,
		videoPage,
		video,
		forgotPassword,
		sendResetPassLink,
		resetPasswordPage,
		resetPassword,
		uploadImage
		} = require("../controllers/authController");


const {isLoggedin,isLoggedinAdimn, isNotLoggedin,isLoggedOut} = require('../lib/check_authentication');
const validator = require('../lib/validation_rules');
const upload = require('../lib/courseupload111');
const name = require('../lib/name');

router.get('/', isLoggedin, homePage);
router.post('/', isLoggedin, homePage);

router.get("/auth/login", isNotLoggedin, loginPage);
router.post("/auth/login", isNotLoggedin, validator.validationRules[0], login);

router.get("/auth/signup", isNotLoggedin, signupPage);
router.post("/auth/signup", isNotLoggedin, validator.validationRules[1], signup);

router.get("/pages/aboutus", isLoggedin, aboutusPage);
router.post("/pages/aboutus", isLoggedin, aboutusPage);

router.get("/pages/contactus", isLoggedin, contactusPage);
router.post("/pages/contactus", isLoggedin, contactus);

router.get("/pages/profile", isLoggedin, profilePage);
router.post("/pages/profile", isLoggedin, uploadImage);

router.get("/pages/updateuser", isLoggedin, updateuserPage);
router.post("/pages/updateuser", isLoggedin, updateuser);

router.get("/pages/courseupload", isLoggedin, courseuploadPage);
router.post("/pages/courseupload", isLoggedin,validator.validationRules[2], courseupload);

router.get("/pages/interfaceforboth", isLoggedin, interfaceforbothPage);
router.post("/pages/interfaceforboth", isLoggedin, interfaceforboth);

router.get("/pages/material", isLoggedin, materialPage);
router.post("/pages/material", isLoggedin, material);

router.get("/pages/reportpage", isLoggedin, reportpagePage);
router.post("/pages/reportpage", isLoggedin, reportpage);

router.get("/pages/teach", isLoggedin, teachPage);
router.post("/pages/teach", isLoggedin, teach);

router.get("/pages/teacherReport", isLoggedin, teacherReportPage);
router.post("/pages/teacherReport", isLoggedin, teacherReport);

router.get("/pages/video", isLoggedin, videoPage);
router.post("/pages/video", isLoggedin, video);

router.get("/pages/enrollPage", isLoggedin, enrollPage);
router.post("/pages/enroll", isLoggedin, enroll);

router.get("/pages/edit", isLoggedinAdimn, editPage);
router.post("/pages/edit", isLoggedinAdimn, edit);

router.get('/pages/logout', 
		(req, res, next) => {
				req.session.destroy(
						(err) => {
							next(err);
							}
					);
		res.redirect('/auth/login');
	}
);

// router.get("/auth/edit", isNotLoggedin, edit);
router.get("/auth/passReset_Request", isNotLoggedin, forgotPassword);
router.post("/auth/passReset_Request", isNotLoggedin, sendResetPassLink);

router.get("/reset-password", isNotLoggedin, resetPasswordPage);
router.post("/reset-password", isNotLoggedin, validator.validationRules[3], resetPassword);

// router.get("/pages/logout", isLoggedOut, loginPage);
module.exports = router;