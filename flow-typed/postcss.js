import { Plugins } from "postcss"


declare module 'postcss' {
  declare export type Filter = string | string[]
  declare export type Plugins = Function | Object | Function[] | Object[]

  declare export type Options = {| filter: Filter, plugins: Plugins |}

  declare type PostCSSInstance = postcss & {|
    process: (any) => any,
    plugin: (string, (Options) => (any, any) => typeof Promise | void) => any
  |}

  declare type postcss =
    | PostCSSInstance
    | (Plugins | Plugins[], ?Object) => PostCSSInstance

  declare module.exports: postcss
}
