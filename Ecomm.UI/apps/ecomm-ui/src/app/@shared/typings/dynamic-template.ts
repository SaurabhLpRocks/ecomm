import { EventEmitter, Type } from '@angular/core';

import { IDynamicComponentOutputAction } from '@shared/component/dynamic-template';


export class DynamicTemplateConfig {
  constructor(public component?: Type<IDynamicComponent>, public data?: unknown) { }
}

export interface IDynamicComponent {
  componentActionEvent?: EventEmitter<IDynamicComponentOutputAction>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
