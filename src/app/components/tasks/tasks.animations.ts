import { animate, style, group, query, transition, trigger } from '@angular/animations'

export const fade = trigger('fade', [      
    
  transition(':enter', [
    style({ opacity: 0 }),
    group([
      animate('500ms ease-out', style({ opacity: 1 })),
      
      query('.task', [
        style({ backgroundColor: 'green' }),
        group([animate('500ms ease-out', style({ backgroundColor: '!' }))])
      ])
    ])        
  ]) ,   

  transition(':leave', [
    style({ opacity: 1 }),
    group([
      animate('500ms ease-out', style({ opacity: 0 })),
      
      query('.task', [
        style({ backgroundColor: 'red', borderLeft: 0 })
      ])
    ])        
  ])    
])

export const noLeaveAnimation = trigger('noLeaveAnimation', [
  transition(':leave', [])
])