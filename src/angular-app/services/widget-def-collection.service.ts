/**
 * WidgetDefCollection Service
 * 
 * Angular service that manages the collection of widget definitions.
 * Migrated from AngularJS factory in src/components/models/WidgetDefCollection.js
 * 
 * This service is downgraded to be accessible from AngularJS code.
 */

import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { WidgetDefinition, WidgetDefCollectionInterface } from '../interfaces';

/**
 * Type for widget definition input - can be an object or a constructor function
 */
type WidgetDefInput = WidgetDefinition | (new () => WidgetDefinition) | (() => WidgetDefinition);

/**
 * Converts a widget definition constructor function to a definition object
 * @param d - Widget definition or constructor function
 * @returns Widget definition object
 */
function convertToDefinition(d: WidgetDefInput): WidgetDefinition {
  if (typeof d === 'function') {
    // Try to call as constructor first, fall back to regular function call
    try {
      return new (d as new () => WidgetDefinition)();
    } catch {
      return (d as () => WidgetDefinition)();
    }
  }
  return d;
}

/**
 * WidgetDefCollection class - manages a collection of widget definitions
 * Uses composition instead of inheritance to avoid Array method conflicts
 */
export class WidgetDefCollection implements WidgetDefCollectionInterface {
  /**
   * Internal array of widget definitions
   */
  private _items: WidgetDefinition[] = [];
  
  /**
   * Map of widget definitions by name for quick lookup
   * Named 'map' for backward compatibility with AngularJS code
   */
  map: { [name: string]: WidgetDefinition } = {};

  /**
   * Length property for array-like access
   */
  get length(): number {
    return this._items.length;
  }

  /**
   * Index signature for array-like access
   */
  [index: number]: WidgetDefinition;

  constructor(widgetDefs: WidgetDefInput[]) {
    // Convert all definitions
    const convertedDefs = widgetDefs.map(convertToDefinition);
    
    // Store definitions
    this._items = convertedDefs;

    // Build (name -> widget definition) map for widget lookup by name
    _.each(convertedDefs, (widgetDef, index) => {
      this.map[widgetDef.name] = widgetDef;
      // Also set numeric index for array-like access
      (this as Record<number, WidgetDefinition>)[index] = widgetDef;
    });
  }

  /**
   * Gets a widget definition by name
   * @param name - The name of the widget definition to retrieve
   * @returns The widget definition or undefined if not found
   */
  getByName(name: string): WidgetDefinition | undefined {
    return this.map[name];
  }

  /**
   * Adds a new widget definition to the collection
   * @param def - Widget definition or constructor function to add
   */
  add(def: WidgetDefInput): void {
    const convertedDef = convertToDefinition(def);
    const index = this._items.length;
    this._items.push(convertedDef);
    this.map[convertedDef.name] = convertedDef;
    (this as Record<number, WidgetDefinition>)[index] = convertedDef;
  }

  /**
   * Push method for array-like behavior
   */
  push(...items: WidgetDefinition[]): number {
    items.forEach(item => {
      const index = this._items.length;
      this._items.push(item);
      (this as Record<number, WidgetDefinition>)[index] = item;
    });
    return this._items.length;
  }

  /**
   * Iterator for for...of loops
   */
  [Symbol.iterator](): Iterator<WidgetDefinition> {
    return this._items[Symbol.iterator]();
  }

  /**
   * forEach method for iteration
   */
  forEach(callback: (value: WidgetDefinition, index: number, array: WidgetDefinition[]) => void): void {
    this._items.forEach(callback);
  }
}

/**
 * WidgetDefCollectionService - Angular service for creating WidgetDefCollection instances
 * 
 * This service acts as a factory for creating WidgetDefCollection instances,
 * maintaining compatibility with the original AngularJS factory pattern.
 */
@Injectable({
  providedIn: 'root'
})
export class WidgetDefCollectionService {
  /**
   * Creates a new WidgetDefCollection instance
   * @param widgetDefs - Array of widget definitions or constructor functions
   * @returns A new WidgetDefCollection instance
   */
  create(widgetDefs: Array<WidgetDefinition | (() => WidgetDefinition)>): WidgetDefCollection {
    return new WidgetDefCollection(widgetDefs);
  }

  /**
   * Returns the WidgetDefCollection constructor for direct instantiation
   * This maintains compatibility with AngularJS code that uses `new WidgetDefCollection(...)`
   */
  getCollectionClass(): typeof WidgetDefCollection {
    return WidgetDefCollection;
  }
}
