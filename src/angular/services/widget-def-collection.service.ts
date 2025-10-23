import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WidgetDefCollectionService extends Array<any> {
  widgetMap: { [key: string]: any } = {};

  constructor() {
    super();
    Object.setPrototypeOf(this, WidgetDefCollectionService.prototype);
  }

  static fromDefinitions(widgetDefs: any[]): WidgetDefCollectionService {
    const collection = new WidgetDefCollectionService();
    const defs = widgetDefs.map((d: any) => typeof d === 'function' ? new d() : d);
    collection.push(...defs);
    
    defs.forEach((widgetDef: any) => {
      collection.widgetMap[widgetDef.name] = widgetDef;
    });
    
    return collection;
  }

  getByName(name: string): any {
    return this.widgetMap[name];
  }

  add(def: any): void {
    const widgetDef = typeof def === 'function' ? new def() : def;
    this.push(widgetDef);
    this.widgetMap[widgetDef.name] = widgetDef;
  }
}
