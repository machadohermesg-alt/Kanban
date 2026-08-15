// recebendo titulo,descrião e ao clicar, onde ao clicar chamaremos a funcao editar no app
function Tarefa ({titulo,descricao, aoClicar, aoExcluir, setaEsquerda, setaDireita}:{titulo:string,descricao:string, aoClicar: ()=> void, aoExcluir: ()=> void
,setaDireita: ()=> void, setaEsquerda: ()=>void


}){
    return(
        <div className="tarefa" onClick={aoClicar}  ><h3>{titulo}</h3><p>{descricao}</p> 
        <button onClick ={(evento)=>{
            // stopPropogation evitar que que aoClicar execute iniciando editarTarefa que causaria bugs(como nao conseguir criar tarefas)
             evento.stopPropagation()
           
            aoExcluir() 
        }         
        }> Excluir</button>

        {/* Escolhi deixa a seta de esquerda e direita em todas as colunas, mesmo de fazer para concluida direto, pois sinto que as vezes
        pode ter confudido ou até mesmo fez e não passou para o progresso */}
        <button className="seta"onClick ={(evento)=>{
            // stopPropogation evitar que que aoClicar execute iniciando editarTarefa que causaria bugs(como nao conseguir criar tarefas)
             evento.stopPropagation()
           
            setaEsquerda() 
        }         
        }>◀</button>
         <button className="seta"onClick ={(evento)=>{
            // stopPropogation evitar que que aoClicar execute iniciando editarTarefa que causaria bugs(como nao conseguir criar tarefas)
             evento.stopPropagation()
           
            setaDireita() 
        }         
        }>▶</button>
        
        </div>
    )
}
export default  Tarefa