import { trigger, state, transition, style, animate, query, animateChild, group } from '@angular/animations';


export let fadeFilter = trigger('fadeFilter', [
  state('void', style({ opacity: 0, transform: 'translateX(-100px)' })),
  state('*', style({ opacity: 1, transform: 'translateX(0px)' })),

  transition(':enter', [
    animate(600)
  ])
]);

export let fadeNameTable = trigger('fadeNameTable', [
  state('void', style({ opacity: 0, transform: 'translateX(-30px)' })),
  state('*', style({ opacity: 1, transform: 'translateX(0px)' })),

  transition(':enter', [
    animate(600)
  ])
]);

export let fadeTable = trigger('fadeTable', [
  state('void', style({ opacity: 0 })),
  state('*', style({ opacity: 1 })),

  transition(':enter', [
    animate(1000)
  ]),
  transition(':leave', [
    animate(500, style({ opacity: 0, transform: 'translateY(50px)' }))
  ])
]);



export let fadeTableItem = trigger('fadeTableItem', [
  state('void', style({ opacity: 0, transform: 'translateX(-30px)' })),
  state('*', style({ opacity: 1, transform: 'translateX(0px)' })),

  transition(':enter', [
    animate(600)
  ])
]);

export let fadePaginator = trigger('fadePaginator', [
  state('void', style({ opacity: 0, transform: 'translateY(50px)' })),
  state('*', style({ opacity: 1, transform: 'translateY(0px)' })),

  transition(':enter, :leave', [
    animate(600)
  ])
]);

export let loginOut = trigger('loginOut', [
  state('void', style({ transform: 'translateX(100%)' })),
  state('*', style({ transform: 'translateX(0%)' })),

  transition(':enter', [
    animate(200)
  ]),
  transition(':leave', [
    animate(500)
  ])
]);


