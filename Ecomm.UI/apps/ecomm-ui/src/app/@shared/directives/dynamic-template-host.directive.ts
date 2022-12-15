import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appSharedDynamicTemplateHost]',
})
export class DynamicTemplateHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
