const Download = document.getElementById('download')
document.addEventListener('DOMContentLoaded', async ()=>{



    const time = 5000;
    const idArquivo = localStorage.getItem('idArquivo')
    const containerstatus = document.getElementById('containerStatus')
    function resultados(antivirus){
        containerstatus.innerHTML = ''
        antivirus.forEach(element => {
            const item = document.createElement('div')
            item.className = 'antivirus'
            item.innerHTML = `
            <label>Antivirus: </label> ${element.nome + ';'}
             <label>Status: </label> ${element.status}
            
            `
            containerstatus.appendChild(item)
        });
    }

    async function Status(){
    try{

        const res = await fetch(`virustotal/result/${idArquivo}`)
        const result = await res.json()

        if(result.ok){
            if(result.status === 'concluido'){
                Download.innerHTML = ''
                clearInterval(pollingStatus)
                resultados(result.antivirus)
            }
        }
    }catch(err){
        alert('Error no resultado.js', err)
    }
}

    Status()
    const pollingStatus = setInterval(Status, time)
})
