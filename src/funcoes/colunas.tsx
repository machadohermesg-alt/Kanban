import type { ReactNode } from "react"
//titulo, children para admitar as tarefas e função que ao clicar retorna vazio basicamente, quando clicar usaremos o click para setar o campo ativo
function Colunas({titulo,children, aoClicar}:{titulo:string,children: ReactNode, aoClicar:()=> void}){
    return(
        <div className="colunas" onClick={aoClicar}><h2>{titulo}</h2>{children} </div>
    )
}
export default  Colunas