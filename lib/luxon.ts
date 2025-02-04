import { Settings, DateTime } from "luxon";

Settings.throwOnInvalid = true;

export * from "luxon";

// See https://github.com/DefinitelyTyped/DefinitelyTyped/pull/64995
declare module "luxon" {
  export interface TSSettings {
    throwOnInvalid: true;
  }
}
