import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

const ANGULAR_MODULES = [CommonModule];

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [...ANGULAR_MODULES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent { }
