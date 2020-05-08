import { interval } from 'rxjs';
import { switchMap, take, map, mapTo } from 'rxjs/operators';
import { publishMetric } from './load-generation';

interval(2000)
  .pipe(
    take(50),
    mapTo(Math.random() * 1_000),
    switchMap((value) => publishMetric(value)),
    map((response) => ({ status: response.status, text: response.statusText })),
  )
  .subscribe(console.log)
