import type { Knex } from "knex";

const viewedContentsByUser: Record<string, string[]> = {
    "ana.souza@example.com": ["string, number and boolean"],
    "bruno.lima@example.com": ["What is Node.js", "Installing packages with npm", "Understanding Promises"],
    "carla.mendes@example.com": ["What is Node.js", "string, number and boolean"],
    "diego.santos@example.com": ["What is Node.js", "Installing packages with npm"],
    "elisa.rocha@example.com": ["Installing packages with npm"],
};

export async function seed(knex: Knex): Promise<void> {
    await knex.raw("TRUNCATE TABLE content_views");

    const users = await knex("users").select("id", "email");
    const contents = await knex("contents").select("id", "title");
    const contentId = Object.fromEntries(contents.map((content) => [content.title, content.id]));

    await knex("content_views").insert(
        users.flatMap((user) =>
            (viewedContentsByUser[user.email] ?? []).map((title) => ({
                user_id: user.id,
                content_id: contentId[title],
            })),
        ),
    );
}
