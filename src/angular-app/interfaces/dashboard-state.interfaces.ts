/**
 * TypeScript interfaces for dashboard state management
 */

import { SerializedWidget, WidgetDefinition } from './widget.interfaces';

/**
 * Storage interface for dashboard state persistence
 * Can be localStorage, sessionStorage, or custom storage implementation
 */
export interface DashboardStorage {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | boolean | Promise<void | boolean>;
  removeItem(key: string): void;
}

/**
 * Serialized dashboard state stored in storage
 */
export interface SerializedDashboardState {
  widgets: SerializedWidget[];
  hash: string;
}

/**
 * Dashboard state configuration
 */
export interface DashboardStateConfig {
  storage: DashboardStorage | null;
  id: string;
  hash: string;
  widgetDefinitions: WidgetDefCollectionInterface;
  stringify: boolean;
}

/**
 * Widget definition collection interface
 */
export interface WidgetDefCollectionInterface {
  getByName(name: string): WidgetDefinition | undefined;
  add(def: WidgetDefinition | (() => WidgetDefinition)): void;
  map: { [name: string]: WidgetDefinition };
  length: number;
  [index: number]: WidgetDefinition;
}

/**
 * Dashboard state load result
 */
export interface DashboardStateLoadResult {
  widgets: SerializedWidget[];
  isFromStorage: boolean;
}
