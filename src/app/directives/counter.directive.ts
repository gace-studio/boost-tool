import { Directive, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import 'moment-duration-format';
import { Subject, SubscriptionLike, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Directive({
  selector: '[counter]'
})
export class CounterDirective implements OnChanges, OnDestroy {

  private counter$ = new Subject<any>();
  private countSub$: SubscriptionLike;

  @Input() counter: number;
  @Input() interval: number;
  @Output() value = new EventEmitter<string>();

  constructor() {

    this.countSub$ = this.counter$.pipe(
      switchMap((options: any) =>
        timer(0, options.interval).pipe(
          take(options.count),
          tap(() => {
            const duration = moment.duration(--options.count, 'seconds');
            const rs =  (duration as Duration).format('H:mm:ss');
            this.value.emit(rs);
          })
        )
      )
    ).subscribe();
  }


  ngOnChanges() {
    if (this.counter === 0) {
      this.value.emit('N/A');
      return;
    }
    this.counter$.next({ count: this.counter, interval: this.interval });
  }

  ngOnDestroy() {
    this.countSub$.unsubscribe();
  }
}

interface Duration extends moment.Duration {
  format: (template?: string, precision?: number, settings?: DurationSettings) => string;
}

interface DurationSettings {
  forceLength: boolean;
  precision: number;
  template: string;
  trim: boolean | 'left' | 'right';
}
