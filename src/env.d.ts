/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "*.riv" {
  const value: any; // Add better type definitions here if desired.
  export default value;
}
