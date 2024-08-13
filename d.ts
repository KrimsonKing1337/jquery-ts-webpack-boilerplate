// declaration.d.ts
declare module '*.scss';

declare module '*.json';

declare module '*.svg' {
  const content: any;
  export default content;
}

declare const isSbMode: boolean;
