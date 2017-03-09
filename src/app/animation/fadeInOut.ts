import {state, style, transition, animate, trigger, keyframes} from "@angular/core";
/**
 * Created by YsKun on 2017/1/26.
 */

export const fadeInOut = trigger('fadeInOut', [
    state('in', style({opacity: 0})),
    transition('void => *', [
      style({opacity: 0}),
      animate(300)
    ]),
    transition('* => void', [
      animate(300, style({opacity: 0}))
    ])
  ]);

export const flyIn = trigger('flyIn', [
  state('in', style({transform: 'translateX(0)'})),
  transition('void => *', [
    animate(300, keyframes([
      style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
      style({opacity: 1, transform: 'translateX(25px)',  offset: 0.3}),
      style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
    ]))
  ]),
  transition('* => void', [
    animate(300, keyframes([
      style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
      style({opacity: 1, transform: 'translateX(-25px)', offset: 0.7}),
      style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
    ]))
  ])
]);
