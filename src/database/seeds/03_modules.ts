import type { Knex } from "knex";

const modulesByCourse: Record<string, { title: string; description: string }[]> = {
    "NODE-101": [
        { title: "Introdução ao Node.js", description: "O que é o Node.js, instalação e o primeiro script." },
        { title: "Módulos e npm", description: "Sistema de módulos e gerenciamento de pacotes." },
        { title: "Programação assíncrona", description: "Callbacks, Promises e async/await." },
        { title: "Sistema de arquivos", description: "Leitura e escrita de arquivos com o módulo fs." },
        { title: "Criando um servidor HTTP", description: "Uma API simples com o módulo http." },
    ],
    "TS-101": [
        { title: "Tipos básicos", description: "Tipos primitivos, arrays e tuplas." },
        { title: "Interfaces e tipos", description: "Modelando objetos com interface e type." },
        { title: "Generics", description: "Funções e tipos reutilizáveis com generics." },
    ],
    "SQL-101": [
        { title: "Consultas básicas", description: "SELECT, WHERE e ORDER BY." },
        { title: "Relacionamentos e JOINs", description: "Combinando tabelas com INNER e LEFT JOIN." },
    ],
};

export async function seed(knex: Knex): Promise<void> {
    await knex.raw("TRUNCATE TABLE modules RESTART IDENTITY CASCADE");

    const courses = await knex("courses").select("id", "code", "user_id").orderBy("id");

    await knex("modules").insert(
        courses.flatMap((course) =>
            (modulesByCourse[course.code] ?? []).map((moduleData) => ({
                ...moduleData,
                course_id: course.id,
                user_id: course.user_id,
            })),
        ),
    );
}
