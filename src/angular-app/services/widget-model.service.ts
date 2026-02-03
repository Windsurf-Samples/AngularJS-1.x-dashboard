/**
 * WidgetModel Service
 * 
 * Angular service that creates widget instances from widget definitions.
 * Migrated from AngularJS factory in src/components/models/WidgetModel.js
 * 
 * This service is downgraded to be accessible from AngularJS code.
 */

import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {
  WidgetDefinition,
  WidgetStyle,
  WidgetSize,
  WidgetContainerStyle,
  WidgetContentStyle,
  SerializedWidget,
  WidgetOverrides
} from '../interfaces';

/**
 * Default widget configuration
 */
function getDefaults(): {
  title: string;
  style: WidgetStyle;
  size: WidgetSize;
  enableVerticalResize: boolean;
  containerStyle: WidgetContainerStyle;
  contentStyle: WidgetContentStyle;
} {
  return {
    title: 'Widget',
    style: {},
    size: { width: '33%' },
    enableVerticalResize: true,
    containerStyle: { width: '33%' },
    contentStyle: {}
  };
}

/**
 * WidgetModel class - represents a widget instance
 */
export class WidgetModel {
  // Required properties
  name!: string;
  title!: string;
  style!: WidgetStyle;
  size!: WidgetSize;
  enableVerticalResize!: boolean;
  containerStyle!: WidgetContainerStyle;
  contentStyle!: WidgetContentStyle;
  
  // Optional properties from widget definition
  templateUrl?: string;
  template?: string;
  directive?: string;
  attrs?: Record<string, unknown>;
  dataAttrName?: string;
  dataModelType?: new () => unknown;
  dataModelOptions?: Record<string, unknown>;
  settingsModalOptions?: Record<string, unknown>;
  onSettingsClose?: (result: unknown, widget: WidgetModel, scope: unknown) => void;
  onSettingsDismiss?: (reason: unknown, scope: unknown) => void;
  storageHash?: string;
  widthUnits?: string;
  
  // Allow additional properties
  [key: string]: unknown;

  constructor(widgetDefinition: WidgetDefinition, overrides?: WidgetOverrides) {
    // Extend this with defaults, then widget definition with overrides merged in (deep extended)
    const defaults = getDefaults();
    const merged = _.merge({}, widgetDefinition, overrides || {});
    Object.assign(this, defaults, merged);

    this.updateContainerStyle(this.style);

    if (!this.templateUrl && !this.template && !this.directive) {
      this.directive = widgetDefinition.name;
    }

    if (this.size && _.has(this.size, 'height')) {
      this.setHeight(this.size.height as string);
    }

    // TODO: deprecate style attribute
    if (this.style && _.has(this.style, 'width')) {
      this.setWidth(this.style.width as string);
    }

    if (this.size && _.has(this.size, 'width')) {
      this.setWidth(this.size.width as string);
    }
  }

  /**
   * Sets the width (and widthUnits)
   * @param width - Width value as string or number
   * @param units - Optional units (defaults to extracted from width or '%')
   * @returns The formatted width string or undefined if invalid
   */
  setWidth(width: string | number, units?: string): string | undefined {
    const widthStr = width.toString();
    units = units || widthStr.replace(/^[-.\d]+/, '') || '%';

    this.widthUnits = units;
    let widthNum = parseFloat(widthStr);

    // Check with min width if set, unit refer to width's unit
    if (this.size && _.has(this.size, 'minWidth') && _.endsWith(this.size.minWidth, units)) {
      widthNum = _.max([parseFloat(this.size.minWidth as string), widthNum]) as number;
    }
    
    if (widthNum < 0 || isNaN(widthNum)) {
      console.warn('malhar-angular-dashboard: setWidth was called when width was ' + widthNum);
      return undefined;
    }

    if (units === '%') {
      widthNum = Math.min(100, widthNum);
      widthNum = Math.max(0, widthNum);
    }

    this.containerStyle.width = widthNum + '' + units;
    this.updateSize(this.containerStyle);

    return widthNum + units;
  }

  /**
   * Sets the height of the widget content
   * @param height - Height value as string
   * @returns The formatted height string
   */
  setHeight(height: string): string {
    this.contentStyle.height = height;
    this.updateSize(this.contentStyle);
    return height + 'px';
  }

  /**
   * Sets the style of the widget
   * @param style - Style object to apply
   */
  setStyle(style: WidgetStyle): void {
    this.style = style;
    this.updateContainerStyle(style);
  }

  /**
   * Updates the size object with new values
   * @param size - Partial size object to merge
   */
  updateSize(size: Partial<WidgetSize | WidgetContainerStyle | WidgetContentStyle>): void {
    Object.assign(this.size, size);
  }

  /**
   * Updates the container style with new values
   * @param style - Partial style object to merge
   */
  updateContainerStyle(style: Partial<WidgetContainerStyle | WidgetStyle>): void {
    Object.assign(this.containerStyle, style);
  }

  /**
   * Serializes the widget for storage
   * @returns Serialized widget object
   */
  serialize(): SerializedWidget {
    return _.pick(this, ['title', 'name', 'style', 'size', 'dataModelOptions', 'attrs', 'storageHash']) as SerializedWidget;
  }
}

/**
 * WidgetModelService - Angular service for creating WidgetModel instances
 * 
 * This service acts as a factory for creating WidgetModel instances,
 * maintaining compatibility with the original AngularJS factory pattern.
 */
@Injectable({
  providedIn: 'root'
})
export class WidgetModelService {
  /**
   * Creates a new WidgetModel instance
   * @param widgetDefinition - The widget definition object
   * @param overrides - Optional overrides for the widget
   * @returns A new WidgetModel instance
   */
  create(widgetDefinition: WidgetDefinition, overrides?: WidgetOverrides): WidgetModel {
    return new WidgetModel(widgetDefinition, overrides);
  }

  /**
   * Returns the WidgetModel constructor for direct instantiation
   * This maintains compatibility with AngularJS code that uses `new WidgetModel(...)`
   */
  getModelClass(): typeof WidgetModel {
    return WidgetModel;
  }
}
