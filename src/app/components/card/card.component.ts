import {Component, Input} from '@angular/core';
import {ModelCard} from "../../entities/model-card";

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input()
  public declare modelCard : ModelCard


  protected getCssBackground() {
    return `url('${this.modelCard.background}')`
  }
}
