import { getDenoDir } from "./getDenoDir.ts";

export const getTsConfig = async () => {
    const denoDir = await getDenoDir(true);
    const deps = `${denoDir}/deps/http/*`;
    return JSON.stringify({
        "compilerOptions": {
            "target": "es2018", "baseUrl": ".", "paths": {
                "http://*": [deps], "https://*": [deps]
            }
        }
    }, undefined, 4);
};
