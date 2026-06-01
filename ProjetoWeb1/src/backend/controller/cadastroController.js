const cadastro = (req, res) =>{
    const {email, senha, nome} = req.body;
    console.log(`Cadastrando: ${nome} ${email}`);

    if(!email || !senha || !nome){
        return res.status(400).json({
            erro: 'Todos os campos sao obrigatorios' 
        });
    }
    
return res.status(200).json({

    mensagem: 'Usuario Cadastro com sucesso',
    usuario: {nome, email}

})
}

module.exports = {
    cadastro
};