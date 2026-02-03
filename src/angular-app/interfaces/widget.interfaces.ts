/**
 * TypeScript interfaces for widget-related data structures
 * Used by both Angular and AngularJS code through the hybrid application
 */

/**
 * Widget size configuration
 */
export interface WidgetSize {
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
}

/**
 * Widget style configuration
 */
export interface WidgetStyle {
  width?: string;
  height?: string;
  minWidth?: string;
  [key: string]: string | undefined;
}

/**
 * Widget container style
 */
export interface WidgetContainerStyle {
  width: string;
  [key: string]: string;
}

/**
 * Widget content style
 */
export interface WidgetContentStyle {
  height?: string;
  [key: string]: string | undefined;
}

/**
 * Data model options for widgets
 */
export interface DataModelOptions {
  [key: string]: unknown;
}

/**
 * Widget attributes
 */
export interface WidgetAttrs {
  [key: string]: unknown;
}

/**
 * Settings modal options for widget configuration dialogs
 */
export interface SettingsModalOptions {
  templateUrl?: string;
  controller?: string;
  [key: string]: unknown;
}

/**
 * Widget Definition Object (WDO)
 * Blueprint for creating widget instances
 */
export interface WidgetDefinition {
  name: string;
  title?: string;
  templateUrl?: string;
  template?: string;
  directive?: string;
  attrs?: WidgetAttrs;
  dataAttrName?: string;
  dataModelType?: new () => unknown;
  dataModelOptions?: DataModelOptions;
  style?: WidgetStyle;
  size?: WidgetSize;
  enableVerticalResize?: boolean;
  settingsModalOptions?: SettingsModalOptions;
  onSettingsClose?: (result: unknown, widget: WidgetInstance, scope: unknown) => void;
  onSettingsDismiss?: (reason: unknown, scope: unknown) => void;
  storageHash?: string;
  [key: string]: unknown;
}

/**
 * Serialized widget data for storage
 */
export interface SerializedWidget {
  title: string;
  name: string;
  style?: WidgetStyle;
  size?: WidgetSize;
  dataModelOptions?: DataModelOptions;
  attrs?: WidgetAttrs;
  storageHash?: string;
}

/**
 * Widget instance - created from a WidgetDefinition with optional overrides
 */
export interface WidgetInstance extends WidgetDefinition {
  title: string;
  style: WidgetStyle;
  size: WidgetSize;
  enableVerticalResize: boolean;
  containerStyle: WidgetContainerStyle;
  contentStyle: WidgetContentStyle;
  widthUnits?: string;
  
  setWidth(width: string | number, units?: string): string | undefined;
  setHeight(height: string): string;
  setStyle(style: WidgetStyle): void;
  updateSize(size: Partial<WidgetSize>): void;
  updateContainerStyle(style: Partial<WidgetContainerStyle>): void;
  serialize(): SerializedWidget;
}

/**
 * Widget overrides - partial widget definition for customization
 */
export interface WidgetOverrides {
  title?: string;
  name?: string;
  style?: Partial<WidgetStyle>;
  size?: Partial<WidgetSize>;
  dataModelOptions?: DataModelOptions;
  attrs?: WidgetAttrs;
  storageHash?: string;
  [key: string]: unknown;
}
