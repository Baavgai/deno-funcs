# deno-funcs

My parking spot for [deno](https://github.com/denoland/deno) functions I want handy.


## getDenoDir

When you run `deno info` you helpfully get the current DENO_DIR.  Sadly, there doesn't seem to be any way to grab this from that `Deno` global.  But, well, you can pluck it out of the stdout from `deno info`.

## getTsConfig

This outputs a bare bones `tsconfig.json` for use in projects.  This the paths are going to be specific to the environment, this need be done on an individual basis.


## readAllLines

Honestly, why isn't this one baked in?
