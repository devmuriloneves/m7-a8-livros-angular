import { Routes } from "@angular/router";
import { LivrosPage } from "./features/livros/pages/livros-page/livros-page";
import { LivroDetalhePage } from "./features/livros/pages/livro-detalhe-page/livro-detalhe-page";
import { LivroFormPage } from "./features/livros/pages/livro-form-page/livro-form-page";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "livros",
    pathMatch: "full"
  },
  {
    path: "livros",
    component: LivrosPage
  },
  {
    path: "livros/novo",
    component: LivroFormPage
  },
  {
    path: "livros/:id",
    component: LivroDetalhePage
  }
];
