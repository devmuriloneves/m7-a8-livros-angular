import { Component, output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NovoLivro, StatusLivro } from "../../models/livro";

@Component({
  selector: "app-formulario-livro",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./formulario-livro.html",
  styleUrl: "./formulario-livro.css"
})
export class FormularioLivro {
  salvar = output<NovoLivro>();

  titulo = "";
  autor = "";
  categoria = "";
  ano: number | null = null;
  status: StatusLivro = "disponivel";
  descricao = "";

  enviarFormulario(event: Event): void {
    event.preventDefault();

    if (!this.titulo || !this.autor || !this.categoria || !this.ano) {
      return;
    }

    this.salvar.emit({
      titulo: this.titulo,
      autor: this.autor,
      categoria: this.categoria,
      ano: this.ano,
      status: this.status,
      descricao: this.descricao || undefined
    });
  }
}
