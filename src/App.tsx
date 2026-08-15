
import { useState } from "react"
import Colunas from "./funcoes/colunas"
import Tarefa from "./funcoes/tarefas"
import "./projeto.css"
import type { TarefaTipo } from "./tipoTarefas"
function App() {
  //leitura e escrita
    const [titulo,setTitulo] = useState<string>("")
    const [descricao, setDescricao] = useState("")
    //tarefa começando vazio, onde é um array com id,nome,desc,status
    const [tarefa,setTarefa] = useState<TarefaTipo[]>([]) 
    //
    const[id,setId] = useState<number | null>(null)
    //Selecionando onde selecionar nenhuma e o defaut
    const[colunaAtiva,setColunaAtiva] =useState<string | null>( null)
    //Recebendo a id para poder editar


function aoDigitarTitulo(evento:any){
  const novoTitulo = evento.target.value
  setTitulo(novoTitulo)
  //Quando é digitado a primeira letra
  if(id==null){
    //Como date.now() cada instante gera um id nova, logo praticamente impossivel repetir id
    const novoId = Date.now()
    setId(novoId)

       //criando a tarefa
    const novaTarefa : TarefaTipo ={
      Id: novoId,
      Titulo: novoTitulo,
      Descricao: descricao,
      //Dizendo que coluna ativa é uma dessas opções(caso contrário ocorre um erro)
      Status: colunaAtiva as  "Fazer"|"Em_Progresso"|"Concluida"
    }
     //Como o React não reconhece  a mudança, é necessário colocar todas as informações ja existesntes + essa nova
    setTarefa([...tarefa,novaTarefa])
    
    
   
   

  //Da Segunda letra em diante
  }else{
    const novaLista = []
    //Pecorrendo as tarefas
    for(const t of tarefa){
      //caso este id ja exista(primeiro letra foi digitada logo existe)
      if(t.Id===id){
        const tarefaAtualizada: TarefaTipo = {
          Id: t.Id,
          Titulo : novoTitulo,
          Descricao : t.Descricao,
          Status: t.Status,
        }
        //adicionando a tarefa atualizada
        novaLista.push(tarefaAtualizada)

      //caso contrario a tarefa permanece igual e nao é mudado
      }else{
        novaLista.push(t)
      }
      
    }
    //atualizando
    setTarefa(novaLista)
  }
  
}

//De forma analóga temos para descrição, mas neste caso não faz sentido verificar o id, pois a descrição existe após o titulo, logo id =! null
function aoDigitarDescricao(evento:any){
  const novaDescricao = evento.target.value
  setDescricao(novaDescricao)
  const novaLista = []
  for (const t of tarefa){
    if(t.Id==id){
      const tarefaAtualizada: TarefaTipo={
        Id: t.Id,
        Titulo: t.Titulo,
        Descricao: novaDescricao,
        Status: t.Status
      }
      novaLista.push(tarefaAtualizada)
    }else{
      novaLista.push(t)
    }
    
  }
  setTarefa(novaLista)
}
//Ao clicar fora
function aoSairDoFormulario() {
  //Se o titulo retirando espaço é vazio(nada escrito)
  if (titulo.trim() === "") {
   // caso o id dessa tarefa não seja nula(parou digitar e apagou)
    if (id !== null) {
      const novaLista = []
      //Pecorrendo tarefas existentes
      for (const t of tarefa) {
        //Caso nesta lista especifica estamos interando na tarefa diferente
        if (t.Id !== id) {
          //colocamos a tarefa sem alterar nada
          novaLista.push(t)
        }
      }
      //setTarefa recebendo todas as tarefas anteriores
      setTarefa(novaLista)
    }
  }
  // resetamos os valores pra quando for criado a nova tarefa não sofrer influência
  setId(null)
  setTitulo("")
  setDescricao("")
  setColunaAtiva(null)
}

//Pegando os dados para edição, recebendo o t ao clicar na tarefa
 function iniciarEdicao(t:TarefaTipo){
  setId(t.Id)
  setTitulo(t.Titulo)
  setDescricao(t.Descricao)
  setColunaAtiva(t.Status)

 }
 function Excluir(idExcluir:number){
  const novaLista = []
  for(const t of tarefa){
    if(t.Id!==idExcluir){
      novaLista.push(t)
    }
  }
  setTarefa(novaLista)
 }
function irEsquerda(idEsquerda:number, StatusAtual: string){
  const novaLista = []
  for(const t of tarefa){
    if(t.Id===idEsquerda){
                  if(StatusAtual==="Fazer"){
                    const TarefaAtualizada: TarefaTipo={
                      Id: t.Id,
                      Titulo: t.Titulo,
                      Descricao: t.Descricao,
                      Status: "Concluida"
                    }
                    novaLista.push(TarefaAtualizada)
                    }else if(StatusAtual==="Em_Progresso"){
                      const TarefaAtualizada: TarefaTipo={
                      Id: t.Id,
                      Titulo: t.Titulo,
                      Descricao: t.Descricao,
                      Status: "Fazer"
                    }
                    novaLista.push(TarefaAtualizada)
                  }else{
                    const TarefaAtualizada: TarefaTipo={
                      Id: t.Id,
                      Titulo: t.Titulo,
                      Descricao: t.Descricao,
                      Status: "Em_Progresso"
                    }
                    novaLista.push(TarefaAtualizada)
                  }
                  
    }else{
      novaLista.push(t)
    }
    
  }
  setTarefa(novaLista)
}




function irDireita(idDireita:number, StatusAtual: string){
  const novaLista = []
  for(const t of tarefa){
    if(t.Id===idDireita){
                  if(StatusAtual==="Fazer"){
                    const TarefaAtualizada: TarefaTipo={
                      Id: t.Id,
                      Titulo: t.Titulo,
                      Descricao: t.Descricao,
                      Status: "Em_Progresso"
                    }
                    novaLista.push(TarefaAtualizada)
                    }else if(StatusAtual==="Em_Progresso"){
                      const TarefaAtualizada: TarefaTipo={
                      Id: t.Id,
                      Titulo: t.Titulo,
                      Descricao: t.Descricao,
                      Status: "Concluida"
                    }
                    novaLista.push(TarefaAtualizada)
                  }else{
                    const TarefaAtualizada: TarefaTipo={
                      Id: t.Id,
                      Titulo: t.Titulo,
                      Descricao: t.Descricao,
                      Status: "Em_Progresso"
                    }
                    novaLista.push(TarefaAtualizada)
                  }
                  
    }else{
      novaLista.push(t)
    }
    
  }
  setTarefa(novaLista)
}
  return (
    <div className="pagina-wrapper">

   
    <header>
      <div className="nome-site">
          <h1>Kanban</h1>
      </div>
    </header>
    <main>
              
              {/* Todos os seguintes codigos serão replicados em cada coluna então irei explicar apenas esta parte, claro que pooderia ser feito
              na funcao coluna mas optei por deixar explciito aqui*/}
                <Colunas titulo="A FAZER" aoClicar={()=> setColunaAtiva("Fazer")}>
                   {/* Agora quando estiver na coluna A FAZER o input sera nela, por isso fazemos: */}
                   {colunaAtiva==="Fazer" &&(
                    // Aqui simplesmente chamamos a função sair do formulario  salvando os campos, limpando para criação da nova tarefa
                    //caso o o lugar clicado esteja fora do input
                      <div className="formulario-tarefa" onBlur={(evento)=>
                      {if(!evento.currentTarget.contains(evento.relatedTarget)){
                        aoSairDoFormulario()
                      }
                      }
                      }>
                        {/* Criamos o input do titulo e da descrição com seus respectivo placeholder onde ao digitar é chamado
                        a função aoDigitarTitulo e o mesmo pra descrição*/}
                          <input
                            type="text"
                            placeholder="Título"
                            value={titulo}
                            onChange={aoDigitarTitulo}
                          ></input>
                          <input
                            type="text"
                            placeholder="Descrição(Opcional)"
                            value={descricao}
                            onChange={aoDigitarDescricao}
                          ></input>
                      </div>
                   )}
                {/* Filtramos as tarefas que estão com filtro FAZER, ao filtramos iremos mapear essas tarefas(t) onde
                agora tarefa ira receber titulo e a descricao */}
                   {tarefa.filter((t)=> t.Status === "Fazer")
                  .map((t) => <Tarefa key={t.Id} titulo={t.Titulo} descricao={t.Descricao}  
                  aoClicar={()=>iniciarEdicao(t)}    aoExcluir={()=> Excluir(t.Id)}
                  setaEsquerda={()=>irEsquerda(t.Id, t.Status)} setaDireita={()=> irDireita(t.Id,t.Status)}
                  /> )}
                  
                </Colunas>
                
                <Colunas titulo="EM PROGRESSO"aoClicar={()=> setColunaAtiva("Em_Progresso")}>
                {colunaAtiva==="Em_Progresso" &&(
                   <div  className="formulario-tarefa" onBlur={(evento)=>
                    {if(!evento.currentTarget.contains(evento.relatedTarget)){
                      aoSairDoFormulario()
                    }}
                   }>
                    <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={aoDigitarTitulo}
                   >
                    </input>
                   <input
                    type="text"
                    placeholder="Descrição(Opcional)"
                    value={descricao}
                    onChange={aoDigitarDescricao}
                   ></input>


                   </div>


                )}
                  {tarefa.filter((t)=> t.Status==="Em_Progresso").map((t)=>
                  <Tarefa key={t.Id} titulo={t.Titulo} descricao={t.Descricao} aoClicar={()=>iniciarEdicao(t)}
                  aoExcluir={()=> Excluir(t.Id)}
                  setaEsquerda={()=>irEsquerda(t.Id, t.Status)} setaDireita={()=> irDireita(t.Id,t.Status)}
                  ></Tarefa>)}
                
                </Colunas>


                <Colunas titulo="CONCLUÍDAS" aoClicar={()=> setColunaAtiva("Concluida")}>
                    {colunaAtiva==="Concluida" && (
                      <div className="formulario-tarefa" onBlur={(evento)=>
                          {if(!evento.currentTarget.contains(evento.relatedTarget)){
                            aoSairDoFormulario()
                          }

                      }}
                      >
                        <input
                          type="text"
                                  
                        placeholder="Título"
                              value={titulo}
                              onChange={aoDigitarTitulo}
                            >
                              </input>
                            <input
                              type="text"
                              placeholder="Descrição(Opcional)"
                              value={descricao}
                              onChange={aoDigitarDescricao}        
                        
                        ></input>


                      </div>

                    )}

                  {tarefa.filter((t)=> t.Status==="Concluida").map((t)=>
                  <Tarefa key={t.Id} titulo={t.Titulo} descricao={t.Descricao} aoClicar={()=>iniciarEdicao(t)}
                  aoExcluir={()=>Excluir(t.Id)}
                  setaEsquerda={()=>irEsquerda(t.Id, t.Status)} setaDireita={()=> irDireita(t.Id,t.Status)}
                  
                  ></Tarefa>) }
                 
                
                </Colunas>
    </main>
    <footer>
                    
                        <a href="mailto:machadohermesg@gmail.com">Email</a>
                        {' · '}
                        <a href="https://www.linkedin.com/in/hermes-guimar%C3%A3es-machado-7474a7229/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        {' · '}
                        <a href="https://github.com/machadohermesg-alt" target="_blank" rel="noopener noreferrer">GitHub</a>
    </footer>
     </div>
  )
}

export default App
