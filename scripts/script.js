let formulario = document.getElementById('formulario');
let idF = 0;

containerInicial.addEventListener("click", () => {
    document.getElementById('containerInicial').style.display = "none";
    document.getElementById('containerInicio').style.display = "flex";
})

btnIncio.addEventListener('click', () => {
    swal({
        text: "¡No se cuentra disponible en este momento!",
        button: "Regresar",
    });
})

containerInicio.addEventListener('click', () => {
    inputCorr = document.getElementById('inputCorr').value
    if (inputCorr == "") {
        document.getElementById('btnGo').disabled = true;
    }
})

inputCorr.addEventListener('click', () => {
    document.getElementById('btnGo').disabled = false;
})
homeReg.addEventListener('click', () => {
    document.getElementById('registro').style.display = "none";
    document.getElementById('containerInicio').style.display = "flex";
})

btnGo.addEventListener('click', async () => {
    let email = document.getElementById('inputCorr').value;
    let resp = await fetch('http://localhost:4001/usuarios');
    let data = await resp.json();
    console.log(data);
    let valiEmail = data.find(user => user.correo.toLowerCase() === email.toLowerCase())
    console.log(valiEmail);
    if (valiEmail == undefined) {
        alert('Este correo ' + email + ' no se encuentra registrado');
    } else {
        const { id, idrespH, idrespcss, idrespjs } = valiEmail;
        console.log(id);
        document.getElementById('idUsurioOnline').value = id;
        document.getElementById('idrespHOnline').value = idrespH;
        document.getElementById('idrespcssOnline').value = idrespcss;
        document.getElementById('idrespjsOnline').value = idrespjs;
        console.log(document.getElementById('idrespHOnline').value);
        console.log(document.getElementById('idrespcssOnline').value);
        console.log(document.getElementById('idrespjsOnline').value);
        document.getElementById('containerCateg').style.display = "block";
        document.getElementById('containerInicio').style.display = "none";
    }
})

insc.addEventListener('click', () => {
    document.getElementById('registro').style.display = "block";
    document.getElementById('btnReg').style.display = "block";
    document.getElementById('containerInicio').style.display = "none";
    document.getElementById('btnMod').style.display = "none";
    document.getElementById('btnEli').style.display = "none";
})

olvido.addEventListener('click', async () => {
    let email = prompt("ingrese su correo")

    let resp = await fetch('http://localhost:4001/usuarios');
    let data = await resp.json();
    console.log(data);
    let valiEmail = data.find(user => user.correo.toLowerCase() === email.toLowerCase())
    console.log(valiEmail);
    if (valiEmail == undefined) {
        alert('Este correo ' + email + ' no se encuentra registrado');
    } else {

        const { nombre, apellido, idrespjs, progh, progcss, progjs, correo, id, foto, respuestas, correctas, incorrectas, tiempo, idrespH, idrespcss, vidas } = valiEmail;
        console.log(nombre, apellido, correo, id);
        document.getElementById('inputNombres').value = nombre;
        document.getElementById('inputApellidos').value = apellido;
        document.getElementById('inputEmail').value = correo;
        document.getElementById('inputFoto').value = foto;
        document.getElementById('idUsurioOnline').value = id;

        console.log(idUsurioOnline)
        document.getElementById('inputEmail').readOnly = true;
        document.getElementById('registro').style.display = "block";
        document.getElementById('containerInicio').style.display = "none";
        document.getElementById('btnMod').style.display = "block";
        document.getElementById('btnEli').style.display = "block";
        document.getElementById('btnReg').style.display = "none";
    }
})

btnMod.addEventListener('click', async (e) => {
    e.preventDefault();
    let name = document.getElementById('inputNombres').value;
    let lastName = document.getElementById('inputApellidos').value;
    let foto = document.getElementById('inputFoto').value;
    let email1 = document.getElementById('inputEmail').value;
    let idModificar = document.getElementById('idUsurioOnline').value;


    let resp = await fetch('http://localhost:4001/usuarios');
    let data = await resp.json();
    console.log(data);
    let valiEmail = data.find(user => user.correo.toLowerCase() === email1.toLowerCase())
    console.log(valiEmail);
    const { idrespjs, progh, progcss, progjs, respuestas, correctas, incorrectas, tiempo, idrespH, idrespcss, vidas } = valiEmail;

    let idrespjs1 = idrespjs;
    let progh1 = progh;
    let progcss1 = progcss;
    let progjs1 = progjs;
    let respuestas1 = respuestas;
    let correctas1 = correctas;
    let incorrectas1 = incorrectas;
    let idrespH1 = idrespH;
    let tiempo1 = tiempo;
    let idrespcss1 = idrespcss;
    let vidas1 = vidas;

    let resp1 = await fetch(`http://localhost:4001/usuarios/${idModificar}`, {

        method: 'PUT',
        body: JSON.stringify({
            nombre: name,
            apellido: lastName,
            correo: email1,
            foto: foto,
            id: idModificar,
            vidas: vidas1,
            respuestas: respuestas1,
            correctas: correctas1,
            incorrectas: incorrectas1,
            tiempo: tiempo1,
            idrespH: idrespH1,
            idrespcss: idrespcss1,
            idrespjs: idrespjs1,
            progh: progh1,
            progcss: progcss1,
            progjs: progjs1

        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }

    })
    alert("Su registro fue modificado con exito")
})

btnEli.addEventListener('click', async (e) => {
    e.preventDefault();
    let idModificar = document.getElementById('idUsurioOnline').value;
    let resp = await fetch(`http://localhost:4001/usuarios/${idModificar}`, {
        method: 'DELETE',
    })
    alert("Su registro fue eliminado con exito")
})

btnReg.addEventListener('click', async (e) => {
    e.preventDefault();

    let name = document.getElementById('inputNombres').value;
    let lastName = document.getElementById('inputApellidos').value;
    let foto = document.getElementById('inputFoto').value;
    let email = document.getElementById('inputEmail').value;

    let resp = await fetch('http://localhost:4001/usuarios');
    let data = await resp.json();
    console.log(data);
    let valiEmail = data.find(user => user.correo.toLowerCase() === email.toLowerCase())
    console.log(valiEmail);
    if (valiEmail.length !== "") {
        alert('Este correo ' + email + ' ya se encuentra registrado');
    } else {
        let resp = await fetch('http://localhost:4001/usuarios/', {
            method: 'POST',
            body: JSON.stringify({
                nombre: name,
                apellido: lastName,
                correo: email,
                foto: foto,
                vidas: 0,
                respuestas: 0,
                correctas: 0,
                incorrectas: 0,
                tiempo: 0,
                idrespH: [],
                idrespcss: [],
                idrespjs: [],
                progh: 0,
                progcss: 0,
                progjs: 0
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        alert("Su registro ha sido guardado")
        document.getElementById('registro').style.display = "none";
        document.getElementById('containerInicio').style.display = "flex";
    }
})

function pintarQS1() {
    q1body.innerHTML = '';
    q1body.innerHTML = `
    <img id = "q1img" src="" alt="">
    <p id="q1c"></p>
    <div id ="contAnw" class="resp1">
    <div id="answ1">
    <input id = "answq11" class="answq1" type="button" value="aaaa" >
    <img id="chq11" class ="chq1"src="./img/cheq.png" alt="">
    <img id="chqok1"class ="chq1"src="./img/cheqok.png" alt="">
    <img id="chqe1"class ="chq1"src="./img/cheqerror.png" alt="">
     </div>
     <div id="answ2">
    <input id = "answq12" class="answq1" type="button" value="bbb" >
    <img id = "chq22" class ="chq2"src="./img/cheq.png" alt="">
    <img id="chqok2"class ="chq2"src="./img/cheqok.png" alt="">
    <img id="chqe2"class ="chq2"src="./img/cheqerror.png" alt="">
    </div>
    <div id="answ3">
    <input id = "answq13" class="answq1" type="button" value="ccc" >
    <img id = "chq33" class ="chq3"src="./img/cheq.png" alt="">
    <img id="chqok3"class ="chq3"src="./img/cheqok.png" alt="">
    <img id="chqe3"class ="chq3"src="./img/cheqerror.png" alt="">
    </div>
    <button id="q1btn">COMPROBAR</button> 
    `
    answ1.addEventListener('click', () => {
        colorQ11()
        document.getElementById('resU').value = document.getElementById('answq11').value;
    })
    answ2.addEventListener('click', () => {
        colorQ12()
        document.getElementById('resU').value = document.getElementById('answq12').value;
    })
    answ3.addEventListener('click', () => {
        colorQ13()
        document.getElementById('resU').value = document.getElementById('answq13').value;

    })
    q1btn.addEventListener('click', async (e) => {
        e.preventDefault()
        resCorrecta = document.getElementById('resV').value;
        resUsuario = document.getElementById('resU').value;
        if (resCorrecta == resUsuario) {
            guardarCorrecto()

        }else {
            guardarErrado()

        }
    })
    
}


const selectorQ1 = async () =>{
    let resp1 = await fetch('http://localhost:4000/Qst');
    let data1 = await resp1.json();
    console.log(data1);
    let q1randon = 0;
    let q2randon = 0;
    let q3randon = 0;
    let buscaQ = data1.find(user => user.id == idF)
    console.log(buscaQ);
    const { imagen, pregunta, res1, res2, res3, resCorr } = buscaQ;
    q1randon = random(1, 3);
    console.log(q1randon)
    q2randon = random(1, 3);
    while (q2randon == q1randon) {
        q2randon = random(1, 3);
    }
    let ident = q2randon + q1randon;
    switch (ident) {
        case 3:
            q3randon = 3;
            break;
        case 4:
            q3randon = 2;
            break;
        case 5:
            q3randon = 1;
            break;
        default:
            alert("Invalido")
            break; 
    }
    pintarQS1()
    console.log(imagen, pregunta, res1, res2, res3, resCorr);
    document.getElementById('q1img').setAttribute('src', imagen);
    document.getElementById('q1c').textContent = pregunta;
    document.getElementById('idresOnline').value = idF;
    document.getElementById('resV').value = resCorr;
    document.getElementById(`answq1${q1randon}`).value = res1;
    document.getElementById(`answq1${q2randon}`).value = res2;
    document.getElementById(`answq1${q3randon}`).value = res3;
    document.getElementById('containerCateg').style.display = "none";
    document.getElementById('containerQ1').style.display = "block";
    
}

logHtml.addEventListener('click', async () => {
    funcHTML()
})



const funcHTML = async () =>{
let idEnUso = document.getElementById('idUsurioOnline').value;
let idrespHF = document.getElementById('idrespHOnline').value;

let resp = await fetch('http://localhost:4001/usuarios');
let data = await resp.json();
console.log(idEnUso);
let lee = data.find(user => user.id == idEnUso)
console.log(lee);
const { idrespH ,vidas, progh } = lee;

if(vidas == 0){
    alert('vidas agotadas')
}else{

if (idrespHF.length >= 9 ) {
    alert("¿Desea realizar el curso nuevamente?")
} else {

    document.getElementById('livNum').textContent = vidas;
    document.getElementById('progress').style.width = progh+"%";
    console.log(idrespH);
    let idSec = random(1, 5);
    console.log(idrespH.some(user => user == idSec));
    while (idrespH.some(user => user == idSec) == true) {
        idSec = random(1, 5);
    }
    console.log(idSec);
    switch (idSec) {
        case 1:
            idF = 1;
            selectorQ1(idF)
            break;
        case 2:
            idF = 2;
            selectorQ1(idF)
            break;
        case 3:
            idF = 3;
            selectorQ1(idF)
            break;
        case 4:
            idF = 4;
            pintarQS2(idF)
        document.getElementById('containerCateg').style.display = 'none';
        document.getElementById('containerQ1').style.display = 'block';
            break;
        case 5:
            idF = 5;
            pintarQS3(idF) 
            document.getElementById('containerCateg').style.display = 'none';
            document.getElementById('containerQ1').style.display = 'block';
            break;

        default:
            break;

    }
}
}
}

function colorQ11() {
    document.getElementById('q1btn').disabled = false;
    document.getElementById('chqok1').style.display = 'flex';
    document.getElementById('chq22').style.display = 'flex';
    document.getElementById('chq33').style.display = 'flex';
    document.getElementById('chq11').style.display = 'none';
    document.getElementById('chqok2').style.display = 'none';
    document.getElementById('chqok3').style.display = 'none';
    document.getElementById('answq11').style.border = '2px solid #2CB67D'
    document.getElementById('answq12').style.border = '2px solid #FFFFFE'
    document.getElementById('answq13').style.border = '2px solid #FFFFFE'
}
function colorQ12() {
    document.getElementById('q1btn').disabled = false;
    document.getElementById('answq12').style.border = '2px solid #2CB67D'
    document.getElementById('answq11').style.border = '2px solid #FFFFFE'
    document.getElementById('answq13').style.border = '2px solid #FFFFFE'
    document.getElementById('chqok2').style.display = 'flex';
    document.getElementById('chq11').style.display = 'flex';
    document.getElementById('chq33').style.display = 'flex';
    document.getElementById('chq22').style.display = 'none';
    document.getElementById('chqok1').style.display = 'none';
    document.getElementById('chqok3').style.display = 'none';
}
function colorQ13() {
    document.getElementById('q1btn').disabled = false;
    document.getElementById('chqok3').style.display = 'flex';
    document.getElementById('chq22').style.display = 'flex';
    document.getElementById('chq11').style.display = 'flex';
    document.getElementById('chq33').style.display = 'none';
    document.getElementById('chqok2').style.display = 'none';
    document.getElementById('chqok1').style.display = 'none';
    document.getElementById('answq13').style.border = '2px solid #2CB67D'
    document.getElementById('answq12').style.border = '2px solid #FFFFFE'
    document.getElementById('answq11').style.border = '2px solid #FFFFFE'
}

const guardarCorrecto = async () =>{
    
    let idf = document.getElementById('idUsurioOnline').value;
    let resp2 = await fetch('http://localhost:4001/usuarios');
    let data2 = await resp2.json();
    console.log(data2);
    let buscador = data2.find(user2 => user2.id == idf)
    console.log(buscador);
    const {nombre, apellido, correo, foto, id, idrespjs, progh, progcss, progjs, respuestas, correctas, incorrectas, tiempo, idrespH, idrespcss, vidas } = buscador;

    // let idrespjs1 = idrespjs;
    let progh1 = progh + 16.6667;
    // let progcss1 = progcss;
    // let progjs1 = progjs;
    let respuestas1 = respuestas + 1;
    let correctas1 = correctas + 1;
    // let incorrectas1 = incorrectas;
    let idrespH1 = document.getElementById('idresOnline').value;
    idrespH.push(idrespH1)
    // let tiempo1 = tiempo;
    // let idrespcss1 = idrespcss;
    // let vidas1 = vidas;

    let resp1 = await fetch(`http://localhost:4001/usuarios/${idf}`, {

        method: 'PUT',
        body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            foto: foto,
            id: id,
            vidas: vidas,
            respuestas: respuestas1,
            correctas: correctas1,
            incorrectas: incorrectas,
            tiempo: tiempo,
            idrespH: idrespH,
            idrespcss: idrespcss,
            idrespjs: idrespjs,
            progh: progh1,
            progcss: progcss,
            progjs: progjs

        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }

    })
    alert("Su repuesta es correcta")

    funcHTML()
}

const guardarErrado = async () =>{
    
    let idf = document.getElementById('idUsurioOnline').value;
    let resp2 = await fetch('http://localhost:4001/usuarios');
    let data2 = await resp2.json();
    console.log(data2);
    let buscador = data2.find(user2 => user2.id == idf)
    console.log(buscador);
    const {nombre, apellido, correo, foto, id, idrespjs, progh, progcss, progjs, respuestas, correctas, incorrectas, tiempo, idrespH, idrespcss, vidas } = buscador;

    
     let respuestas1 = respuestas + 1;
    let incorrectas1 = incorrectas + 1;
    // let tiempo1 = tiempo;
    let vidas1 = vidas - 1;
    
    let resp1 = await fetch(`http://localhost:4001/usuarios/${idf}`, {

        method: 'PUT',
        body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            foto: foto,
            id: id,
            vidas: vidas1,
            respuestas: respuestas1,
            correctas: correctas,
            incorrectas: incorrectas1,
            tiempo: tiempo,
            idrespH: idrespH,
            idrespcss: idrespcss,
            idrespjs: idrespjs,
            progh: progh,
            progcss: progcss,
            progjs: progjs

        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }

    })
    alert("Su repuesta es incorrecta")

    funcHTML()
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarQS2() {
    q1body.innerHTML = '';
    q1body.innerHTML = `
    <p id = "pq2">Organiza la estructura de un documento HTML5</p>
    <div id="answOrg">
       
    </div>
    <hr class="linea">
    <div id="answOrg2">
        
    </div>
    <hr class="linea">
        <div id = "pregOrg">
        <div id = "secbtn1">
        <button id = "opcion1" draggable="true" class = "btnOpt">&lt;!DOCTYPE html&gt;</button>
        <button id = "opcion2" draggable="true" class = "btnOpt">&lt;body&gt;&lt;/body&gt;</button>
         </div>
         <div id = "secbtn2">
        <button id = "opcion3" draggable="true" class = "btnOpt">&lt;head&gt;&lt;/head&gt;</button>
        <button id = "opcion4" draggable="true" class = "btnOpt">&lt;html&gt;</button>
        <button id = "opcion5" draggable="true" class = "btnOpt">&lt;/html&gt;</button>
        </div>
        </div>
        <button id="q2btn">COMPROBAR</button> 
    `
    q2btn.addEventListener('click', (e) => {
        e.preventDefault()
        resUsuario = document.getElementById('ValidaDrop').value;
        resUsuario2 = document.getElementById('ValidaDrop2').value;
        resCorr2 = "opcion1opcion4";
        resCorr = "opcion3opcion2opcion5";
        if (resCorr2 == resUsuario2 && resCorr == resUsuario) {
            guardarCorrecto()

        }else {
            guardarErrado()
  
        }
    
    })
    pregOrg.addEventListener('dragstart', e => {
        e.dataTransfer.setData('id', e.target.id);
    });
    
    answOrg.addEventListener('dragover', e => {
        e.preventDefault();
        
    });
    
    answOrg.addEventListener('dragleave', e => {
       
    });
    
    answOrg.addEventListener('drop', e => {
        let idp = document.getElementById('ValidaDrop2').value;
        const id = e.dataTransfer.getData('id');
        const numero = id.split('-')[0];
        
        console.log(numero)
        e.target.appendChild(document.getElementById(id));
        idp = idp + numero;
        document.getElementById('ValidaDrop2').value = idp;
    });
    answOrg2.addEventListener('dragover', e => {
        e.preventDefault();
        
    });
    
    answOrg2.addEventListener('dragleave', e => {
       
    });
    
    answOrg2.addEventListener('drop', e => {
        document.getElementById('idresOnline').value = idF;
        let idp = document.getElementById('ValidaDrop').value;
        const id = e.dataTransfer.getData('id');
        const numero = id.split('-')[0];
        
        console.log(numero)
        e.target.appendChild(document.getElementById(id));
        idp = idp + numero;
        document.getElementById('ValidaDrop').value = idp;
    
    });
}
function pintarQS3() {
    q1body.innerHTML = '';
    q1body.innerHTML = `
    <p id="pq3">¿Qué tecnologías pertenece al MEVN Stack?</p>
    <div class="imgq2">
    <img id="ang"src="./img/ang.png" alt="Angular">
    <img id="vue" src="./img/vue.png" alt="Vue.js">
    <img id="win" src="./img/win.png" alt="Windows">
    <img id="kot" src="./img/kot.png" alt="Kotlin">
 </div>
 <button id="q3btn">COMPROBAR</button> 
    `
    ang.addEventListener('click', () => {
        let res = document.getElementById('ang').alt;
        document.getElementById('ang').style.border = '4px solid #2CB67D'
        document.getElementById('win').style.border = '2px solid #94A1B2'
        document.getElementById('vue').style.border = '2px solid #94A1B2'
        document.getElementById('kot').style.border = '2px solid #94A1B2'
        document.getElementById('ValidaDrop').value = res; 
        console.log(res)
        })
        win.addEventListener('click', () => {
            let res = document.getElementById('win').alt;
        document.getElementById('win').style.border = '4px solid #2CB67D'
        document.getElementById('ang').style.border = '2px solid #94A1B2'
        document.getElementById('vue').style.border = '2px solid #94A1B2'
        document.getElementById('kot').style.border = '2px solid #94A1B2'
        document.getElementById('ValidaDrop').value = res;
            console.log('entre')
            })
        
        vue.addEventListener('click', () => {
            let res = document.getElementById('vue').alt;
        document.getElementById('vue').style.border = '4px solid #2CB67D'
        document.getElementById('win').style.border = '2px solid #94A1B2'
        document.getElementById('ang').style.border = '2px solid #94A1B2'
        document.getElementById('kot').style.border = '2px solid #94A1B2'
        document.getElementById('ValidaDrop').value = res;
        console.log('entre')
        })
        kot.addEventListener('click', () => {
            let res = document.getElementById('kot').alt;
        document.getElementById('kot').style.border = '4px solid #2CB67D'
        document.getElementById('win').style.border = '2px solid #94A1B2'
        document.getElementById('ang').style.border = '2px solid #94A1B2'
        document.getElementById('vue').style.border = '2px solid #94A1B2'
        document.getElementById('ValidaDrop').value = res;
            console.log('entre')
        })
        
        q3btn.addEventListener('click', (e) => {
            e.preventDefault()
            document.getElementById('idresOnline').value = idF;
            resUsuario = document.getElementById('ValidaDrop').value;
            resCorr = "Vue.js";
            if ( resCorr == resUsuario) {
                guardarCorrecto()

            }else {
                guardarErrado()

            }
        
        })

}

logCss.addEventListener('click', async () => {
    funcss()
})
logJs.addEventListener('click', async () => {
    funjs()
})


function pintarQS1css() {
    q1body.innerHTML = '';
    q1body.innerHTML = `
    <img id = "q1img" src="" alt="">
    <p id="q1c"></p>
    <div id ="contAnw" class="resp1">
    <div id="answ1">
    <input id = "answq11" class="answq1" type="button" value="aaaa" >
    <img id="chq11" class ="chq1"src="./img/cheq.png" alt="">
    <img id="chqok1"class ="chq1"src="./img/cheqok.png" alt="">
    <img id="chqe1"class ="chq1"src="./img/cheqerror.png" alt="">
     </div>
     <div id="answ2">
    <input id = "answq12" class="answq1" type="button" value="bbb" >
    <img id = "chq22" class ="chq2"src="./img/cheq.png" alt="">
    <img id="chqok2"class ="chq2"src="./img/cheqok.png" alt="">
    <img id="chqe2"class ="chq2"src="./img/cheqerror.png" alt="">
    </div>
    <div id="answ3">
    <input id = "answq13" class="answq1" type="button" value="ccc" >
    <img id = "chq33" class ="chq3"src="./img/cheq.png" alt="">
    <img id="chqok3"class ="chq3"src="./img/cheqok.png" alt="">
    <img id="chqe3"class ="chq3"src="./img/cheqerror.png" alt="">
    </div>
    <button id="q1btn">COMPROBAR</button> 
    `
    answ1.addEventListener('click', () => {
        colorQ11()
        document.getElementById('resU').value = document.getElementById('answq11').value;
    })
    answ2.addEventListener('click', () => {
        colorQ12()
        document.getElementById('resU').value = document.getElementById('answq12').value;
    })
    answ3.addEventListener('click', () => {
        colorQ13()
        document.getElementById('resU').value = document.getElementById('answq13').value;

    })
    q1btn.addEventListener('click', async () => {
       
        resCorrecta = document.getElementById('resV').value;
        resUsuario = document.getElementById('resU').value;
        if (resCorrecta == resUsuario) {
            guardarCorrectocss()

        }else {
            guardarErrado()

        }
    })
    
}
const guardarCorrectojs = async () =>{
    
    let idf = document.getElementById('idUsurioOnline').value;
    let resp2 = await fetch('http://localhost:4001/usuarios');
    let data2 = await resp2.json();
    console.log(data2);
    let buscador = data2.find(user2 => user2.id == idf)
    console.log(buscador);
    const {nombre, apellido, correo, foto, id, idrespjs, progh, progcss, progjs, respuestas, correctas, incorrectas, tiempo, idrespH, idrespcss, vidas } = buscador;

    // let idrespjs1 = idrespjs;
    let progjs1 = progjs + 16.6667;
    // let progcss1 = progcss;
    // let progjs1 = progjs;
    let respuestas1 = respuestas + 1;
    let correctas1 = correctas + 1;
    // let incorrectas1 = incorrectas;
    let idrespjs1 = document.getElementById('idresOnline').value;
    idrespjs.push(idrespjs1)
    // let tiempo1 = tiempo;
    // let idrespcss1 = idrespcss;
    // let vidas1 = vidas;

    let resp1 = await fetch(`http://localhost:4001/usuarios/${idf}`, {

        method: 'PUT',
        body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            foto: foto,
            id: id,
            vidas: vidas,
            respuestas: respuestas1,
            correctas: correctas1,
            incorrectas: incorrectas,
            tiempo: tiempo,
            idrespH: idrespH,
            idrespcss: idrespcss,
            idrespjs: idrespjs,
            progh: progh,
            progcss: progcss,
            progjs: progjs1

        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }

    })
    alert("Su repuesta es correcta")

    
}
const guardarCorrectocss = async () =>{
    
    let idf = document.getElementById('idUsurioOnline').value;
    let resp2 = await fetch('http://localhost:4001/usuarios');
    let data2 = await resp2.json();
    console.log(data2);
    let buscador = data2.find(user2 => user2.id == idf)
    console.log(buscador);
    const {nombre, apellido, correo, foto, id, idrespjs, progh, progcss, progjs, respuestas, correctas, incorrectas, tiempo, idrespH, idrespcss, vidas } = buscador;

    // let idrespjs1 = idrespjs;
    let progcss1 = progcss + 16.6667;
    // let progcss1 = progcss;
    // let progjs1 = progjs;
    let respuestas1 = respuestas + 1;
    let correctas1 = correctas + 1;
    // let incorrectas1 = incorrectas;
    let idrespcss1 = document.getElementById('idresOnline').value;
    idrespcss.push(idrespcss1)
    // let tiempo1 = tiempo;
    // let idrespcss1 = idrespcss;
    // let vidas1 = vidas;

    let resp1 = await fetch(`http://localhost:4001/usuarios/${idf}`, {

        method: 'PUT',
        body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            foto: foto,
            id: id,
            vidas: vidas,
            respuestas: respuestas1,
            correctas: correctas1,
            incorrectas: incorrectas,
            tiempo: tiempo,
            idrespH: idrespH,
            idrespcss: idrespcss,
            idrespjs: idrespjs,
            progh: progh,
            progcss: progcss1,
            progjs: progjs

        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }

    })
    alert("Su repuesta es correcta")

    
}
function pintarQS1js() {
    q1body.innerHTML = '';
    q1body.innerHTML = `
    <img id = "q1img" src="" alt="">
    <p id="q1c"></p>
    <div id ="contAnw" class="resp1">
    <div id="answ1">
    <input id = "answq11" class="answq1" type="button" value="aaaa" >
    <img id="chq11" class ="chq1"src="./img/cheq.png" alt="">
    <img id="chqok1"class ="chq1"src="./img/cheqok.png" alt="">
    <img id="chqe1"class ="chq1"src="./img/cheqerror.png" alt="">
     </div>
     <div id="answ2">
    <input id = "answq12" class="answq1" type="button" value="bbb" >
    <img id = "chq22" class ="chq2"src="./img/cheq.png" alt="">
    <img id="chqok2"class ="chq2"src="./img/cheqok.png" alt="">
    <img id="chqe2"class ="chq2"src="./img/cheqerror.png" alt="">
    </div>
    <div id="answ3">
    <input id = "answq13" class="answq1" type="button" value="ccc" >
    <img id = "chq33" class ="chq3"src="./img/cheq.png" alt="">
    <img id="chqok3"class ="chq3"src="./img/cheqok.png" alt="">
    <img id="chqe3"class ="chq3"src="./img/cheqerror.png" alt="">
    </div>
    <button id="q1btn">COMPROBAR</button> 
    `
    answ1.addEventListener('click', () => {
        colorQ11()
        document.getElementById('resU').value = document.getElementById('answq11').value;
    })
    answ2.addEventListener('click', () => {
        colorQ12()
        document.getElementById('resU').value = document.getElementById('answq12').value;
    })
    answ3.addEventListener('click', () => {
        colorQ13()
        document.getElementById('resU').value = document.getElementById('answq13').value;

    })
    q1btn.addEventListener('click', async () => {
       
        resCorrecta = document.getElementById('resV').value;
        resUsuario = document.getElementById('resU').value;
        if (resCorrecta == resUsuario) {
            guardarCorrectojs()

        }else {
            guardarErrado()

        }
    })
    
}

const selectorQ1css = async () =>{
    let resp1 = await fetch('http://localhost:4000/Qst1');
    let data1 = await resp1.json();
    console.log(data1);
    let q1randon = 0;
    let q2randon = 0;
    let q3randon = 0;
    let buscaQ = data1.find(user => user.id == idF)
    console.log(buscaQ);
    const { imagen, pregunta, res1, res2, res3, resCorr } = buscaQ;
    q1randon = random(1, 3);
    console.log(q1randon)
    q2randon = random(1, 3);
    while (q2randon == q1randon) {
        q2randon = random(1, 3);
    }
    let ident = q2randon + q1randon;
    switch (ident) {
        case 3:
            q3randon = 3;
            break;
        case 4:
            q3randon = 2;
            break;
        case 5:
            q3randon = 1;
            break;
        default:
            alert("Invalido")
            break; 
    }
    pintarQS1css()
    console.log(imagen, pregunta, res1, res2, res3, resCorr);
    document.getElementById('q1img').setAttribute('src', imagen);
    document.getElementById('q1c').textContent = pregunta;
    document.getElementById('idresOnline').value = idF;
    document.getElementById('resV').value = resCorr;
    document.getElementById(`answq1${q1randon}`).value = res1;
    document.getElementById(`answq1${q2randon}`).value = res2;
    document.getElementById(`answq1${q3randon}`).value = res3;
    document.getElementById('containerCateg').style.display = "none";
    document.getElementById('containerQ1').style.display = "block";
    
}

const funcss = async () =>{
    let idEnUso = document.getElementById('idUsurioOnline').value;
    let idrespHF = document.getElementById('idrespcssOnline').value;
    
    let resp = await fetch('http://localhost:4001/usuarios');
    let data = await resp.json();
    console.log(idEnUso);
    let lee = data.find(user => user.id == idEnUso)
    console.log(lee);
    const { idrespcss ,vidas, progcss } = lee;
    
    if(vidas == 0){
        alert('vidas agotadas')
    }else{
    
    if (idrespHF.length >= 9 ) {
        alert("¿Desea realizar el curso nuevamente?")
    } else {
    
        document.getElementById('livNum').textContent = vidas;
        document.getElementById('progress').style.width = progcss+"%";
        console.log(idrespcss);
        let idSec = random(1, 5);
        console.log(idrespcss.some(user => user == idSec));
        while (idrespcss.some(user => user == idSec) == true) {
            idSec = random(1, 5);
        }
        console.log(idSec);
        switch (idSec) {
            case 1:
                idF = 1;
                selectorQ1css(idF)
                break;
            case 2:
                idF = 2;
                selectorQ1css(idF)
                break;
            case 3:
                idF = 3;
                selectorQ1css(idF)
                break;
            case 4:
                idF = 4;
                selectorQ1css(idF)
                document.getElementById('containerCateg').style.display = 'none';
                document.getElementById('containerQ1').style.display = 'block';
                break;
            case 5:
                idF = 5;
                pintarQS2css(idF) 
                document.getElementById('containerCateg').style.display = 'none';
                document.getElementById('containerQ1').style.display = 'block';      
                break;
    
            default:
                break;
    
        }
    }
    }
    }

function pintarQS2js() {
    q1body.innerHTML = '';
    q1body.innerHTML = `
    <p id = "pq2">Organiza la estructura de un objeto</p>
    <div id="answOrg">
       
    </div>
    <hr class="linea">

        <div id = "pregOrg">
        <div id = "secbtn1">
        <button id = "opcion1" draggable="true" class = "btnOpt">{name:</button>
        <button id = "opcion2" draggable="true" class = "btnOpt">let</button>
         </div>
         <div id = "secbtn2">
        <button id = "opcion3" draggable="true" class = "btnOpt">"steve"};</button>
        <button id = "opcion4" draggable="true" class = "btnOpt">obj =</button>
        </div>
        </div>
        <button id="q2btn">COMPROBAR</button> 
    `
    q2btn.addEventListener('click', (e) => {
        e.preventDefault()
        resUsuario = document.getElementById('ValidaDrop').value;
      e;
        resCorr = "opcion2opcion4opcion1opcion3";
       
        if (resCorr == resUsuario) {
            guardarCorrectojs()

        }else {
            guardarErrado()
  
        }
    
    })
    pregOrg.addEventListener('dragstart', e => {
        e.dataTransfer.setData('id', e.target.id);
    });
    
    answOrg.addEventListener('dragover', e => {
        e.preventDefault();
        
    });
    
    answOrg.addEventListener('dragleave', e => {
       
    });
    
    answOrg.addEventListener('drop', e => {
        let idp = document.getElementById('ValidaDrop').value;
        const id = e.dataTransfer.getData('id');
        const numero = id.split('-')[0];
        
        console.log(numero)
        e.target.appendChild(document.getElementById(id));
        idp = idp + numero;
        document.getElementById('ValidaDrop').value = idp;
    });
    
}
function pintarQS2css() {
    q1body.innerHTML = '';
    q1body.innerHTML = `
    <p id = "pq2"> la forma correcta de invocar a una hoja de estilo</p>
    <div id="answOrg">
       
    </div>
    <hr class="linea">

        <div id = "pregOrg">
        <div id = "secbtn1">
        <button id = "opcion1" draggable="true" class = "btnOpt">type="text/css"</button>
        <button id = "opcion2" draggable="true" class = "btnOpt">rel="stylesheet"</button>
         </div>
         <div id = "secbtn2">
        <button id = "opcion3" draggable="true" class = "btnOpt">&lt;link</button>
        <button id = "opcion4" draggable="true" class = "btnOpt">href="estilo.css"&gt;</button>
        </div>
        </div>
        <button id="q2btn">COMPROBAR</button> 
    `
    q2btn.addEventListener('click', (e) => {
        e.preventDefault()
        resUsuario = document.getElementById('ValidaDrop').value;
      e;
        resCorr = "opcion2opcion4opcion1opcion3";
       
        if (resCorr == resUsuario) {
            guardarCorrectocss()

        }else {
            guardarErrado()
  
        }
    
    })
    pregOrg.addEventListener('dragstart', e => {
        e.dataTransfer.setData('id', e.target.id);
    });
    
    answOrg.addEventListener('dragover', e => {
        e.preventDefault();
        
    });
    
    answOrg.addEventListener('dragleave', e => {
       
    });
    
    answOrg.addEventListener('drop', e => {
        let idp = document.getElementById('ValidaDrop').value;
        const id = e.dataTransfer.getData('id');
        const numero = id.split('-')[0];
        
        console.log(numero)
        e.target.appendChild(document.getElementById(id));
        idp = idp + numero;
        document.getElementById('ValidaDrop').value = idp;
    });
    
}

const selectorQ1js = async () =>{
    let resp1 = await fetch('http://localhost:4000/Qst2');
    let data1 = await resp1.json();
    console.log(data1);
    let q1randon = 0;
    let q2randon = 0;
    let q3randon = 0;
    let buscaQ = data1.find(user => user.id == idF)
    console.log(buscaQ);
    const { imagen, pregunta, res1, res2, res3, resCorr } = buscaQ;
    q1randon = random(1, 3);
    console.log(q1randon)
    q2randon = random(1, 3);
    while (q2randon == q1randon) {
        q2randon = random(1, 3);
    }
    let ident = q2randon + q1randon;
    switch (ident) {
        case 3:
            q3randon = 3;
            break;
        case 4:
            q3randon = 2;
            break;
        case 5:
            q3randon = 1;
            break;
        default:
            alert("Invalido")
            break; 
    }
    pintarQS1js()
    console.log(imagen, pregunta, res1, res2, res3, resCorr);
    document.getElementById('q1img').setAttribute('src', imagen);
    document.getElementById('q1c').textContent = pregunta;
    document.getElementById('idresOnline').value = idF;
    document.getElementById('resV').value = resCorr;
    document.getElementById(`answq1${q1randon}`).value = res1;
    document.getElementById(`answq1${q2randon}`).value = res2;
    document.getElementById(`answq1${q3randon}`).value = res3;
    document.getElementById('containerCateg').style.display = "none";
    document.getElementById('containerQ1').style.display = "block";
    
}

const funjs = async () =>{
    let idEnUso = document.getElementById('idUsurioOnline').value;
    let idrespHF = document.getElementById('idrespjsOnline').value;
    
    let resp = await fetch('http://localhost:4001/usuarios');
    let data = await resp.json();
    console.log(idEnUso);
    let lee = data.find(user => user.id == idEnUso)
    console.log(lee);
    const { idrespjs ,vidas, progjs } = lee;
    
    if(vidas == 0){
        alert('vidas agotadas')
    }else{
    
    if (idrespHF.length >= 9 ) {
        alert("¿Desea realizar el curso nuevamente?")
    } else {
    
        document.getElementById('livNum').textContent = vidas;
        document.getElementById('progress').style.width = progjs+"%";
        console.log(idrespjs);
        let idSec = random(1, 5);
        console.log(idrespjs.some(user => user == idSec));
        while (idrespjs.some(user => user == idSec) == true) {
            idSec = random(1, 5);
        }
        console.log(idSec);
        switch (idSec) {
            case 1:
                idF = 1;
                selectorQ1js(idF)
                break;
            case 2:
                idF = 2;
                selectorQ1js(idF)
                break;
            case 3:
                idF = 3;
                selectorQ1js(idF)
                break;
            case 4:
                idF = 4;
                selectorQ1js(idF)
                break;
            case 5:
                idF = 5;
                pintarQS2js(idF) 
                document.getElementById('containerCateg').style.display = 'none';
                document.getElementById('containerQ1').style.display = 'block';      
                break;
    
            default:
                break;
    
        }
    }
    }
    }