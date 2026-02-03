/**
 * Test Angular Component
 * 
 * This component is used to verify that the hybrid Angular/AngularJS
 * application is working correctly. It will be downgraded to work
 * within AngularJS templates.
 */

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-component',
  template: `
    <div class="ng-test-component">
      <h4>Angular Component</h4>
      <p>This component is rendered by Angular {{ angularVersion }}</p>
      <p *ngIf="message">Message: {{ message }}</p>
      <p>The hybrid application is working correctly!</p>
    </div>
  `,
  styles: [`
    .ng-test-component {
      padding: 15px;
      background-color: #e3f2fd;
      border: 2px solid #2196f3;
      border-radius: 8px;
      margin: 10px 0;
    }
    .ng-test-component h4 {
      color: #1565c0;
      margin-top: 0;
    }
    .ng-test-component p {
      margin-bottom: 5px;
    }
  `]
})
export class TestComponent implements OnInit {
  @Input() message: string = '';
  
  angularVersion: string = '17';

  ngOnInit(): void {
    console.log('Angular TestComponent initialized');
  }
}
