export const readAllLines = (filename: string) =>
    Deno.readTextFile(filename).then(txt => txt.replace(/(?:\r?\n)/g, "\n").split("\n"));
