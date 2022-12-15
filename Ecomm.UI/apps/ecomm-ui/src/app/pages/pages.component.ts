import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

const ANGULAR_MODULES = [RouterModule];

@Component({
  standalone: true,
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  imports: [...ANGULAR_MODULES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesComponent { }
