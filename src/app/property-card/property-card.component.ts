import { Component, Input } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'property-card-component',
  standalone: true,
  templateUrl: 'property-card.component.html',
  styleUrls: ['property-card.component.scss'],
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, RouterModule],
})
export class PropertyCardComponent {
  @Input('listings')
  data: any;

  //  displays individual property details from the data input

}
