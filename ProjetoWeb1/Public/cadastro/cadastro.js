    const cadastrar = document.getElementById('form-cadastro');
    const btncadastrar = document.getElementById('btncadastrar');
    const inputNome = document.getElementById('inputNome');
    const inputEmail = document.getElementById('inputEmail');
    const inputSenha = document.getElementById('inputSenha');

    const input = {
        nome: inputNome,
        email: inputEmail,
        senha: inputSenha
    }

       Object.keys(input).forEach(chave => {
        const elemento = input[chave]
        elemento.addEventListener('blur', () =>{
            if(!elemento.value.trim()){
                elemento.style.borderColor = 'red';
                return;
            }

            if(chave === 'email' && !elemento.value.includes("gmail.com")){
                elemento.style.borderColor = 'red';
                return;
            }

            if(chave === 'senha' && elemento.value.length < 5){
                elemento.style.borderColor = 'red';
                return;
            }

            elemento.style.borderColor = "blue"
        });

        elemento.addEventListener('focus', () =>{
            elemento.style.borderColor = 'blue'
        });

       });


    cadastrar.addEventListener('submit', async (e) =>{
        e.preventDefault();
        btncadastrar.disabled = true;
        const btntexto = btncadastrar.value;
        btncadastrar.value = "Cadastrando...";
        btncadastrar.style.opacity = "0.7";

        const formData = new FormData(cadastrar);
        const dados = Object.fromEntries(formData);
        let erro;
        try{
            const res = await fetch('/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
            const result = await res.json();

            if(res.ok){
                sessionStorage.setItem('nomeUser', `${result.usuario.nome}`)
                //cadastroController vai mandar um json
                // com mensagem
                cadastrar.reset();
                const cadastrado = sessionStorage.setItem('cadastrado', 'true')
                
                window.location.href = '/main';
                
                Object.values(input).forEach(e =>{
                    e.style.borderColor = "";
                });
               
            }else{
                
                alert("preencha todos os campos corretamente ||"
                    +`Erro no cadastro: ${result.error}`)
            }
            
        }catch(err){
            console.error('Erro no request', err);
            alert('Erro ao conectar com o server');
        } finally{
            btncadastrar.disabled = false;
            btncadastrar.value = btntexto;
            btncadastrar.style.opacity = "1";
        }
    });
