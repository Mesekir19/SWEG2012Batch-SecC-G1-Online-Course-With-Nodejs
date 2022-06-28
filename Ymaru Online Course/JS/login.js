


radchecked="";
 unaSecc=0;
 emSecc=0;
 pasSecc=0;
 validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    checkInput();
});
 function checkInput(){
    const usernameValue= username.value.trim();
    const emailValue= email.value.trim();
    const passwordValue= password.value.trim();

    
   
    if(usernameValue===''){
        setErrorFor(username, 'Username can not be left blank.');     
    }else if(usernameValue!=localStorage.getItem("UserName")){
        setErrorFor(username, 'Incorrect Username.');  
    }
    else{
        unaSecc=1;
        setSuccessFor(username);     
    }
    
    if(passwordValue===''){
        setErrorFor(password, 'Password can not be left blank.');     
    }else if(passwordValue!=localStorage.getItem(emailValue)){
        setErrorFor(password, 'Incorrect Password .'); 
    }
    else{
        pasSecc=1;
        setSuccessFor(password);     

    
    }
    
    if (emailValue==''){
         setErrorFor(email, 'email can not be left blank.');
         
    }else if(emailValue!=localStorage.getItem("Emails")){
        setErrorFor(email, 'Incorrect email.');
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
    if(unaSecc==1 && emSecc==1 && pasSecc==1 ){
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