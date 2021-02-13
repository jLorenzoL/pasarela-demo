import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './../modal/modal.component';
import { environment } from './../../../environments/environment';
import { StorageService } from './../../services/storage.service';
import { CartItemModel } from './../../models/cart-item-model';
import { Product } from 'src/app/models/product';
import { MessageService } from './../../services/message.service';
import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
//import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [];
  total = 0;

  public payPalConfig?: IPayPalConfig;

  constructor(
    private messageService: MessageService,
    private storageService: StorageService,
    private modalService: NgbModal
    //private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.initConfig();
    if (this.storageService.existsCart()) {
      this.cartItems = this.storageService.getCart();
    }
    this.getItem();
    this.total = this.getTotal();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.clientId,
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.getTotal().toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.getTotal().toString(),
              }
            }
          },
          items: this.getItemsList()
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.showSuccess = true;
        if(data.status == 'COMPLETED'){
          this.openModal(
            data.purchase_units[0].items,
            data.purchase_units[0].amount.value,
          );
          this.emptyCart();
        }
        
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        // this.showCancel = true;

      },
      onError: err => {
        console.log('OnError', err);
        // this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      },
    };
  }

  getItem(): void {
    this.messageService.getMessage().subscribe((product: Product) => {
      let exists = false;
      this.cartItems.forEach(item => {
        if (item.productId == product.id) {
          exists = true;
          item.qty++;
        }
      });
      if (!exists) {
        const cartItem = new CartItemModel(product);
        this.cartItems.push(cartItem);
      }

      this.total = this.getTotal();
      this.storageService.setCart(this.cartItems);
    })
  }

  getItemsList() : any[] {
    const items : any[] = [];
    let item = {};
    this.cartItems.forEach((it : CartItemModel)=>{
      item = {
        name : it.productName,
        quantity : it.qty,
        unit_amount : {
          value : it.productPrice,
          currency_code : 'USD'
        }
      };
      items.push(item);
    });
    return items
  }

  getTotal(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.qty * item.productPrice
    });
    return +total.toFixed(2);
  }

  emptyCart(): void {
    this.cartItems = [];
    this.total = 0;
    this.storageService.clear();
  }

  deleteItem(i: number): void {
    if (this.cartItems[i].qty > 1) {
      this.cartItems[i].qty--;
    } else {
      this.cartItems.splice(i, 1);
    }
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
  }

  openModal(items, amount) : void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.items = items;
    modalRef.componentInstance.amount = amount;
  }

}
