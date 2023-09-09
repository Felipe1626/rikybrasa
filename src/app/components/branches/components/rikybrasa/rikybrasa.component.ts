import { Component } from '@angular/core';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rikybrasa',
  templateUrl: './rikybrasa.component.html',
  styleUrls: ['./rikybrasa.component.scss']
})
export class RikybrasaComponent {
  faArrowUp = faArrowUp
  faPhone = faPhone
  faWhatsapp = faWhatsapp
  faInstagram = faInstagram
  faFacebook = faFacebook
}
