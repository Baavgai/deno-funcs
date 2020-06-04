// import { unimplemented, assert } from "https://deno.land/std/testing/asserts.ts";
import { basename, join, normalize } from "https://deno.land/std/path/mod.ts";
const { readDir, readDirSync, stat, statSync } = Deno;

export interface WalkEntry extends Deno.FileInfo {
    path: string;
    name: string;
}

export interface WalkOptions {
    maxDepth?: number;
    includeFiles?: boolean;
    includeDirs?: boolean;
    followSymlinks?: boolean;
    exts?: string[];
    match?: RegExp[];
    skip?: RegExp[];
    customFilter?: (entry: WalkEntry, depth: number) => boolean;
}

const createEntry = (path: string, info: Deno.FileInfo): WalkEntry =>
    ({ ...info, path, name: basename(path) });

type WalkFilter = (entry: WalkEntry, depth: number, skipOnly?: boolean) => boolean;

const buildFilter = (opts?: WalkOptions): WalkFilter => {
    if (opts === undefined) {
        return (entry: WalkEntry, depth: number, skipOnly = false) => true;
    } else {
        const includeDirs = opts.includeDirs === undefined || opts.includeDirs !== false;
        const includeFiles = opts.includeFiles === undefined || opts.includeFiles !== false;
        return (entry: WalkEntry, depth: number, skipOnly = false): boolean => {
            if (opts.customFilter && !opts.customFilter(entry, depth)) { return false; }
            if (opts.skip && opts.skip.some(x => !!entry.path.match(x))) { return false; }
            if (!skipOnly) {
                if (!includeDirs && entry.isDirectory) { return false; }
                if (!includeFiles && entry.isFile) { return false; }
                if (opts.exts && !opts.exts.some(x => entry.path.endsWith(x))) { return false; }
                if (opts.match && !opts.match.some(x => !!entry.path.match(x))) { return false; }
            }
            return true;
        };
    }
};


/** Walks the file tree rooted at root, yielding each file or directory in the
 * tree filtered according to the given options. The files are walked in lexical
 * order, which makes the output deterministic but means that for very large
 * directories walk() can be inefficient.
 *
 * Options:
 * - maxDepth?: number = Infinity;
 * - includeFiles?: boolean = true;
 * - includeDirs?: boolean = true;
 * - followSymlinks?: boolean = false;
 * - exts?: string[];
 * - match?: RegExp[];
 * - skip?: RegExp[];
 *
 *      for await (const entry of walk(".")) {
 *        console.log(entry.path);
 *        assert(entry.isFile);
 *      };
 * export async function* walk(path: string, opts?: WalkOptions): AsyncIterableIterator<WalkEntry> {
    return walkImpl(createEntry(normalize(path), await stat(path)), { ...DEFAULT_OPTS, ...(opts || {}) });
}
 */
export const walk = (path: string, opts?: WalkOptions): AsyncIterableIterator<WalkEntry> => {
    async function* walkImpl(filter: WalkFilter, root: WalkEntry, depth: number): AsyncIterableIterator<WalkEntry> {
        // yield await root;
        // console.log(root);
        // if (opts.maxDepth < 0) { return; }
        // if (opts.includeDirs && include(root.path, opts)) { yield await root; }
        // if (opts.maxDepth < 1 || !skipCheck(root.path, opts.skip)) { return; }
        if (filter(root, depth)) { yield await root; }
        for await (const entry of readDir(root.path)) {
            const childPath = join(root.path, entry.name);
            const wEntry = createEntry(childPath, await stat(childPath));
            if (entry.isFile) {
                if (filter(wEntry, depth)) { yield await wEntry; }
            } else {
                yield* walkImpl(filter, wEntry, depth + 1);
            }
        }
    };
    return walkImpl(buildFilter(opts), createEntry(normalize(path), statSync(path)), 0);
}

