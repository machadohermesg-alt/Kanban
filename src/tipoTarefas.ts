
// Criando o tipo dos dados, com a inclusão de Id para evitar ambigualidades
export interface TarefaTipo{
    Id: number
    Titulo: string
    Descricao: string
    Status: "Fazer"|"Em_Progresso"|"Concluida"
}