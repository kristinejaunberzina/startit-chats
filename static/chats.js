console.log(123);

const REFRESH = 1000;

async function lasi_chatu()
{
    const atbilde = await fetch('/chats/lasi');
    const data_obj = await atbilde.json();
    radi_chatu_vienkarsi(data_obj);

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

    zina_elem.value = '';

    const atbilde = await fetch('/chats/suuti',
        {
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify({"chats":zina})
        }
    );
    
    const data_obj = await atbilde.json();
    radi_chatu_vienkarsi(data_obj);
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