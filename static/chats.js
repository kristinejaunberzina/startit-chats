console.log(123);

const REFRESH = 1000;

async function lasi_chatu()
{
    const atbilde = await fetch('/chats/lasi');
    const data_obj = await atbilde.json();
    //radi_chatu_vienkarsi(data_obj);
    raadiChataRindas(data_obj);
    await new Promise(resolve => setTimeout(resolve, REFRESH) );
    await lasi_chatu();
}


function radi_chatu_vienkarsi(dati)
{
    const jauna_rinda = "<br />";
    let chats = "";
    let chata_div = document.getElementById("chats");

    for(let rinda of dati['chats'])
    {
        chats = chats + rinda + jauna_rinda;
    }


    chata_div.innerHTML = chats;
}


async function suti_zinu()
{
    let zina_elem = document.getElementById('zina');
    let zina = zina_elem.value;

    if( has_special_commands(zina) )
    {
        //special command found do nothin
    }
    else //add to chat
    {

    zina_elem.value = '';

    const atbilde = await fetch('/chats/suuti',
        {
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify({"chats":zina})
        }
    );
    
    const data_obj = await atbilde.json();
    //radi_chatu_vienkarsi(data_obj);
    raadiChataRindas(data_obj);

    }//no spec commands found add message to chat
}




function has_special_commands(stringtoparse)
{
    var special_command_found = false;
    
    if(stringtoparse=='exit')
    {
        special_command_found = true;
    }
    else
    {
        special_command_found = false;
    }


    return special_command_found;
}



function raadiChataRindas(dati) {
    const chatUL = document.getElementById("chats");
    // novaacam ieprieksheejo saturu
    while (chatUL.firstChild) {
        chatUL.firstChild.remove();
    }
    for (let rinda of dati["chats"]) {
      chatLI = izveidoJaunuRindu(rinda);
      chatUL.appendChild(chatLI);
    }
    // noskrolleejam uz leju pie peedeejaa chata texta
    var chatScrollBox = chatUL.parentNode;
    chatScrollBox.scrollTop = chatScrollBox.scrollHeight;
  }
  
  
  function izveidoJaunuRindu(zinja) { 
    let newLI = document.createElement("li");
    newLI.className = "left clearfix"
    let newDiv = document.createElement("div"); 
    newDiv.className = "chat-body clearfix"
    let newContent = document.createTextNode(zinja); 
    newLI.appendChild(newDiv); 
    newDiv.appendChild(newContent); 
    return newLI;
  }






let  input_field = document.getElementById('zina');

input_field.addEventListener("keyup", function(event)
    {
        if(event.keyCode == '13')
        {
        suti_zinu();
        }
    }

)