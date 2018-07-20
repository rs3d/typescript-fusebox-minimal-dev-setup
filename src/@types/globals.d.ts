declare const __CLIENT__: Boolean;
declare const __SERVER__: Boolean;
declare const __DEVELOPMENT__: Boolean;
declare const NODE_ENV: string;


declare module '*.scss' {
  const content: string;
  export default content;
}
declare module "*.css" {
  const content: string;
  export default content;
}
declare module "*.html" {
  const content: string;
  export default content;
}