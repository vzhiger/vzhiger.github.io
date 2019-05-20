function result_fields_generate(div_id)
{
    // const input = document.getElementById('input');
    // input.oninput = e => {
    // e.target.value = ''; }// не важно, что ввели, значение всегда пустое будет



    //"knife-3m"
    var div = document.getElementById(div_id);
    for(var i=1; i<11; i++)
    {
        var input = document.createElement("input");
        input.type = "text";
        input.className = "form_results_digitsinput form_results_border_neutral";
        input.id = "text-" + div_id + "-" +i;
        input.name = "name-" + div_id + "-" +i;
        if (div_id == "axe-4m")
        {
            input.max = "20";
        }
        else input.max = "60";
        // input.placeholder = "0";
        input.autocomplete = "off";
        input.onchange = function () {  
            sum_results(div_id);
        };
        input.onkeypress = function(event){
            event = event || window.event;
            if (event.charCode && (event.charCode < 48 || event.charCode > 57))// проверка на event.charCode - чтобы пользователь мог нажать backspace, enter, стрелочку назад...
                return false;
            if (this.value.length==2) return false;
            };
        input.onblur = function(){
            validateDigits(this);
        };
        div.appendChild(input);
    }
    var input = document.createElement("input");
    input.type = "text";
    input.className = "form_results_digitsinput form_results_digitsinput_sum";
    input.id = "text-" + div_id + "-SUM";
    input.name = "name-" + div_id + "-SUM";
    input.placeholder = "0";
    // input.value="0"
    input.autocomplete = "off";    
    input.disabled = "disabled";  
    div.appendChild(input);
}

function sum_results(discipline_index)
{
    var id = "text-" + discipline_index + "-";
    var sum = 0;
    for(var i=1; i<11; i++)
    {
        //нужна проверка на строку
        if ( !isNaN( parseInt(document.getElementById(id+i).value))) 
        {
            sum = sum + parseInt(document.getElementById(id+i).value, 10);
        }
    }
    
    if (sum==0)
    {
        document.getElementById(id + "SUM").value = "";
    }
    else
    {
        document.getElementById(id + "SUM").value = sum;
    }
    all_knife_sum();
}


function all_knife_sum()
{
    var SUM = document.getElementById('text-knife-ALL-SUM');
    var a = parseInt(document.getElementById('text-knife-3m-SUM').value);
    var b = parseInt(document.getElementById('text-knife-4m-SUM').value);
    var c = parseInt(document.getElementById('text-knife-5m-SUM').value);

    if(isNaN(a))
    {
        a=0.;
    }
    if(isNaN(b))
    {
        b=0.;
    }
    if(isNaN(c))
    {
        c=0.;
    }
    SUM = a+b+c;

    if (SUM==0)
    {
        document.getElementById('text-knife-ALL-SUM').value="";
    }
    else
    {
        document.getElementById('text-knife-ALL-SUM').value=SUM;
    }
}


function swapStyle_1()
{
  var el_1 = document.getElementById("toggle_male");
  var el_2 = document.getElementById("toggle_female");
  
    if(!el_1.classList.contains("activestyle")) {
      el_1.classList.toggle("activestyle");
      el_2.classList.toggle("activestyle");    
    }
}

function swapStyle_2()
{
  var el_1 = document.getElementById("toggle_male");
  var el_2 = document.getElementById("toggle_female");
    if(!el_2.classList.contains("activestyle")) {
      el_2.classList.toggle("activestyle");
      el_1.classList.toggle("activestyle");    
    }
}

function validateName(el)
{
    if((el.value.trim()!=="") && (el.value.length)<40)
    {
        el.classList.remove("form_results_border_wrong");
        el.classList.add("form_results_border_neutral");
        return true;
    }
    else 
    {
        el.classList.add("form_results_border_wrong");
        el.classList.remove("form_results_border_neutral");
        return false;
    }
}

function validateMail(el)
{
    const pattern = /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/;

    //  /^[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
    //
    if(!pattern.test(el.value.trim()))
    {
        el.classList.add("form_results_border_wrong");
        el.classList.remove("form_results_border_neutral");
        return false;
    }
    else 
    {
        el.classList.remove("form_results_border_wrong");
        el.classList.add("form_results_border_neutral");
        return true;
    }

}

function validateDigits(el)
{
    var val = parseInt(el.value);
    const axe_id_ptrn = /axe/;

    var right_border = (axe_id_ptrn.test(el.id)) ? 20 : 60;
 
    if(val >=0 && val <= right_border && (val%5)==0)
    {
        el.classList.remove("form_results_border_wrong");
        el.classList.add("form_results_border_neutral");
        return true;
    }  
    else{
        el.classList.add("form_results_border_wrong");
        el.classList.remove("form_results_border_neutral");
        return false;
    }
}


function validateLinks()
{
    var links = [];
    var a=0;
    for(var i=1; i<5; i++)
    {
       links[i-1] = document.getElementById("textLink_" + i);
       if(links[i-1].value!=="") a++;
    }

    if (a==0)
    {
        links[0].classList.add("form_results_border_wrong");
        links[0].classList.remove("form_results_border_neutral");
    }
    else{
        links[0].classList.remove("form_results_border_wrong");
        links[0].classList.add("form_results_border_neutral");
    }
    return a;
}


function validateAllDigits()
{
   var axes    = [];
   var knives3 = [];
   var knives4 = [];
   var knives5 = [];

   for(var i=1; i<11; i++)
   {
       if (document.getElementById("text-axe-4m" + "-" +i).value !=="")
           axes.push(document.getElementById("text-axe-4m" + "-" +i).value);

        if (document.getElementById("text-knife-3m" + "-" +i).value !=="")
            knives3.push(document.getElementById("text-knife-3m" + "-" +i).value !=="");

        if (document.getElementById("text-knife-4m" + "-" +i).value !=="")
            knives4.push(document.getElementById("text-knife-4m" + "-" +i).value !=="");

        if (document.getElementById("text-knife-5m" + "-" +i).value !=="")
            knives5.push(document.getElementById("text-knife-5m" + "-" +i).value !=="");
   }

   if (axes.length>0)
   {
       for(var i=1; i<11; i++)
        {
            validateDigits(document.getElementById("text-axe-4m" + "-" +i));
        }
   }

   if (knives3.length>0)
   {
       for(var i=1; i<11; i++)
        {
            validateDigits(document.getElementById("text-knife-3m" + "-" +i));
        }
   }

   if (knives4.length>0)
   {
       for(var i=1; i<11; i++)
        {
            validateDigits(document.getElementById("text-knife-4m" + "-" +i));
        }
   }

   if (knives5.length>0)
   {
       for(var i=1; i<11; i++)
        {
            validateDigits(document.getElementById("text-knife-5m" + "-" +i));
        }
   }

   if (axes.length + knives3.length + knives4.length + knives5.length)
        return true;
   else {
        validateDigits(document.getElementById("text-axe-4m-1"));
        validateDigits(document.getElementById("text-knife-3m-1"));
        return false;
   }
}