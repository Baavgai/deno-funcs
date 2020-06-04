import { normalize, relative } from "https://deno.land/std/path/mod.ts";

/** Returns current DEN_DIR
 *
 * Optional parameter:
 *   translate: boolean
 *      offers relative path an changes to forward slash for windows
 *
 *      console.log("DENO_DIR info 1", await getDenoDir());
 *      console.log("DENO_DIR info 2", await getDenoDir(true));
 */
export const getDenoDir = async (translate = false) => {
    const fmtWin = (s: string) => Deno.build.os !== "windows" ? s : s.split("\\").join("/");
    const fmt = (s: string) => !translate ? normalize(s) : fmtWin(relative(".", normalize(s)));
    try {
        const p = Deno.run({ cmd: ["deno", "info"], stdout: "piped" });
        const { code } = await p.status();
        if (code === 0) {
            const reDir = new RegExp("DENO_DIR[^\"]*\"\([^\"]*\)");
            const m = reDir.exec(new TextDecoder().decode(await p.output()));
            return m && m.length > 1 ? fmt(m[1]) : undefined;
        }
    } catch {
    }
    return undefined;
};
