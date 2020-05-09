import { interval } from 'rxjs';
import { concatMap, map, mapTo } from 'rxjs/operators';
import { publishMetric } from './load-generation';

interval(30_000)
  .pipe(
    mapTo(Math.random() * 1_000),
    concatMap((value) => publishMetric(value)),
    map((response) => ({ status: response.status, text: response.statusText })),
  )
  .subscribe(console.log)
