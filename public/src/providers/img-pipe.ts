
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ImgPipe'})
export class ImgPipe implements PipeTransform {
  transform(value: any): any {
        let ps;
        if (value) {
            ps = JSON.parse(value)
        }
        // console.log(ps)
        return ps
  }
}
