/**
 * DashboardState Service
 * 
 * Angular service that manages dashboard state persistence to localStorage.
 * Migrated from AngularJS factory in src/components/models/DashboardState.js
 * 
 * This service uses RxJS Observables instead of AngularJS promises.
 * It is downgraded to be accessible from AngularJS code.
 */

import { Injectable } from '@angular/core';
import { Observable, of, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import {
  SerializedWidget,
  WidgetDefinition,
  DashboardStorage,
  SerializedDashboardState,
  WidgetDefCollectionInterface
} from '../interfaces';

/**
 * DashboardState class - manages state persistence for a single dashboard
 */
export class DashboardState {
  private storage: DashboardStorage | null;
  private id: string;
  private hash: string;
  private widgetDefinitions: WidgetDefCollectionInterface;
  private stringify: boolean;

  constructor(
    storage: DashboardStorage | null,
    id: string,
    hash: string,
    widgetDefinitions: WidgetDefCollectionInterface,
    stringify: boolean
  ) {
    this.storage = storage;
    this.id = id;
    this.hash = hash;
    this.widgetDefinitions = widgetDefinitions;
    this.stringify = stringify;
  }

  /**
   * Takes array of widget instance objects, serializes, and saves state.
   * @param widgets - Array of widget instances with serialize() method
   * @returns true on success, false on failure
   */
  save(widgets: Array<{ serialize(): SerializedWidget }>): boolean {
    if (!this.storage) {
      return true;
    }

    const serialized = _.map(widgets, (widget) => widget.serialize());
    let item: SerializedDashboardState | string = { widgets: serialized, hash: this.hash };

    if (this.stringify) {
      item = JSON.stringify(item);
    }

    const result = this.storage.setItem(this.id, item as string);
    return result !== false && result !== undefined ? true : true;
  }

  /**
   * Loads dashboard state from the storage object.
   * Returns an Observable that emits the loaded widget definitions.
   * 
   * @returns Observable of SerializedWidget array, or null if no state found
   */
  load(): Observable<SerializedWidget[] | null> {
    if (!this.storage) {
      return of(null);
    }

    const serialized = this.storage.getItem(this.id);

    if (serialized) {
      // Check if it's a promise
      if (this.isPromise(serialized)) {
        return this.handleAsyncLoad(serialized as Promise<string | null>);
      }
      // Handle synchronous load
      return of(this.handleSyncLoad(serialized as string));
    }

    return of(null);
  }

  /**
   * Synchronous load method for compatibility with AngularJS code
   * @returns Array of SerializedWidget or null
   */
  loadSync(): SerializedWidget[] | null | Promise<SerializedWidget[] | null> {
    if (!this.storage) {
      return null;
    }

    const serialized = this.storage.getItem(this.id);

    if (serialized) {
      // Check if it's a promise - return it for AngularJS to handle
      if (this.isPromise(serialized)) {
        return (serialized as Promise<string | null>).then(
          (res) => this.handleSyncLoad(res),
          () => null
        );
      }
      return this.handleSyncLoad(serialized as string);
    }

    return null;
  }

  /**
   * Type guard to check if a value is a Promise
   */
  private isPromise(value: unknown): value is Promise<unknown> {
    return value !== null && 
           typeof value === 'object' && 
           typeof (value as Promise<unknown>).then === 'function';
  }

  /**
   * Handles synchronous load of serialized data
   */
  private handleSyncLoad(serialized: string | null): SerializedWidget[] | null {
    if (!serialized) {
      return null;
    }

    let deserialized: SerializedDashboardState;

    if (this.stringify) {
      try {
        deserialized = JSON.parse(serialized);
      } catch (e) {
        console.warn('Serialized dashboard state was malformed and could not be parsed: ', serialized);
        return null;
      }
    } else {
      deserialized = serialized as unknown as SerializedDashboardState;
    }

    // Check hash against current hash
    if (deserialized.hash !== this.hash) {
      console.info(
        'Serialized dashboard from storage was stale (old hash: ' + 
        deserialized.hash + ', new hash: ' + this.hash + ')'
      );
      if (this.storage) {
        this.storage.removeItem(this.id);
      }
      return null;
    }

    // Cache widgets
    const savedWidgetDefs = deserialized.widgets;
    const result: SerializedWidget[] = [];

    // Instantiate widgets from stored data
    for (let i = 0; i < savedWidgetDefs.length; i++) {
      const savedWidgetDef = savedWidgetDefs[i];
      const widgetDefinition = this.widgetDefinitions.getByName(savedWidgetDef.name);

      // Check for no widget
      if (!widgetDefinition) {
        console.warn('Widget with name "' + savedWidgetDef.name + '" was not found in given widget definition objects');
        continue;
      }

      // Check widget-specific storageHash
      if (
        Object.prototype.hasOwnProperty.call(widgetDefinition, 'storageHash') &&
        widgetDefinition.storageHash !== savedWidgetDef.storageHash
      ) {
        console.info(
          'Widget Definition Object with name "' + savedWidgetDef.name + '" was found ' +
          'but the storageHash property on the widget definition is different from that on the ' +
          'serialized widget loaded from storage. hash from storage: "' + savedWidgetDef.storageHash + '"' +
          ', hash from WDO: "' + widgetDefinition.storageHash + '"'
        );
        continue;
      }

      // Push instantiated widget to result array
      result.push(savedWidgetDef);
    }

    return result;
  }

  /**
   * Handles asynchronous load from storage that returns a promise
   */
  private handleAsyncLoad(promise: Promise<string | null>): Observable<SerializedWidget[] | null> {
    return from(promise).pipe(
      map((res) => this.handleSyncLoad(res)),
      catchError((error) => {
        console.error('Error loading dashboard state:', error);
        return of(null);
      })
    );
  }
}

/**
 * DashboardStateService - Angular service for creating DashboardState instances
 * 
 * This service acts as a factory for creating DashboardState instances,
 * maintaining compatibility with the original AngularJS factory pattern.
 */
@Injectable({
  providedIn: 'root'
})
export class DashboardStateService {
  /**
   * Creates a new DashboardState instance
   * @param storage - Storage object (localStorage, sessionStorage, or custom)
   * @param id - Storage key identifier
   * @param hash - Hash for validating stored state
   * @param widgetDefinitions - Collection of widget definitions
   * @param stringify - Whether to stringify data before storage
   * @returns A new DashboardState instance
   */
  create(
    storage: DashboardStorage | null,
    id: string,
    hash: string,
    widgetDefinitions: WidgetDefCollectionInterface,
    stringify: boolean
  ): DashboardState {
    return new DashboardState(storage, id, hash, widgetDefinitions, stringify);
  }

  /**
   * Returns the DashboardState constructor for direct instantiation
   * This maintains compatibility with AngularJS code that uses `new DashboardState(...)`
   */
  getStateClass(): typeof DashboardState {
    return DashboardState;
  }
}
