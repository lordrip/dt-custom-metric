import { from, interval } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { publishMetric } from './load-generation';

interval(30_000)
  .pipe(
    map(() => Math.random() * 1_000),
    concatMap(
      (value) => from(
        publishMetric(value)
      )
        .pipe(
          map((response) => ({ response, value }))
        ),
    ),
    map(({ response: { status, statusText }, value }, index) => ({ index, status, statusText, value })),
  )
    .subscribe({
      next: (value) => {
        const date = new Date();

        console.log(`${date.toLocaleString()} - ${value.value} - Beacon #: ${value.index} | status: ${value.status}:${value.statusText}`)
      }
    });
