var form = document.querySelector('.form_results')
var btn = document.getElementById('btnSubmitResults');

const formData = new FormData(form);

form.addEventListener('submit', async (event) =>{
    event.preventDefault()
    console.log('clicked on validate')
    console.log(formData);

    var firstName = document.getElementById('textFirstName');
    var lastName = document.getElementById('textLastName');
 
    var male = document.getElementById('toggle_male');
    // var female = document.getElementById('toggle_female');
    var gender="";
 
    if(male.classList.contains("activestyle"))
    {
        gender="мужской";
    }
    else{
        gender="женский";
    }
 
    var club = document.getElementById('textClub');
    var country = document.getElementById('textCountry');
 
    var form_email = document.getElementById('textEmail');
 
    var links = [];
 
    
 
    for(var i=1; i<5; i++)
    {
        links[i-1] = document.getElementById("textLink_" + i);
    }
 
     var boolFirstName = validateName(firstName);
     var boolLastName = validateName(lastName);
     var boolCountry = validateName(country);
     var boolMail = validateMail(form_email);
     var boolLinks = validateLinks();
     var boolDigits = validateAllDigits();
 
     console.log(boolFirstName);
     console.log(boolLastName);
     console.log(boolCountry);
     console.log(boolMail);
     console.log(boolLinks);
     console.log(boolFirstName);
 
     if (boolFirstName && boolLastName && boolCountry && boolMail && boolLinks && boolDigits)
     {
        console.log('Валидируем');
        document.getElementById('checkFormText').style.visibility='hidden';

        try{
          const response = await fetch('/send_results', {
            method: 'POST',
              headers: {
                'Accept': 'multipart/form-data',
              	'Content-Type': 'multipart/form-data',
              },
            body: formData
              //  body: JSON.stringify({ first_name: firstName.value,
              //   last_name: lastName.value, gender: gender, Cluclub_nameb: club.value, country: country.value,
              //   email: form_email, videoLink_1: links[0], videoLink_2: links[1], videoLink_3: links[2], 
              //   videoLink_4: links[3]})         
          })
          .then(response => response.json())
          .catch(e => {
            console.log('Caugth error:')
            console.log(e)
            console.log(JSON.stringify(e))
        });
          if (response.status = 200) {
            console.log('результаты отправлены');
              // button.style.backgroundImage = "url('images/button_send_ok.svg')";
              // button_ok=1;      // раздизейблить кнопку !!!  
          } 
          else {
            console.log('результаты не отправлены');
                // button.disabled = false; 
                // input_mail.style.color = 'red';
                // !!!надо показать сообщение, что имейл не отправился
          }
        }
        catch(e){console.log('try-catch')
        console.log(e)}
      }
     else{
         console.log('НЕ Валидируем');
         document.getElementById('checkFormText').style.visibility='visible';
     }

});



