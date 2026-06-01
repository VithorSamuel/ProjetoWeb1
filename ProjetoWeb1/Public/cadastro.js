const cadastrar = document.getElementById('form-cadastro');

cadastrar.addEventListener('submit', async (e) =>{
    e.preventDefault();

    const formData = new FormData(cadastrar);
    const dados = Object.fromEntries(formData);

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
            alert(`Sucesso: ${result.mensagem}`);
            //cadastroController vai mandar um json
            // com mensagem
            cadastrar.reset();
            window.location.href = '/main.html';

        }else{
            alert(`Erro: ${result.erro}`);
        }
    }catch(err){
        console.error('Erro no request', err);
        alert('Erro ao conectar com o server');
    }
});
