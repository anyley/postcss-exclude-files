// flow-typed signature: d1df4d7af5063e17da979549c8e9e169
// flow-typed version: 66247d18b3/multimatch_v2.x.x/flow_>=v0.37.x

declare module "multimatch" {
  declare type Options = {|
    debug?: boolean,
    dot?: boolean,
    flipNegate?: boolean,
    matchBase?: boolean,
    nobrace?: boolean,
    nocase?: boolean,
    nocommnet?: boolean,
    noext?: boolean,
    noglobstar?: boolean,
    nonegate?: boolean,
    nonull?: boolean
  |};

  declare function multimatch(
    paths: string | string[],
    patterns: string | string[],
    options?: Options
  ): string[];

  declare module.exports: typeof multimatch;
}
