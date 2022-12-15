import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'appSharedRouteWithId',
})
export class RouteWithIdPipe implements PipeTransform {
  transform(route: string | undefined, id: string | number): string {
    if (!route || !id) {
      return route ?? '';
    }
    return route.replace(':id', id.toString());
  }
}
