import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Livro } from "../models/livro";
import { LivrosService } from "./livros.service";

describe("LivrosService", () => {
  let service: LivrosService;
  let httpMock: HttpTestingController;

  const livrosMock: Livro[] = [
    {
      id: 1,
      titulo: "Clean Code",
      autor: "Robert C. Martin",
      categoria: "Tecnologia",
      ano: 2008,
      status: "disponivel",
      descricao: "Boas práticas de desenvolvimento."
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(LivrosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("deve ser criado", () => {
    expect(service).toBeTruthy();
  });

  it("deve listar os livros", async () => {
    const promessa = service.listar();

    const requisicao = httpMock.expectOne(
      "http://localhost:3000/api/livros"
    );
    expect(requisicao.request.method).toBe("GET");
    requisicao.flush(livrosMock);

    const livros = await promessa;
    expect(livros).toHaveLength(1);
    expect(livros[0].titulo).toBe("Clean Code");
  });

  it("deve buscar um livro por id", async () => {
    const promessa = service.buscarPorId(1);

    const requisicao = httpMock.expectOne(
      "http://localhost:3000/api/livros/1"
    );
    expect(requisicao.request.method).toBe("GET");
    requisicao.flush(livrosMock[0]);

    const livro = await promessa;
    expect(livro?.titulo).toBe("Clean Code");
  });

  it("deve cadastrar um novo livro", async () => {
    const novoLivro = {
      titulo: "O Programador Pragmático",
      autor: "David Thomas",
      categoria: "Tecnologia",
      ano: 1999,
      status: "disponivel" as const
    };

    const promessa = service.cadastrar(novoLivro);

    const requisicao = httpMock.expectOne(
      "http://localhost:3000/api/livros"
    );
    expect(requisicao.request.method).toBe("POST");
    requisicao.flush({ id: 2, ...novoLivro });

    const livroCriado = await promessa;
    expect(livroCriado.id).toBe(2);
  });
});
