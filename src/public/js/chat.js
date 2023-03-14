const socket = io()

function Enviar() {                    
    
    //Función para rescatar los datos cargados en el chat
    let vuser = document.getElementById("iduser").value;
    let vmessage = document.getElementById("idmessage").value;    

    // carga de datos a enviar al servidor
    envchat = { 
        user: vuser, 
        message: vmessage 
    }    
    
    //envio al servidor
    socket.emit('env-chat', envchat)        
    
    Cancelar()
}

function Cancelar() {
    document.getElementById("iduser").value = "";
    document.getElementById("idmessage").value = "";
}