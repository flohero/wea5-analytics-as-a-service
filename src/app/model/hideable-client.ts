import {Client} from "./client";

export interface Hideable {
  hidden?: boolean
}

export type HideableClient = Client & Hideable
