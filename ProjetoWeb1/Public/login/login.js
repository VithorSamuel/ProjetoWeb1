const formlogin = document.getElementById('form-login')
const btnlogin = document.getElementById('btnLogin')
const inputEmail = document.getElementById('inputEmail')
const inputSenha = document.getElementById('inputSenha')

const input = {
    email: inputEmail,
    senha: inputSenha
}

    formlogin.addEventListener('submit', async (e) =>{
        e.preventDefault()
        btnlogin.disabled = true
        const btnTexto = btnlogin.value
        btnlogin.value = "logando..."
        btnlogin.style.opacity = 0.7

        const dados = Object.fromEntries(new FormData(formlogin))

        try{
            const res = await fetch('/login', {
                method: 'POST',
                headers:{
               'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            const result = await res.json();
            
            if(res.ok){
                sessionStorage.setItem('nomeUser', `${result.usuario.nome}`)
                 const cadastrado = sessionStorage.setItem('cadastrado', 'true')
                window.location.href = '/main'
                return;
            }
            alert('Senha ou Email errados')
        }catch(err){
        console.error('Erro no request', err);
        alert('Erro ao conectar com o server' + `${err}`);
        }finally{
            btnlogin.disabled = false;
            btnlogin.value = btnTexto;
            btnlogin.style.opacity = "1";
        }
        
    })