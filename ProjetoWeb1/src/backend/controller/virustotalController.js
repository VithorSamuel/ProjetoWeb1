import 'dotenv/config'

const virustotal = async(request, reply) =>{
    try{

    
if (!process.env.API_KEY) {
    throw new Error("A variavel da api_key nao foi encontrada no env");
}

    const dados = await request.file()
    if(!dados){
        return reply.status(400).send({ok: false, error: 'Nenhum arquivo enviado'})
    }

    const arquivoBlob = new Blob([await dados.toBuffer()], {type: dados.mimeType})

    const formData = new FormData()
    formData.append('file', arquivoBlob, dados.filename)

    const API_KEY = process.env.API_KEY

    const res = await fetch('https://www.virustotal.com/api/v3/files',{
        method: 'POST',
        headers:{ 'x-apikey': API_KEY

        },
        body: formData
    })

    const result = await res.json()

    if(res.ok){
        const id = result.data.id
        const atributos = result.data.attributes
        if(atributos && atributos.status === 'completed'){
            const listaAVirus = processo(atributos.results)
            return reply.send({ok: true, status: 'concluido', id, antivirus: listaAVirus})
        } 
        return reply.send({ok: true, status: 'processando', id})

    }else{
        return reply.status(res.status).send({
            ok: false,
            error: result.error?.message || 'Erro da API do virustotal'
        })
    }
}catch(err){
    request.log.error(err)
    return reply.status(500).send({ok: false, error: ' erro interno do server'})
}
   
}

const resultado = async (request, reply) =>{
    try{
        const {id} = request.params
        const res = await fetch(`https://www.virustotal.com/api/v3/analyses/${id}`,{
            method: 'GET',
            headers: {'x-apikey': process.env.API_KEY}
        })
        const result = await res.json()

        if(res.ok){
            const status = result.data.attributes.status;
            if(status === 'completed'){
                console.log(`resultado = ${result.data.attributes.results}`)
                const listaAVirus = processo(result.data.attributes.results)
                return reply.send({ok: true, status: 'concluido', antivirus: listaAVirus})
            }else{
                return reply.send({ok: true, status: 'processando'})
            }
        }else{
            return reply.status(res.status).send({ok: false, error: result.error?.message})
        }
    }catch(err){
        request.log.error(err)
        return reply.status(500).send({ok: false, error: 'Erro interno da consulta'})
    }
}


    function processo(results){
        const relatorio = []
        for(const Antivirus in results){
            const info = results[Antivirus]
            relatorio.push({
                nome: info.engine_name,
                status: info.category,
                resultado: info.result || 'Limpo'
            })
        }
        return relatorio
    }

export {virustotal, resultado}