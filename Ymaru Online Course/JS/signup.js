const form= document.getElementById("form");
const username= document.getElementById("username");
const firstname= document.getElementById("firstname");
const lastname= document.getElementById("lastname");
const email= document.getElementById("email");
const course= document.getElementById("coursearch");
const city= document.getElementById("city");
const phone= document.getElementById("phone");
const age= document.getElementById("age");
const birthday= document.getElementById("birthday");
const account= document.getElementById("account");
const password= document.getElementById("password");
const Cpassword= document.getElementById("confirm_password");
let radchecked="";
let unaSecc=0;
let fnaSecc=0;
let lnaSecc=0;
let emSecc=0;
let pasSecc=0;
let cpasSecc=0;
let citySecc=0;
let birthSecc=0;
let ageSecc=0;
let accSecc=0;
let phoneSecc=0;
let coursSecc=0;
// var emailValidation = document.getElementById("email").value;
// var indexWithAt = emailValidation.indexOf("@");
// var indexWithDot = emailValidation.lastIndexOf(".");
var validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

form.addEventListener('submit', (e)=>{
    
    e.preventDefault();
    checkInput();
});
 function checkInput(){
    const usernameValue= username.value.trim();
    const firstnameValue= firstname.value.trim();
    const lastnameValue= lastname.value.trim();
    const emailValue= email.value.trim();
    const courseValue= course.value.trim();
    const cityValue= city.value.trim();
    const phoneValue= phone.value.trim();
    const ageValue= age.value.trim();
    const birthdayValue= birthday.value.trim();
    const accountValue= account.value.trim();
    const passwordValue= password.value.trim();
    const CpasswordValue= Cpassword.value.trim();
    
    // console.log("im here");
    localStorage.setItem("Emails",emailValue);
    localStorage.setItem(emailValue, passwordValue);
    localStorage.setItem("UserName", usernameValue);
    localStorage.setItem("FirstName", firstnameValue);
    localStorage.setItem("LastName", lastnameValue);
    localStorage.setItem("PhoneNo", phoneValue);
    localStorage.setItem("Courses", courseValue);

    
    if(usernameValue===''){
        setErrorFor(username, 'Username can not be left blank.');     
    }else{
        unaSecc=1;
        setSuccessFor(username);     
    }
    console.log("im here");
    if(firstnameValue===''){
        console.log("im here");
        setErrorFor(firstname, 'First name can not be left blank.');     
    }else{
        fnaSecc=1;
        setSuccessFor(firstname);     
    }console.log("im here");
    if(lastnameValue===''){
        setErrorFor(lastname, 'Last name can not be left blank.');     
    }else{
        lnaSecc=1;
        setSuccessFor(lastname);     
    }
    if(courseValue===''){
        
        setErrorFor(course, 'Course can not be left blank.');     
    }
    else{
        coursSecc=1;
        setSuccessFor(course);     

    }
    if(cityValue===''){
        setErrorFor(city, 'City can not be left blank.');     
    }
    else{
        citySecc=1;
        setSuccessFor(city);     

    }
    if(phoneValue===''){
        
        setErrorFor(phone, 'Phone can not be left blank.');   
     
    }
    else if(phoneValue==NaN){
        setErrorFor(phone, 'please enter a number.');
    }else if(phoneValue.length<10 && phoneValue.length>10){
        setErrorFor(phone, 'Phone NUmber must be 10 Digit.');
    }
    else{
        phoneSecc=1;
        setSuccessFor(phone);     

    }
    if(ageValue===''){
        setErrorFor(age, 'Age can not be left blank.');     
    }else if(ageValue.length > 2){
        setErrorFor(age, 'Age must be 2 Digit.');
    }
    else{
        ageSecc=1;
        setSuccessFor(age);     

    }
    if(birthdayValue===''){
        setErrorFor(birthday, 'Birthday can not be left blank.');     
    }
    else{
        birthSecc=1;
        setSuccessFor(birthday);     

    }
    if(accountValue===''){
        
        setErrorFor(account, 'Account can not be left blank.');   
     
    }
    else if(accountValue==NaN){
        setErrorFor(account, 'please enter a number.');
    }
    else if(accountValue.length!=13){
        setErrorFor(account, 'please enter 13 digit number.');
    }
    else{
        accSecc=1;
        setSuccessFor(account);     

    }
    if(passwordValue===''){
        setErrorFor(password, 'Password can not be left blank.');     
    }else if(passwordValue.length<6 || passwordValue.length>18){
        setErrorFor(password, 'Password Must be at least 6 character.');
    }
    else{
        pasSecc=1;
        setSuccessFor(password);     

    
    }
    if(CpasswordValue===''){
        
        setErrorFor(Cpassword, 'Please confirm your password.');   
     
    }
    else if(passwordValue!=CpasswordValue){
        setErrorFor(Cpassword, 'Password does not match.');
    }
    else{
        cpasSecc=1;
        setSuccessFor(Cpassword);     

    }
    if (emailValue==''){
         setErrorFor(email, 'email can not be left blank.');
         
    }else if(emailValue.match(validate)){
        emSecc=1;  
        setSuccessFor(email); 
         
    }
    else{
         setErrorFor(email, 'Please fill the email with aproperate email form.');  
        
    }
    
    console.log("i made it");
                        document.getElementsByName("registerAs").forEach(radio =>{
                                if(radio.checked){
                                        radchecked=radio.value;
                                }
                        });
    if(unaSecc==1 && fnaSecc==1 && lnaSecc==1 && emSecc==1 && pasSecc==1 && cpasSecc==1 && ageSecc==1 && citySecc==1 && birthSecc==1 && accSecc==1 && phoneSecc==1 && coursSecc==1 ){
    if (radchecked == "tutor") {
        window.location.href = "tutorProfile.html";
    }
    else {
  
        window.location.href = "tuteeProfile.html";

    }  
    }
    
    
 }
 function setErrorFor(input, message){
    
    const formControl= input.parentElement;// getting .form-control class
    
    const small= formControl.querySelector("small");
    console.log(formControl+"username excuted");
    //add error message inside small
    small.innerText=message;
    //add error class
    
    formControl.className='form-control error';
}
function setSuccessFor(input){
    const formControl= input.parentElement;
    formControl.className='form-control success';
}


