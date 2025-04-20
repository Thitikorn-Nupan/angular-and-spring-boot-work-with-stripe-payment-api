import {Component} from '@angular/core';
import {ModelCard} from "./entities/model-card";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public modelCard : ModelCard
  constructor() {
    const socialStatus = [
      {int : 1000 , description : 'Photo'},
      {int : 1000 , description : 'Viewer'},
      {int : 1000 , description : 'Followers'},
      {int : 1000 , description : 'Following'},
    ]
    const skills = [
      'https://angular.io/assets/images/logos/angular/angular.svg',
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
      'https://www.vectorlogo.zone/logos/springio/springio-icon.svg',
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
    ]
    this.modelCard = new ModelCard(
      'https://www.svgrepo.com/show/467438/user-circle.svg',
      'https://mdbcdn.b-cdn.net/img/new/standard/city/062.webp',
      'Alex Slider',
      'London, United Kingdom',
      socialStatus,
      skills
    );
  }
}
