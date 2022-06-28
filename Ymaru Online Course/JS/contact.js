const form= document.getElementById("form");
const fullname= document.getElementById("fullname");
const email= document.getElementById("email");
const message= document.getElementById("message");

let radchecked="";
let fulnaSecc=0;
let emSecc=0;
let messSecc=0;
var validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    checkInput();
});
 function checkInput(){
    const fullnameValue= fullname.value.trim();
    const emailValue= email.value.trim();
    const messageValue= message.value.trim();

    
    console.log("im here");

    if(fullnameValue===''){
        setErrorFor(fullname, 'FullName can not be left blank.');     
    }else{
        fulnaSecc=1;   
        setSuccessFor(fullname);     
    }
    
    if(messageValue===''){
        setErrorFor(message, 'message can not be left blank.');     
    }
    else{
        messSecc=1;
        setSuccessFor(message);     

    
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

    if(fulnaSecc==1 && emSecc==1 && messSecc==1 ){
        alert("Message has been sent.");
        window.location.href = "../ymaru_home.html";

    }                    
    // if(fulnaSecc==1 && emSecc==1 && messSecc==1 ){
    // if (radchecked == "tutor") {
    //     window.location.href = "../tutorhome.html";
    // }
    // else {
  
    //     window.location.href = "../tuteehome.html";

    // }  
    // }
    
    
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