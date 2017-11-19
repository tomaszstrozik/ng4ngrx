import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(seconds: number, args?: any): string {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

}
