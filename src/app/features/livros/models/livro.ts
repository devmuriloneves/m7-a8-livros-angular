export type StatusLivro = "disponivel" | "emprestado" | "indisponivel";

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
  ano: number;
  status: StatusLivro;
  descricao?: string;
}

export interface NovoLivro {
  titulo: string;
  autor: string;
  categoria: string;
  ano: number;
  status: StatusLivro;
  descricao?: string;
}
