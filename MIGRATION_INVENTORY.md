# AngularJS 1.x Dashboard - Migration Inventory

This document provides a complete inventory of the existing AngularJS 1.x dashboard codebase to support the migration to Angular 20.x.

## Module Definition

The main module is defined in `src/components/directives/dashboard/dashboard.js`:
- **Module Name**: `ui.dashboard`
- **Dependencies**: `ui.bootstrap`, `ui.sortable`

The demo application module is defined in `src/app/demo.js`:
- **Module Name**: `app`
- **Dependencies**: `ngRoute`, `ui.dashboard`, `btford.markdown`

## Controllers

### Core Dashboard Controllers

| Controller Name | File Location | Description |
|----------------|---------------|-------------|
| `DashboardWidgetCtrl` | `src/components/directives/widget/DashboardWidgetCtrl.js` | Manages individual widget behavior including resizing, title editing, template compilation, and widget lifecycle |
| `WidgetSettingsCtrl` | `src/components/directives/dashboard/WidgetSettingsCtrl.js` | Default controller for widget settings modal dialog |
| `SaveChangesModalCtrl` | `src/components/directives/dashboardLayouts/SaveChangesModalCtrl.js` | Controller for the save changes confirmation modal when switching layouts |

### Demo Application Controllers

| Controller Name | File Location | Description |
|----------------|---------------|-------------|
| `NavBarCtrl` | `src/app/demo.js` | Navigation bar controller exposing $route to scope |
| `DemoCtrl` | `src/app/demo.js` | Main demo controller with basic dashboard configuration |
| `ResizeDemoCtrl` | `src/app/resize.js` | Demo controller showcasing widget resizing features |
| `ResizableCtrl` | `src/app/resize.js` | Controller for resizable widget handling widgetResized events |
| `CustomSettingsDemoCtrl` | `src/app/customWidgetSettings.js` | Demo controller for custom widget settings functionality |
| `WidgetSpecificSettingsCtrl` | `src/app/customWidgetSettings.js` | Controller for widget-specific settings modal |
| `ExplicitSaveDemoCtrl` | `src/app/explicitSave.js` | Demo controller for explicit save functionality |
| `LayoutsDemoCtrl` | `src/app/layouts.js` | Demo controller for multiple dashboard layouts |
| `LayoutsDemoExplicitSaveCtrl` | `src/app/layouts.js` | Demo controller for layouts with explicit saving |
| `DynamicOptionsCtrl` | `src/app/dynamicOptions.js` | Demo controller for dynamic dashboard options |
| `PeopleCtrl` | `src/app/dynamicOptions.js` | Controller for people list/thumbnail widgets |
| `DynamicDataCtrl` | `src/app/dynamicData.js` | Demo controller for dynamic data updates |
| `CartCtrl` | `src/app/dynamicData.js` | Controller for cart widget functionality |

## Directives

### Core Dashboard Directives

| Directive Name | File Location | Description |
|----------------|---------------|-------------|
| `dashboard` | `src/components/directives/dashboard/dashboard.js` | Main dashboard directive that orchestrates widget management, state persistence, and widget operations |
| `dashboardLayouts` | `src/components/directives/dashboardLayouts/dashboardLayouts.js` | Multi-layout management directive for switching between dashboard configurations |
| `widget` | `src/components/directives/widget/widget.js` | Individual widget directive that handles data model setup and template compilation |

### Demo Application Directives

| Directive Name | File Location | Description |
|----------------|---------------|-------------|
| `wtTime` | `src/app/directives.js` | Time display widget that updates every 500ms |
| `wtScopeWatch` | `src/app/directives.js` | Widget that displays a watched scope value |
| `wtFluid` | `src/app/directives.js` | Fluid/responsive widget that responds to resize events |

## Services (Factories)

### Core Dashboard Services

| Service Name | File Location | Description |
|-------------|---------------|-------------|
| `WidgetModel` | `src/components/models/WidgetModel.js` | Factory for creating widget instances with sizing, styling, and serialization capabilities |
| `DashboardState` | `src/components/models/DashboardState.js` | Service for dashboard state persistence (save/load) with localStorage or custom storage |
| `LayoutStorage` | `src/components/models/LayoutStorage.js` | Service for persisting multiple dashboard layouts and managing layout switching |
| `WidgetDefCollection` | `src/components/models/WidgetDefCollection.js` | Collection management for widget definitions with name-based lookup |
| `WidgetDataModel` | `src/components/models/WidgetDataModel.js` | Base factory for widget data models enabling real-time data integration |

### Demo Application Services

| Service Name | File Location | Description |
|-------------|---------------|-------------|
| `widgetDefinitions` | `src/app/demo.js` | Factory providing default widget definition objects |
| `RandomDataModel` | `src/app/dataModel.js` | Data model that generates random values at intervals |
| `CartDataModel` | `src/app/cartDataModel.js` | Data model for shopping cart functionality with item management |

### Values

| Value Name | File Location | Description |
|-----------|---------------|-------------|
| `defaultWidgets` | `src/app/demo.js` | Default widget configuration array |

## Templates

### Core Dashboard Templates

| Template | File Location | Description |
|----------|---------------|-------------|
| `dashboard.html` | `src/components/directives/dashboard/dashboard.html` | Main dashboard template with toolbar and widget area |
| `altDashboard.html` | `src/components/directives/dashboard/altDashboard.html` | Alternative dashboard template |
| `widget-settings-template.html` | `src/components/directives/dashboard/widget-settings-template.html` | Default widget settings modal template |
| `dashboardLayouts.html` | `src/components/directives/dashboardLayouts/dashboardLayouts.html` | Layout tabs and management UI |
| `SaveChangesModal.html` | `src/components/directives/dashboardLayouts/SaveChangesModal.html` | Save changes confirmation modal |

### Demo Application Templates

Located in `src/app/template/`:
- `view.html` - Main demo view template
- `layouts.html` - Layouts demo template
- `resizable.html` - Resizable widget template
- `fluid.html` - Fluid widget template
- `dynamicOptions.html` - Dynamic options demo template
- `dynamicOptionsContainer.html` - Container for dynamic options widgets
- `peopleList.html` - People list view template
- `peopleThumbnail.html` - People thumbnail view template
- `dynamicData.html` - Dynamic data demo template
- `cartDetail.html` - Cart detail widget template
- `cartSummary.html` - Cart summary widget template
- `configurableWidgetModalOptions.html` - Configurable widget settings template
- `WidgetSpecificSettings.html` - Widget-specific settings template

## Critical Features and Functionality

### Dashboard Core Features

1. **Widget Management**
   - Add widgets from predefined definitions
   - Remove widgets from dashboard
   - Drag-and-drop widget reordering (via ui.sortable)
   - Widget title editing (inline)

2. **Widget Resizing**
   - 8-direction resize handles (n, ne, e, se, s, sw, w, nw)
   - Percentage and pixel-based widths
   - Min/max width and height constraints
   - Height-to-width ratio maintenance
   - Visual resize marquee feedback

3. **State Persistence**
   - Automatic save to localStorage (or custom storage)
   - Storage hash validation for stale data detection
   - Explicit save mode option
   - Unsaved change tracking

4. **Multi-Layout Support**
   - Multiple dashboard configurations
   - Layout switching with unsaved changes prompt
   - Layout creation, removal, and renaming
   - Per-layout widget configurations
   - Locked default layouts option

5. **Widget Settings**
   - Modal-based settings dialog
   - Customizable settings templates
   - Per-widget and dashboard-wide settings overrides
   - onSettingsClose and onSettingsDismiss callbacks

6. **Data Models**
   - Widget data model integration
   - Real-time data updates
   - Custom data model types
   - Data model lifecycle management (init, destroy)

### External Dependencies (Bower)

| Dependency | Version | Purpose |
|-----------|---------|---------|
| `angular` | ~1.4 | Core AngularJS framework |
| `angular-bootstrap` | >=1.0.0 | UI Bootstrap components ($uibModal) |
| `angular-sanitize` | ~1.5.8 | HTML sanitization |
| `angular-ui-sortable` | ~0.13.4 | Drag-and-drop sorting |
| `bootstrap` | ~3.3.6 | CSS framework |
| `lodash` | ~4.5.1 | Utility library |

### Dev Dependencies (Bower)

| Dependency | Version | Purpose |
|-----------|---------|---------|
| `angular-mocks` | ~1.4 | Testing utilities |
| `angular-route` | ~1.3 | Routing for demo app |
| `angular-markdown-directive` | ~0.3.1 | Markdown rendering for demo |

## Build System (Current - Gulp)

### Gulp Tasks (from gulpfile.js and gulp/ directory)

- Build tasks for LESS compilation
- Template caching (angular-templatecache)
- JavaScript concatenation and minification
- Development server with browser-sync
- Unit testing with Karma

### Current npm Scripts

```json
{
  "test": "gulp test"
}
```

## File Structure Summary

```
src/
├── components/
│   ├── directives/
│   │   ├── dashboard/
│   │   │   ├── dashboard.js          # Main dashboard directive
│   │   │   ├── dashboard.html        # Dashboard template
│   │   │   ├── dashboard.less        # Dashboard styles
│   │   │   ├── WidgetSettingsCtrl.js # Settings controller
│   │   │   └── widget-settings-template.html
│   │   ├── dashboardLayouts/
│   │   │   ├── dashboardLayouts.js   # Layouts directive
│   │   │   ├── dashboardLayouts.html # Layouts template
│   │   │   ├── SaveChangesModalCtrl.js
│   │   │   └── SaveChangesModal.html
│   │   └── widget/
│   │       ├── widget.js             # Widget directive
│   │       └── DashboardWidgetCtrl.js # Widget controller
│   └── models/
│       ├── WidgetModel.js            # Widget model factory
│       ├── DashboardState.js         # State persistence
│       ├── LayoutStorage.js          # Layout storage
│       ├── WidgetDefCollection.js    # Widget definitions
│       └── WidgetDataModel.js        # Base data model
├── app/
│   ├── demo.js                       # Main demo module
│   ├── directives.js                 # Demo directives
│   ├── dataModel.js                  # RandomDataModel
│   ├── cartDataModel.js              # CartDataModel
│   ├── layouts.js                    # Layout demo controllers
│   ├── resize.js                     # Resize demo controllers
│   ├── explicitSave.js               # Explicit save demo
│   ├── customWidgetSettings.js       # Custom settings demo
│   ├── dynamicOptions.js             # Dynamic options demo
│   ├── dynamicData.js                # Dynamic data demo
│   └── template/                     # Demo templates
└── index.html                        # Main entry point
```

## Migration Considerations

1. **Controllers to Components**: All controllers will need to be converted to Angular components
2. **Directives to Components**: AngularJS directives will become Angular components with @Input/@Output decorators
3. **Services**: Factories will become injectable services with @Injectable decorator
4. **Templates**: Templates will need to be updated for Angular template syntax
5. **Dependencies**: 
   - ui.bootstrap -> @angular/material or ng-bootstrap
   - ui.sortable -> @angular/cdk/drag-drop
   - lodash -> Consider native ES6+ methods or keep lodash
6. **State Management**: Consider using RxJS BehaviorSubjects or NgRx for state
7. **Routing**: ngRoute -> @angular/router
