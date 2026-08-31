import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Livro, NovoLivro, StatusLivro } from "../models/livro";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class LivrosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/livros`;

  async listar(): Promise<Livro[]> {
    return firstValueFrom(this.http.get<Livro[]>(this.apiUrl));
  }

  async buscarPorId(id: number): Promise<Livro | undefined> {
    try {
      return await firstValueFrom(this.http.get<Livro>(`${this.apiUrl}/${id}`));
    } catch (erro) {
      if (erro instanceof HttpErrorResponse && erro.status === 404) {
        return undefined;
      }
      throw erro;
    }
  }

  async cadastrar(livro: NovoLivro): Promise<Livro> {
    return firstValueFrom(this.http.post<Livro>(this.apiUrl, livro));
  }

  async alterarStatus(id: number, status: StatusLivro): Promise<Livro> {
    return firstValueFrom(
      this.http.put<Livro>(`${this.apiUrl}/${id}`, { status })
    );
  }

  async excluir(id: number): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
}
