import {
  Component,
  OnInit,
  inject,
  signal
} from "@angular/core";

import {
  ActivatedRoute,
  Router,
  RouterLink
} from "@angular/router";

import { Livro, StatusLivro } from "../../models/livro";
import { LivrosService } from "../../services/livros.service";

@Component({
  selector: "app-livro-detalhe-page",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./livro-detalhe-page.html",
  styleUrl: "./livro-detalhe-page.css"
})
export class LivroDetalhePage implements OnInit {
  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly service =
    inject(LivrosService);

  readonly livro =
    signal<Livro | undefined>(undefined);

  readonly carregando =
    signal(true);

  readonly erro =
    signal<string | null>(null);

  readonly processando =
    signal(false);

  ngOnInit(): void {
    void this.carregar();
  }

  private async carregar(): Promise<void> {
    this.carregando.set(true);
    this.erro.set(null);

    const id = Number(
      this.route.snapshot.paramMap.get("id")
    );

    try {
      const livro =
        await this.service.buscarPorId(id);

      this.livro.set(livro);
    } catch {
      this.erro.set(
        "Não foi possível carregar os dados do livro."
      );
    } finally {
      this.carregando.set(false);
    }
  }

  async alterarStatus(status: StatusLivro): Promise<void> {
    const atual = this.livro();
    if (!atual) return;

    this.processando.set(true);

    try {
      const atualizado =
        await this.service.alterarStatus(atual.id, status);

      this.livro.set(atualizado);
    } catch {
      this.erro.set(
        "Não foi possível alterar o status do livro."
      );
    } finally {
      this.processando.set(false);
    }
  }

  async excluir(): Promise<void> {
    const atual = this.livro();
    if (!atual) return;

    this.processando.set(true);

    try {
      await this.service.excluir(atual.id);
      void this.router.navigateByUrl("/livros");
    } catch {
      this.erro.set(
        "Não foi possível excluir o livro."
      );
      this.processando.set(false);
    }
  }
}
