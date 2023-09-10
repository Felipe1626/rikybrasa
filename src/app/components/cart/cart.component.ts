import { Component } from '@angular/core';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faBan, faClose, faMoneyCheckDollar, faReceipt, faSackXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  faReceipt = faReceipt
  faPenToSquare = faPenToSquare
  faClose = faClose
  faSackXmark = faSackXmark
  faTrashCan = faTrashCan
  faBan = faBan
  faDollar =faMoneyCheckDollar

  comingSoon(){
    alert('Próximamente Podrás Hacer Tus Pedidos Aquí')
  }
}
