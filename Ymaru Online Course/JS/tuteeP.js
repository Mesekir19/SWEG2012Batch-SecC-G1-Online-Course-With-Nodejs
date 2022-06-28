
//for the tutee profile and tutor profile
const image_input = document.querySelector("#input_image"); 
var uploaded_image= "";
 
            image_input.addEventListener("change", function(){
                const reader= new FileReader();
                reader.addEventListener("load", () => {
                uploaded_image = reader.result;
                document.querySelector("#displayimg").style.backgroundImage= `url(${uploaded_image})`;
                });
             
                reader.readAsDataURL(this.files[0]);
            })

