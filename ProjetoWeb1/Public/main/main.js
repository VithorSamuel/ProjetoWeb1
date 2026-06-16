const btnArquivo = document.getElementById('btnArquivo')
const seletorArquivo = document.getElementById('seletorArquivo')

btnArquivo.addEventListener('click', () =>{
    seletorArquivo.click()
})

seletorArquivo.addEventListener('change', async ()=>{
    btnArquivo.disabled = true
    const arquivo = seletorArquivo.files[0]
    if(!arquivo)
        return;
    const formData = new FormData()
    formData.append('file', arquivo)

    try{
        const res = await fetch('/virustotal', {
            method: 'POST',
            body: formData
        })
        const result = await res.json()
        if(result.ok){
            localStorage.setItem('idArquivo', result.id)
            window.location.href = '/resultado'
        }else{
            alert(`Erro ${result.error}`)
        }
    }catch(err){
        console.error('Erro no request:', err);
        alert('Erro ao conectar com o servidor local.');
    }finally{
        btnArquivo.disabled = false
    }
})