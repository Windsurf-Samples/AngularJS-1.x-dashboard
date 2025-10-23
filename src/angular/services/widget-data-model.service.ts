import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WidgetDataModelService {
  dataAttrName: string | undefined;
  dataModelOptions: any;
  widgetScope: any;

  setup(widget: any, scope: any): void {
    this.dataAttrName = widget.dataAttrName;
    this.dataModelOptions = widget.dataModelOptions;
    this.widgetScope = scope;
  }

  updateScope(data: any): void {
    if (this.widgetScope) {
      this.widgetScope.widgetData = data;
    }
  }

  init(): void {
  }

  destroy(): void {
  }
}
