
var randtoken = require('rand-token');
var nodemailer = require('nodemailer');
var fs=require('fs');
const url = require('url');

const path = require('path');

const csvtojson = require('csvtojson');
var Json2csvParser = require('json2csv').Parser;
const multer = require("multer");
	// var path = require('path');
    const today = new Date();
	const year = today.getFullYear();
	const month = ("0" + today.getMonth()+1).slice(-2)
	const date = ("0" + today.getDate()).slice(-2)
	const today_date = year + '-' + month +'-'+ date;


const { validationResult } = require("express-validator");
const encrypt = require('../lib/hashing');
const sendMail = require('../lib/sendEmail');
const uploads = require('../lib/image_upload');

const dbConn = require("../config/db_Connection")
const express = require('express');  
const { emit } = require('pdfkit');
const { uploadImage, uploadCSVFile } = require('../lib/fileUpload');

// const { upload } = require('../lib/courseupload111');


// const { exportMysql2CSV, importRecord } = require('../auth/recordImportExport');
// Home Page

exports.homePage = (req, res, next) => {
	var query1;
	// const {body}= req;
	var Username=req.session.userID;

		var namelenght=Username.length;
var total=namelenght+48;
var proimage;
var finalPath;
	console.log(Username);
	if (req.method == 'GET')
	{
		var myArray = new Array(/*elements1, elements2*/);
			console.log(Username);
		const {body}= req.body;
	
		
    	 query1=`SELECT * FROM teacher AS t JOIN course AS c JOIN personaldb AS p WHERE t.course_id=c.course_id AND t.username=p.username`;
			dbConn.query(query1, async(error, result)=>{
	
		if(error)
			throw error;
			if(result.length>0){
				
				
				
			var teachusername=result[0].username;
			var namelenght=teachusername.length;
			var total=namelenght+48;
			finalPath=result[0].profile;
        proimage=finalPath.substr(total);
		console.log(proimage);
			
			
			
			res.render('home', {title:'Homepage',stud : result, user:teachusername,pro:proimage});
				
	}});

	
	

			
	

		// res.render('home', {title:'Homepage', user:Username});

			
		
		}

	else if (req.method == 'POST')
	{
			


		var Username=req.session.userID;
		var namelenght=Username.length;
var total=namelenght+48;
var proimage;
var finalPath;
		
		const { body } = req.body;
		var searchcourse=body.search;
			console.log(searchcourse);
			var query1=`SELECT * FROM teacher AS t JOIN course AS c JOIN personaldb AS p ON t.course_id=c.course_id AND c.course_name="${searchcourse}" AND p.username=t.username`;
			dbConn.query(query1, async(error, result)=>{
	
		if(error)
			throw error;
			
			finalPath=result[0].profile;
        proimage=finalPath.substr(total);
		console.log(proimage);
			console.log(experience);
			console.log(TeacherName);
            var profile="Pages/"+newone;
		const msg = req.flash ('success')
		res.render('home', {title:'Homepage',data : result, user:Username,  pro:proimage, user:Username});
	});
		//fulltext search 
		// if (req.session.level == 1){
// 			query1 = `SELECT * FROM course`;
// dbConn.query(query1, async (error, rows)=>{
	
// 		if(error)
// 			throw error;

// 		const msg = req.flash ('success')
// 		//res.render('./', {title:'Homepage',action:'list',data : rows, user:Username});
// 	});	
			
		// }
		// else{
		// 	query1 = `SELECT * FROM courses as CO LEFT JOIN users as US ON CO.user_id = US.id` + 
		// 					 ` WHERE US.id = "${req.session.userID}"` +
		// 					 ` AND MATCH (code, title, description)` +
		// 					` AGAINST ("${body.search_Key}" IN NATURAL LANGUAGE MODE)`;			
		// // }
		
		//Alternative: search multiple columns with "concat & like" operators 
		/*
		* `SELECT * FROM courses WHERE concat (code, title, description)` +
		*		` like "%${body.search_Key}%"`;		
		*/
	}
// 	query1 = `SELECT * FROM course`;
//     dbConn.query(query1, async (error, rows)=>{
		
// 		if(error)
// 		{
// 			console.log (error);
// 			throw error;
// 		}

// //	res.render('home', {title:'Homepage',action:'list',data : rows});
// 	});
}

exports.aboutusPage = (req, res, next) => {
    res.render("pages/aboutus");
};
exports.contactusPage = (req, res, next) => {
    res.render("pages/contactus");
};

exports.contactus = (req, res, next) => {

		const { body } = req;
		const email = body.email;
		const description = body.text;
		
		var query2 = 'SELECT * FROM personaldb WHERE email ="' + email + '"';
		dbConn.query(query2, function(err, result) {
			if (err)
				throw err;
			
			if (result.length > 0) {
			
				const sent =  sendMail.sendingMail(email, description);
				
				if (sent != '0') 
				{
					
	
					
	 			res.render('pages/contactus', 
							{msg: 'email is sent'});
	 			} 
				else {		
					res.render('pages/contactus', 
								{error: 'Something goes to wrong. Please try again'})
				}
			} 
			else {
				console.log('2');			
				res.render('pages/contactus', 
						{error: 'The Email is not registered with us'})				
			}		
		});
	}

exports.profilePage = (req, res, next) => {
	 var name=req.session.userID;

var namelenght=name.length;
var total=namelenght+48;
var proimage;
var finalPath;
console.log('proimage');
	var emails=req.session.email;
	console.log(emails);
	query1 = `SELECT * FROM personaldb where email="${req.session.email}"`;
			dbConn.query(query1, (error, result)=>{
	
		if(error)
			throw error;

			finalPath=result[0].profile;
        proimage=finalPath.substr(total);
		console.log(proimage);
        
		const msg = req.flash ('success');
		
		res.render('pages/profile', {title:'profile',action:'list', data : result, pro:proimage, user:name});
	});	
		
};

exports.profile = (req, res, next) => {
   var name=req.session.userID;

var namelenght=name.length;
var total=namelenght+48;
var proimage;
var finalPath;
console.log('proimage');
	
		// if (req.session.level == 1)
			query1 = 'SELECT * FROM `personaledb` where email=(?))';
			dbConn.query(query1, emails, async (error, rows)=>{
	
		if(error)
			throw error;
		finalPath=rows[0].profile;
        proimage=finalPath.substr(total);
		console.log(proimage);
		// const msg = req.flash ('success')
		res.render('pages/profile', {title:'Homepage',action:'list',data : rows,});
	});	
		
		
};



// Image uplaod middleware
exports.uploadImage = (req, res, next) => {
var filePath3 = "C:/Users/HP/Desktop/YmaruCourse/public/profile/"+req.session.userID;
var name=req.session.userID;

var namelenght=name.length;
var total=namelenght+48;

if (!fs.existsSync(filePath3)){
    fs.mkdirSync(filePath3, { recursive: true });
}

		var finalPath;
		var fileName;
		var filePath;
		var proimage;
	
	const fileStorage = multer.diskStorage({
		destination:(req, file, callBack) => {
						
						if (path.extname(file.originalname) == '.jpg' || path.extname(file.originalname) == '.jpeg'|| path.extname(file.originalname) == '.png')
							filePath = filePath3;
						
						callBack(null, filePath)},
						
		filename:(req, file, callBack) => {
					
					// if (path.extname(file.originalname) == '.jpg' || path.extname(file.originalname) == '.jpeg'|| path.extname(file.originalname) == '.png')
						fileName = file.originalname;
				

						finalPath=filePath+'/'+fileName + '-' + today_date + path.extname(file.originalname);
						
					callBack(null, fileName + '-' + today_date + path.extname(file.originalname))
				}
	});


	const upload = multer({ storage: fileStorage,}).single("image");
	upload(req, res, (err) => {
    if(err) {
      res.status(400).send("Something went wrong!");
    }
    else{
  var query2 = `UPDATE personaldb SET profile = "${finalPath}" WHERE email = "${req.session.email}"`;
		dbConn.query(query2, function(error, result){
			if(error)
			{
				//Image is path is not added to database. Remove Uplaoded file.
				// and send error to the client
				return res.send(error);
			}
			
	
				return res.redirect("profile");
		});
	}
	});

	

}

exports.updateuserPage = (req, res, next) => {
    res.render("pages/updateuser");
};

exports.updateuser = async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('pages/courseupload', {error: errors.array()[0].msg});
    }


    try {
		

			//const hashPass = await bcrypt.hash(body._password, 12);
var query3 = "update `personaldb` set fullname= ?, phone= ? where email=?";
			dbConn.query(query3, [body.fullname,body.phone, body.email], 
						 (error, rows)=>{
							if(error)
							{
								console.log (error);
								throw error;
							}
							
							if (rows.affectedRows !== 1) {
								return res.render('pages/updateuser', 
													{error: 'Your update has failed.'});
							}

							res.render("pages/updateuser",
										{msg: 'You have successfully updated your profile!'});
						 });		
		
    } catch (e) {
        next(e);
    }
};

exports.courseuploadPage = (req, res, next) => {
	
	console.log(req.session.userID);
   var query1=`SELECT * FROM teacher WHERE username="${req.session.userID}"`;
			dbConn.query(query1, async(error, result)=>{
	
		if(error){
			throw error;
		}
			else if(!result.length){
				console.log('herr1');
				return res.redirect("/pages/teach");
			}else if(result){
				console.log('herr2');
				res.render("pages/courseupload");
			}
			
		
			// res.render('home', {title:'Homepage',stud : result});

	});
	
};

exports.courseupload = (req, res, next) => {

var filePath1 = "C:/Users/HP/Desktop/YmaruCourse/public/video/"+req.session.userID;
var filePath2 = "C:/Users/HP/Desktop/YmaruCourse/public/pdf/"+req.session.userID;
// var filePath3 = "C:/Users/HP/Desktop/YmaruCourse/public/profile/"+req.session.userID;

if (!fs.existsSync(filePath1)|| !fs.existsSync(filePath2)){
    fs.mkdirSync(filePath1, { recursive: true });
    fs.mkdirSync(filePath2, { recursive: true });
}
	var finalPath;
	var teacher_id;
	var course_id;
    var coursename;
	var description;
	var TeachUsername;

	const filedFilter = (req, file, callback) => {
		if (file.mimetype.startsWith("video") && file.originalname.match(/\.(mp4)$/)||path.extname(file.originalname)== '.mp4')   {
		description=req.body.discription;
            var sql=`SELECT course_id,course_name FROM course WHERE course_name= "${req.body.teaching}"`;
            dbConn.query(sql, function (err, result, fields) {
                if (err) throw err;
                else {
                    numRows = result.length;
                    if (numRows > 0) {
              
                     req.session.course_id =result[0].course_id;
                     req.session.coursename=result[0].course_name;
                
               sql='SELECT teacher_id,course_id,username FROM teacher where username= '+req.session.userID+' and course_id= '+course_id+'';
            
            dbConn.query(sql, function (err, result, fields) {
                if (err) throw err;
                else {
                    numRows = result.length;
                    if (numRows > 0) {
                
                     req.session.teacher_id= result[0].teacher_id;
					 req.session.TeachUsername=result[0].username;
                
            
            }
            
            }
            });
            }
            
            }
            })
        
           
				
		callback(null, true);}
		else 
		{			
			callback(null, false);
		}
	}
	teacher_id=req.session.teacher_id;
	
	
	const fileStorage = multer.diskStorage({
		destination:(req, file, callBack) => {
						let filePath;
						if (path.extname(file.originalname) == '.pdf')
							filePath = filePath2;
						else 
							filePath = filePath1;
						callBack(null, filePath)},
						
		filename:(req, file, callBack) => {
					var fileName;
					if (path.extname(file.originalname) == '.pdf')
						fileName = file.originalname;
					else
						fileName = file.originalname;

						finalPath=fileName + '-' + today_date + path.extname(file.originalname);
					sql='INSERT INTO video (teacher_id,course_id,username,video,description) VALUES ('+req.session.teacher_id+','+req.session.course_id+','+req.session.TeachUsername+','+finalPath+','+description+')';
			dbConn.query(sql, (err, result) => {
				if (err) throw err;
				// message = "<div class='alert alert-success' role='alert'>file inserted to database successfully.</div>";
			});	
					callBack(null, fileName + '-' + today_date + path.extname(file.originalname))
				}
	});


	const upload = multer({ storage: fileStorage,fileFilter:filedFilter}).single("upfile");
	upload(req, res, (err) => {
    if(err) {
      res.status(400).send("Something went wrong!");
    }

	});


console.log("iam here1");

  const errors = validationResult(req);
    const { body } = req;
	console.log(body.teaching);

    if (!errors.isEmpty()) {
		console.log("iam here1.5");
        return res.render('pages/courseupload', {error: errors.array()[0].msg});
    }
	try{
		 console.log("iam here2");
	var course_id='';
	var coursename='';
	var TeachUsername='';
	var teacher_id='';
		
		var query2 = `SELECT course_id,course_name FROM course where course_name="${body.teaching}"`;
		dbConn.query(query2, function(err, result) {
			if (err)
				throw err;

				else if (result.length > 0) {
        
        course_id=result[0].course_id;
        coursename=result[0].course_name;
		console.log("iam here3");
        
    }else{
        
        swal({
  title: 'Oops..',
  text: 'No such course name is availabile',
  icon: 'error',
}).then((willDelete) => {
  if (willDelete) {document.location.href = 'courseupload';}});


        
    }
console.log("iam here3.5");
var query2 = `SELECT teacher_id,course_id,username FROM teacher where username="${req.session.userID}" and course_id="${course_id}"`;
		dbConn.query(query2, function(err, result) {
	


    if (result.length > 0) {
        TeachUsername=result[0].username;
        teacher_id=result[0].teacher_id;
		console.log("iam here4");

    }else{
        
        swal({
  title: 'Oops..',
  text: 'You are not currently teaching the course you mentioned above',
  icon: 'error',
})
.then((willDelete) => {
  if (willDelete) {document.location.href = 'courseupload';}});

        
    }
	});
			
          
		   
				
		});

	}catch (e) {
        next(e);
    }


	}
	

exports.interfaceforbothPage = (req, res, next) => {
    res.render("pages/interfaceforboth");
};
exports.interfaceforboth = (req, res, next) => {
    res.render("pages/interfaceforboth");
};


exports.materialPage = (req, res, next) => {
	var query1;
	var name=req.session.userID;
var namelenght=name.length;
var total=namelenght+48;
var material;
var finalPath;
	query1=`SELECT * FROM material WHERE username="${req.session.userID}"`;
	dbConn.query(query1, function (err, results, fields) {
		if (err) 
			throw err;
     course_id=results[0].course_id;
		
	 
finalPath=results[0].material;
        material=finalPath.substr(total);
		console.log(video);

    res.render("pages/material", {data:results});
	});
    
};
exports.material = (req, res, next) => {
    res.render("pages/material");
};


exports.reportpagePage = (req, res, next) => {
	var query1;
	// const {body}= req;
	var Username=req.session.userID;
	console.log(Username);
	if (req.method == 'GET')
	{
		
			console.log(Username);
		
			var query1=`SELECT * FROM teacher AS t JOIN course AS c WHERE t.course_id=c.course_id ORDER BY c.catalogue ASC`;
			// var query1=`SELECT * FROM course ORDER BY catalogue ASC`;
			dbConn.query(query1, async(error, result)=>{
		console.log(Username);
		if(error)
			throw error;
			var i=0;
			// if(result.length>0){
			for(i=0; i<result.length;i++){
			var catagory=result[i].catalogue;
            var course=result[i].course_id;
			var course_name=result[i].course_name;
            	console.log(Username);
			console.log(catagory);
			console.log(course);

			res.render('pages/reportpage', {title:'Reportpage',dispcourse : result, user:Username});


			}
	
	});

	
}


};
exports.reportpage = (req, res, next) => {
    // res.render("pages/reportpage");
	const {body}=req;

	if(body.sortby=='catalogue'){
var query1=`SELECT * FROM teacher AS t JOIN course AS c WHERE t.course_id=c.course_id ORDER BY c.catalogue ASC`;
			// var query1=`SELECT * FROM course ORDER BY catalogue ASC`;
			dbConn.query(query1, async(error, result)=>{
	
		if(error)
			throw error;
			var i=0;
			// if(result.length>0){
	
			

			res.render('pages/reportpage', {title:'Reportpage',dispcourse : result});
			
	
	});
	} else if(body.sortby=='course'){
		var query1=`SELECT * FROM teacher AS t JOIN course AS c WHERE t.course_id=c.course_id ORDER BY c.course_name ASC`;
			// var query1=`SELECT * FROM course ORDER BY catalogue ASC`;
			dbConn.query(query1, async(error, result)=>{
	
		if(error)
			throw error;
			var i=0;
			// if(result.length>0){
			
			

			res.render('pages/reportpage', {title:'Reportpage',dispcourse : result});
			
	
	});
	}else if(body.sortby=='teacher'){
		var query1=`SELECT * FROM teacher AS t JOIN course AS c WHERE t.course_id=c.course_id ORDER BY t.username ASC`;
			// var query1=`SELECT * FROM course ORDER BY catalogue ASC`;
			dbConn.query(query1, async(error, result)=>{
		
		if(error)
			throw error;
			var i=0;
			// if(result.length>0){
			
			

			res.render('pages/reportpage', {title:'Reportpage',dispcourse : result});
			
	
	});
		
	}else if(body.sortby=='publish_year'){
		var query1=`SELECT * FROM teacher AS t JOIN course AS c WHERE t.course_id=c.course_id ORDER BY c.publish_year ASC`;
			// var query1=`SELECT * FROM course ORDER BY catalogue ASC`;
			dbConn.query(query1, async(error, result)=>{

		if(error)
			throw error;
			var i=0;
			// if(result.length>0){
		
			

			res.render('pages/reportpage', {title:'Reportpage',dispcourse : result});
			
	
	});
	}
};


exports.teachPage = (req, res, next) => {
    res.render("pages/teach");
};
exports.teach = (req, res, next) => {
    res.render("pages/teach");
};


exports.teacherReportPage = (req, res, next) => {
	var query1;
	var course_id;
	query1=`SELECT * FROM teacher WHERE username="${req.session.userID}"`;
	dbConn.query(query1, function (err, results, fields) {
		if (err) 
			throw err;
     course_id=results[0].course_id;
		const jsonCoursesRecord = JSON.parse(JSON.stringify(results));
		 
  });
	query1=`SELECT gender, count(*) as number FROM personaldb AS p JOIN student AS s WHERE s.course_id = "${course_id}" AND s.username=p.username GROUP BY p.gender`;
    dbConn.query(query1, function (err, results, fields) {
		if (err) 
			throw err;
   
		const jsonCoursesRecord = JSON.parse(JSON.stringify(results));
	res.render("pages/teacherReport", {json:jsonCoursesRecord});	 
  });
	// res.render("pages/teacherReport");
};
exports.teacherReport = (req, res, next) => {
    // res.render("pages/teacherReport");
};


exports.videoPage = (req, res, next) => {
	var query1;
	 var name=req.session.userID;

var namelenght=name.length;
var total=namelenght+48;
var video;
var finalPath;

	query1=`SELECT * FROM video WHERE username="${req.session.userID}"`;
	dbConn.query(query1, function (err, results, fields) {
		if (err) 
			throw err;
 
		
	
finalPath=results[0].video;
        video=finalPath.substr(total);
		console.log(video);
    res.render("pages/video", {data:results,vid:video});
	});
};
exports.video = (req, res, next) => {
    res.render("pages/video");
};


exports.enrollPage = (req, res, next) => {
    res.render("pages/enroll");
};
exports.enroll = (req, res, next) => {
    res.render("pages/enroll");
};


exports.editPage = (req, res, next) => {
    res.render("pages/edit");
};
exports.edit = (req, res, next) => {

	
	const { body } = req;
if(body.course){
	if(body.searchby=='course_id'){
	console.log('iddd'+body.course);
		// body.course

var query1=`SELECT * FROM teacher AS t JOIN personaldb AS p JOIN course AS c WHERE t.course_id="${body.course}" and t.username=p.username ORDER BY c.course_id ASC`;
			// var query1=`SELECT * FROM course ORDER BY catalogue ASC`;
			dbConn.query(query1, async(error, result)=>{
	
		if(error)
			throw error;
			
			// if(result.length>0){
	
			console.log('iddd final'+body.course);

			res.render('pages/edit', {title:'editpage',data : result});
			
	
	});
	} else if(body.searchby=='course_title'){
		console.log('name'+body.course);
		var query1=`SELECT * FROM course WHERE course_name="${body.course}"`;
			// var query1=`SELECT * FROM course ORDER BY catalogue ASC`;
			var searchCourseID;
			dbConn.query(query1, async(error, result)=>{
	
		if(error)
			throw error;
			var i=0;
			if(result.length>0){
			searchCourseID=result[0].course_id;	
			console.log(searchCourseID);
		 query1=`SELECT * FROM teacher AS t JOIN personaldb AS p JOIN course AS c WHERE t.course_id="${searchCourseID}" and t.username=p.username ORDER BY c.course_name ASC`;
			// var query1=`SELECT * FROM course ORDER BY catalogue ASC`;
			dbConn.query(query1, async(error, result)=>{
	
		if(error)
			throw error;
			var i=0;
			// if(result.length>0){
			
			console.log('namefinal'+body.course);
				console.log('namefinal '+result[0].course_name);
				console.log('namefinal '+result[0].fullname);
				console.log('namefinal '+result[0].experience);
			res.render('pages/edit', {title:'editpage', data : result});
			
	
	});
}
	
			// res.render('pages/reportpage', {title:'Reportpage',dispdata : result});
				
	
	});
}
	
}

	if(body.pdf){
		let query = "SELECT * FROM course";
	dbConn.query(query, function (err, results, fields) {
		if (err) 
			throw err;
     
		const jsonCoursesRecord = JSON.parse(JSON.stringify(results));
  const stream=res.writeHead(200,{
        'Content-Type':'application/pdf',
        'Content-Disposition': 'attachment;filename=invoice.pdf'
    });
    buildPDF(
        (chunk)=> stream.write(chunk),
        ()=> stream.end()
    );

	function buildPDF(dataCallback, endCallback){
    const doc=new PDFDocument();
    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    doc.fontSize(25).text(jsonCoursesRecord);
    doc.end;
}
	
	});
		// const jsonCoursesRecord = JSON.parse(JSON.stringify(results));
    return res.redirect("/pages/edit");
	}


	// const upload = exportMysql2CSV.single('select2')
	var searched=body.select2;
	console.log(searched);
	if(body.select2 == "course"){
	let query = "SELECT * FROM course";
	dbConn.query(query, function (err, results, fields) {
		if (err) 
			throw err;
     
		const jsonCoursesRecord = JSON.parse(JSON.stringify(results));
		 
		// -> Convert JSON to CSV data
		const csvFields = ['course_id','course_name','catalogue','publish_year']
								 
		const json2csvParser = new Json2csvParser({ csvFields });
		const csv = json2csvParser.parse(jsonCoursesRecord);
 
		res.setHeader("Content-Type", "text/csv");
		res.setHeader("Content-Disposition", "attachment; filename=course.csv");
		res.status(200).end(csv);
  });
	}
	else if(body.select2 == "material"){
	let query = "SELECT * FROM material";
	dbConn.query(query, function (err, results, fields) {
		if (err) 
			throw err;
     
		const jsonCoursesRecord = JSON.parse(JSON.stringify(results));
		 
		// -> Convert JSON to CSV data
		const csvFields = ['material_id','teacher_id','course_id','username','material','description']
								 
		const json2csvParser = new Json2csvParser({ csvFields });
		const csv = json2csvParser.parse(jsonCoursesRecord);
 
		res.setHeader("Content-Type", "text/csv");
		res.setHeader("Content-Disposition", "attachment; filename=material.csv");
		res.status(200).end(csv);
  });
	}
	else if(body.select2 == "personaldb"){
	let query = "SELECT * FROM personaldb";
	dbConn.query(query, function (err, results, fields) {
		if (err) 
			throw err;
     
		const jsonCoursesRecord = JSON.parse(JSON.stringify(results));
		 
		// -> Convert JSON to CSV data
		const csvFields = ['username','fullname','email','gender','password','country','phone','birthdate','age','VKey','verify','profile','created_date']
								 
		const json2csvParser = new Json2csvParser({ csvFields });
		const csv = json2csvParser.parse(jsonCoursesRecord);
 
		res.setHeader("Content-Type", "text/csv");
		res.setHeader("Content-Disposition", "attachment; filename=personaldb.csv");
		res.status(200).end(csv);
  });
	}
	else if(body.select2 == "student"){
	let query = "SELECT * FROM student";
	dbConn.query(query, function (err, results, fields) {
		if (err) 
			throw err;
     
		const jsonCoursesRecord = JSON.parse(JSON.stringify(results));
		 
		// -> Convert JSON to CSV data
		const csvFields = ['student_id','course_id','teacher_id','catalogue','username','enrollDate']
								 
		const json2csvParser = new Json2csvParser({ csvFields });
		const csv = json2csvParser.parse(jsonCoursesRecord);
 
		res.setHeader("Content-Type", "text/csv");
		res.setHeader("Content-Disposition", "attachment; filename=student.csv");
		res.status(200).end(csv);
  });
	}
	else if(body.select2 == "teacher"){
	let query = "SELECT * FROM teacher";
	dbConn.query(query, function (err, results, fields) {
		if (err) 
			throw err;
     
		const jsonCoursesRecord = JSON.parse(JSON.stringify(results));
		 
		// -> Convert JSON to CSV data
		const csvFields = ['teacher_id','course_id','username','experience','payment','document']
								 
		const json2csvParser = new Json2csvParser({ csvFields });
		const csv = json2csvParser.parse(jsonCoursesRecord);
 
		res.setHeader("Content-Type", "text/csv");
		res.setHeader("Content-Disposition", "attachment; filename=teachers.csv");
		res.status(200).end(csv);
  });
	}
	else if(body.select2 == "video"){
	let query = "SELECT * FROM video";
	dbConn.query(query, function (err, results, fields) {
		if (err) 
			throw err;
     
		const jsonCoursesRecord = JSON.parse(JSON.stringify(results));
		 
		// -> Convert JSON to CSV data
		const csvFields = ['video_id','teacher_id','course_id','username','video','description']
								 
		const json2csvParser = new Json2csvParser({ csvFields });
		const csv = json2csvParser.parse(jsonCoursesRecord);
 
		res.setHeader("Content-Type", "text/csv");
		res.setHeader("Content-Disposition", "attachment; filename=video.csv");
		res.status(200).end(csv);
  });
	}
	



	console.log(req.session.userID)
	const CSVFile = uploadCSVFile.single('file')
	CSVFile(req, res, function(err) {
		if (req.file == undefined || err) {
			req.flash("error", "Error: No file/wrong file selected! Please select CSV file!")
			req.flash ("title", "Import Records")
			return res.redirect("./edit");
		}
	filePath = 'public/csvFiles/' + req.file.filename
		csvtojson().fromFile(filePath).then(source => {
	if(body.select == "course"){
					// Fetching the data from each row and inserting to the table "courses"
			for (var i = 0; i < source.length; i++) {
				var course_id = source[i]["course_id"],
					course_name = source[i]["course_name"],
					catalogue = source[i]["catalogue"],
					publish_year = source[i]["publish_year"]
					
				var records = [
							course_id, course_name, 
							catalogue, publish_year
						];
				//Import the record to Mysql database, courses table
				let query3 = `INSERT INTO course (course_id, course_name, catalogue, publish_year )  ` +
											`VALUES (?, ?, ?, ?)`;
															
				dbConn.query(query3, records, (error, results, fields) => {
					if (error)
					{
						console.log(error);
						fs.unlinkSync(filePath)
						error = req.flash("error", "Something wrong! Records are not imported")
						return res.redirect("/pages/edit");
					}		
				});
			}
				}
				else if(body.select == "material"){
					// Fetching the data from each row and inserting to the table "courses"
			for (var i = 0; i < source.length; i++) {
				var material_id = source[i]["material_id"],
					teacher_id = source[i]["teacher_id"],
					course_id = source[i]["course_id"],
					username = source[i]["username"]
					material = source[i]["material"]
					description = source[i]["description"]
					
				var records = [
							material_id, teacher_id, 
							course_id, category, 
							username, material, 
							description
						];
				//Import the record to Mysql database, courses table
				let query3 = `INSERT INTO material (material_id, teacher_id, course_id, username,material,description ) ` +
											`VALUES (?, ?, ?, ?, ?, ?)`;
															
				dbConn.query(query3, records, (error, results, fields) => {
					if (error)
					{
						console.log(error);
						fs.unlinkSync(filePath)
						error = req.flash("error", "Something wrong! Records are not imported")
						return res.redirect("/pages/edit");
					}		
				});
			}
				}
				else if(body.select == "personaldb"){
					// Fetching the data from each row and inserting to the table "courses"
			for (var i = 0; i < source.length; i++) {
				var username = source[i]["username"],
					fullname = source[i]["fullname"],
					email = source[i]["email"],
					gender = source[i]["gender"]
					password = source[i]["password"]
					country = source[i]["country"]
					phone = source[i]["phone"]
					birthdate = source[i]["birthdate"]
					age = source[i]["age"]
					VKey = source[i]["VKey"]
					verify = source[i]["verify"]
					profile = source[i]["profile"]
					created_date = source[i]["created_date"]
					
				var records = [
							username, fullname, 
							email, gender, 
							password, country, 
							phone, birthdate, age,
							VKey,verify,
							profile,created_date
						];
				//Import the record to Mysql database, courses table
				let query3 = `INSERT INTO personaldb (username, fullname, email,gender,password,country,phone,birthdate,age,VKey,verify,profile,created_date )` +
											`VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
															
				dbConn.query(query3, records, (error, results, fields) => {
					if (error)
					{
						console.log(error);
						fs.unlinkSync(filePath)
						error = req.flash("error", "Something wrong! Records are not imported")
						return res.redirect("/pages/edit");
					}		
				});
			}
				}
				else if(body.select == "student"){
					// Fetching the data from each row and inserting to the table "courses"
			for (var i = 0; i < source.length; i++) {
				var student_id = source[i]["student_id"],
					course_id = source[i]["course_id"],
					teacher_id = source[i]["teacher_id"]
					catalogue = source[i]["catalogue"]
					username = source[i]["username"]
					enrollDate = source[i]["enrollDate"]
					
					
				var records = [
							student_id, course_id, teacher_id,catalogue, 
							username,enrollDate
						];
				//Import the record to Mysql database, courses table
				let query3 = `INSERT INTO student (student_id, course_id, teacher_id,catalogue,username,enrollDate) ` +
											`VALUES (?, ?, ?, ?, ?, ?)`;
															
				dbConn.query(query3, records, (error, results, fields) => {
					if (error)
					{
						console.log(error);
						fs.unlinkSync(filePath)
						error = req.flash("error", "Something wrong! Records are not imported")
						return res.redirect("/pages/edit");
					}		
				});
			}
				}
				else if(body.select == "teacher"){
					// Fetching the data from each row and inserting to the table "courses"
			for (var i = 0; i < source.length; i++) {
				var teacher_id = source[i]["teacher_id"],
					course_id = source[i]["course_id"],
					username = source[i]["username"],
					experience = source[i]["experience"]
					payment = source[i]["payment"]
					document = source[i]["document"]
					
				var records = [
							teacher_id, course_id, 
							username, experience, 
							payment, document
						];
				//Import the record to Mysql database, courses table
				let query3 = `INSERT INTO teacher (teacher_id, course_id,username,experience,payment,document) ` +
											`VALUES (?, ?, ?, ?, ?, ?)`;
															
				dbConn.query(query3, records, (error, results, fields) => {
					if (error)
					{
						console.log(error);
						fs.unlinkSync(filePath)
						error = req.flash("error", "Something wrong! Records are not imported")
						return res.redirect("/pages/edit");
					}		
				});
			}
				}
				
				else if(body.select == "video"){
					// Fetching the data from each row and inserting to the table "courses"
			for (var i = 0; i < source.length; i++) {
				var video_id = source[i]["video_id"],
					teacher_id = source[i]["teacher_id"],
					course_id = source[i]["course_id"],
					username = source[i]["username"]
					video = source[i]["video"]
					description = source[i]["description"]
					
					
				var records = [
							video_id,teacher_id,course_id,username,video,description
						];
				//Import the record to Mysql database, courses table
				let query3 = `INSERT INTO video (video_id, teacher_id, course_id, username,video,description)`+
											`VALUES (?, ?, ?, ?, ?, ?)`;
															
				dbConn.query(query3, records, (error, results, fields) => {
					if (error)
					{
						console.log(error);
						fs.unlinkSync(filePath)
						error = req.flash("error", "Something wrong! Records are not imported")
						return res.redirect("/pages/edit");
					}		
				});
			}
				}
		
			
			fs.unlinkSync(filePath)
			req.flash("msg", "Records are imported successfully! \r\n Go back to Home page & check it.")
			return res.redirect("/pages/edit");
			
				});

				});
   
};


// Register Page
exports.signupPage = (req, res, next) => {
    res.render("auth/signup");
};

// User Registration
exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('auth/signup', {error: errors.array()[0].msg});
    }


    try {
		var query2 = "SELECT * FROM `personaldb` WHERE `email`=?";
        dbConn.query(query2, [body.email], async(error, row)=>{
			if (error)
			{
				console.log(error)
				throw error
			}
			
			if (row.length >= 1) {
				return res.render('auth/signup', {error: 'This email already in use.'});
			}

					const { body } = req;
		
		const token = randtoken.generate(20);
var data = token;
				
				
		

			//const hashPass = await bcrypt.hash(body._password, 12);
			const hashPass = await encrypt.encryptPassword(body.password);
			var query3 = "INSERT INTO `personaldb`(`username`,`fullname`,`email`,`gender`,`password`,`country`,`phone`,`birthdate`,`VKey`,`created_date`) VALUES(?,?,?,?,?,?,?,?,?,?)";
			dbConn.query(query3, [body.username,body.fullname, body.email, body.gender, hashPass,body.country,body.phone,body.birthdate,data,body.created_date], 
						 (error, rows)=>{
							if(error)
							{
								console.log (error);
								throw error;
							}
							
							if (rows.affectedRows !== 1) {
								return res.render('auth/signup', 
													{error: 'Your registration has failed.'});
							}

							// res.render("auth/signup",
							// 			{msg: 'You have successfully registered. You can Login now!'});
						const email = body.email;
		console.log(email);
				console.log(token);
							const sent =  sendMail.verifyMail(body.email, token);
										if (sent != '0') 
				{
					
					
					
	 			res.render('auth/signup', 
							{msg: 'login link has been sent to your email address'});
	 			} 
				else {		
					res.render('auth/signup', 
								{error: 'Something goes to wrong. Please try again'})
				}
									});		
		});
    } catch (e) {
        next(e);
    }
};

// Login Page
exports.loginPage = (req, res, next) => {
    res.render("auth/login");
};

// Login User
exports.login = (req, res, next) => {

    const errors = validationResult(req);
	const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('auth/login', {error: errors.array()[0].msg
        });
    }

    try {
		if(body.email!=="ymaruatadmin@gmail.com"){
		var query4 = 'SELECT * FROM `personaldb` WHERE `email`=?';
		
		dbConn.query(query4, [body.email], async function(error, row){
			if(error)
				throw error; 
			else
			{

				if (row.length != 1) {
					return res.render('auth/login', {
						error: 'Invalid email address or password.'
					});
				}
			
				//const checkPass = await bcrypt.compare(body.password, row[0].password);
				var checkPass = await encrypt.matchPassword(body.password, row[0].password);
	
				if (checkPass === true) {
					req.session.userID = row[0].username;
					req.session.email = row[0].email;
					
					// req.session.level = row[0].level;
					return res.redirect('../');
				}

				res.render('auth/login', {error: 'Invalid email address or password.'});
				
			
	}
		
	}
); }else{
		var query4 = 'SELECT * FROM `admin1` WHERE `email`=?';
		
		dbConn.query(query4, [body.email], async function(error, row){
			if(error)
				throw error; 
			else
			{

				if (row.length != 1) {
					return res.render('auth/login', {
						error: 'Invalid email address or password.'
					});
				}
			
				//const checkPass = await bcrypt.compare(body.password, row[0].password);
				var checkPass = await encrypt.matchPassword(body.password, row[0].password);
	
				if (checkPass === true) {
					req.session.admin = row[0].username;
					req.session.email = row[0].email;
					
					
					// req.session.level = row[0].level;
					return res.redirect('/pages/edit');
				}

				res.render('auth/login', {error: 'Invalid email address or password.'});
				
			
	
		// res.render('auth/login', {error: 'please Verify Your account'});
	
	
}});

}
}
    catch (e) {
        next(e);
    }
}

// Password reset link request Page
exports.forgotPassword = (req, res, next) => {
    res.render("auth/passReset_Request");
};

/* send reset password link in email */
exports.sendResetPassLink = (req, res, next) => {

		const { body } = req;
		const email = body.email;
		
		var query2 = 'SELECT * FROM personaldb WHERE email ="' + email + '"';
		dbConn.query(query2, function(err, result) {
			if (err)
				throw err;
			
			if (result.length > 0) {
				const token = randtoken.generate(20);
				const sent =  sendMail.sendingMail(email, token);
				
				if (sent != '0') 
				{
					var data = {token: token}
					var query3 = 'UPDATE personaldb SET ? WHERE email ="' + email + '"';
					dbConn.query(query3, data, function(err, result) {
						if(err) 
							throw err 
					})
					
	 			res.render('auth/passReset_Request', 
							{msg: 'The reset password link has been sent to your email address'});
	 			} 
				else {		
					res.render('auth/passReset_Request', 
								{error: 'Something goes to wrong. Please try again'})
				}
			} 
			else {
				console.log('2');			
				res.render('auth/passReset_Request', 
						{error: 'The Email is not registered with us'})				
			}		
		});
	}

// Password reset Page
exports.resetPasswordPage = (req, res, next) => {
    res.render("auth/reset_password", {token: req.query.token});
}

/* update password to database */
exports.resetPassword = (req, res, next) => {
	
	const errors = validationResult(req);
	const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('auth/reset_password', 
						   {token: token, error: errors.array()[0].msg});
		}
	const queryObject = url.parse(req.url, true).query.token;
	var token = queryObject;
	console.log(token);
    var query5 = 'SELECT * FROM personaldb WHERE VKey ="' + token + '"';
    dbConn.query(query5, async(err, result) =>{
        if (err) 
			throw err;

        if (result.length > 0) {                  
            const hashPass = await encrypt.encryptPassword(body.password);
			var query5 = 'UPDATE personaldb SET password = ? WHERE email ="' + result[0].email + '"';
            dbConn.query(query5, hashPass, function(err, result) {
                if(err) 
					throw err
                });
				
				res.render("auth/reset_password", 
						{token: 0, msg: 'Your password has been updated successfully'});			            
        } 
		else { 
            console.log('2');
			res.render("auth/reset_password", 
						{token: token, error: 'Invalid link; please try again'});			
        } 
    });
}

