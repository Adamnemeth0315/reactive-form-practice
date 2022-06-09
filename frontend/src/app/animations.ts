import {
  trigger,
  animateChild,
  group,
  transition,
  animate,
  style,
  query,
} from '@angular/animations';

// Routable animations
export const slideInAnimation = trigger('routeAnimation', [
  transition('heroes <=> hero', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ top: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('400ms ease-out', style({ top: '100%' }))]),
      query(':enter', [animate('400ms ease-out', style({ bottom: '0%' }))]),
    ]),
    query(':enter', animateChild()),
  ]),
]);
