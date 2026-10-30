import type { Knex } from "knex";

type ContentData = { title: string; content: string };

const contentsByCourse: Record<string, Record<string, ContentData[]>> = {
    "NODE-101": {
        "Introdução ao Node.js": [
            {
                title: "O que é o Node.js",
                content: "Node.js é um ambiente que executa JavaScript fora do navegador, usando o motor V8.",
            },
        ],
        "Módulos e npm": [
            {
                title: "Instalando pacotes com npm",
                content: "O npm instala dependências listadas no package.json com o comando npm install.",
            },
        ],
        "Programação assíncrona": [
            {
                title: "Entendendo Promises",
                content: "Uma Promise representa um valor que estará disponível no futuro, ou um erro.",
            },
        ],
    },
    "TS-101": {
        "Tipos básicos": [
            {
                title: "string, number e boolean",
                content: "Os tipos primitivos do TypeScript correspondem aos tipos primitivos do JavaScript.",
            },
            {
                title: "Arrays e tuplas",
                content: "Arrays guardam vários valores do mesmo tipo; tuplas têm tamanho e tipos fixos por posição.",
            },
        ],
        "Interfaces e tipos": [
            {
                title: "Criando interfaces",
                content: "Uma interface descreve o formato de um objeto: suas propriedades e seus tipos.",
            },
            {
                title: "type vs interface",
                content: "Ambos descrevem objetos; type também aceita uniões e tipos primitivos.",
            },
        ],
        Generics: [
            {
                title: "Funções genéricas",
                content: "Generics permitem escrever funções que funcionam com vários tipos sem perder a tipagem.",
            },
        ],
    },
    "SQL-101": {
        "Consultas básicas": [
            {
                title: "SELECT e WHERE",
                content: "SELECT escolhe as colunas e WHERE filtra as linhas retornadas pela consulta.",
            },
            {
                title: "Ordenação com ORDER BY",
                content: "ORDER BY ordena o resultado por uma ou mais colunas, em ordem crescente ou decrescente.",
            },
        ],
        "Relacionamentos e JOINs": [
            {
                title: "INNER JOIN",
                content: "INNER JOIN retorna apenas as linhas que têm correspondência nas duas tabelas.",
            },
            {
                title: "LEFT JOIN",
                content: "LEFT JOIN retorna todas as linhas da tabela da esquerda, mesmo sem correspondência.",
            },
        ],
    },
};

export async function seed(knex: Knex): Promise<void> {
    await knex.raw("TRUNCATE TABLE contents RESTART IDENTITY CASCADE");

    const modules = await knex("modules")
        .join("courses", "courses.id", "modules.course_id")
        .select("modules.id", "modules.title", "courses.code")
        .orderBy("modules.id");

    await knex("contents").insert(
        modules.flatMap((moduleRow) =>
            (contentsByCourse[moduleRow.code]?.[moduleRow.title] ?? []).map((contentData) => ({
                ...contentData,
                module_id: moduleRow.id,
            })),
        ),
    );
}
