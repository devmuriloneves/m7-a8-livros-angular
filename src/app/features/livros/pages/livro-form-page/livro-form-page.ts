import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

import { FormularioLivro } from "../../components/formulario-livro/formulario-livro";
import { NovoLivro } from "../../models/livro";
import { LivrosService } from "../../services/livros.service";

@Component({
  selector: "app-livro-form-page",
  standalone: true,
  imports: [FormularioLivro, RouterLink],
  templateUrl: "./livro-form-page.html",
  styleUrl: "./livro-form-page.css"
})
export class LivroFormPage {
  private readonly service =
    inject(LivrosService);

  private readonly router =
    inject(Router);

  readonly salvando =
    signal(false);

  readonly erro =
    signal<string | null>(null);

  async cadastrar(livro: NovoLivro): Promise<void> {
    this.salvando.set(true);
    this.erro.set(null);

    try {
      const criado =
        await this.service.cadastrar(livro);

      void this.router.navigate(["/livros", criado.id]);
    } catch {
      this.erro.set(
        "Não foi possível cadastrar o livro. Verifique os dados e tente novamente."
      );
    } finally {
      this.salvando.set(false);
    }
  }
}
