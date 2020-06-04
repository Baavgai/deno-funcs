import { getDenoDir } from "./getDenoDir.ts";

/** Returns tsconfig.json template as string
 *
 *      deno eval "import { getTsConfig } from 'https://raw.githubusercontent.com/Baavgai/deno-funcs/master/mod.ts'; console.log(await getTsConfig());" > tsconfig.json
 *      console.log("DENO_DIR info 2", await getDenoDir(true));
 */

export const getTsConfig = async () => {
    const denoDir = await getDenoDir(true);
    const deps = `${denoDir}/deps/http/*`;
    return JSON.stringify({
        "compilerOptions": {
            "target": "es2018", "baseUrl": ".", "paths": {
                "http://*": [deps], "https://*": [deps]
            }
        }
    }, undefined, 2);
};
