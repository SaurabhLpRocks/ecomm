import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { DynamicTemplateConfig, IDynamicComponent } from '@shared/typings/dynamic-template';

import { DynamicTemplateHostDirective } from '../../directives/dynamic-template-host.directive';

import { IDynamicComponentOutputAction } from './dynamic-component-output-action.interface';

@Component({
  standalone: true,
  selector: 'app-shared-dynamic-template',
  templateUrl: './dynamic-template.component.html',
  styleUrls: ['./dynamic-template.component.scss'],
  imports: [DynamicTemplateHostDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTemplateComponent implements OnInit {
  @Input() dynamicTemplateConfig!: DynamicTemplateConfig;

  @Output() public componentActionEvent = new EventEmitter<IDynamicComponentOutputAction>();

  @ViewChild(DynamicTemplateHostDirective, { static: true }) appSharedDynamicTemplateHost!: DynamicTemplateHostDirective;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    if (this.dynamicTemplateConfig.component) {
      const viewContainerRef = this.appSharedDynamicTemplateHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent<IDynamicComponent>(this.dynamicTemplateConfig.component);
      componentRef.instance.data = this.dynamicTemplateConfig.data;
      componentRef.instance.componentActionEvent = this.componentActionEvent;
    }
  }
}
