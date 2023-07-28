import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiContactService } from '../services/api/api-contact.service';
import { Product } from '../product';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  constructor(public router: Router, public service: ApiContactService) {
    this.getproducts();
    setTimeout(() => {
      this.enterEventListener();
    }, 1000);
  }

  

  idtext = document.getElementById('xd') as HTMLInputElement;
  nametext = document.getElementById('xr') as HTMLInputElement;
  veri: any = {
    id: 'rOrMp9vaOIvTzk8u18ET',
    name: 'receperturk',
    password: '12345678',
  };
  token: any = localStorage.getItem('id');
  productList: Product[] = [];

  enterEventListener() {
    const getElement = (name: string) =>
      document.getElementById(name) as HTMLInputElement;

    const id = getElement('ürün-id');
    const name = getElement('ürün-adı');

    document.addEventListener('keydown', (e) => {
      if (e.key == 'Enter' && (id?.value || name?.value)) {
        this.urunBulButton();
      }
    });
  }
  getproducts() {
    this.service.getProducts().subscribe(
      (res) => {
        this.productList = res.sort((a, b) => Number(a.id) - Number(b.id));
      },
      (error) => {
        console.error('issis', error);
      }
    );
  }

  openModal() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }
  closeModal() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
      
    }
  }
  openModal2(veri: any) {
    const modalDiv2 = document.getElementById('myModal2');
    if (modalDiv2 != null) {
      const edit_id = document.getElementById('edit-id') as HTMLInputElement;
      const edit_name = document.getElementById('edit-adi') as HTMLInputElement;
      const edit_price = document.getElementById( 'edit-fiyati') as HTMLInputElement;
      edit_id.value = veri.id;
      edit_name.value = veri.title;
      edit_price.value = veri.price;
      modalDiv2.style.display = 'block';
    }
  }
  closeModal2() {
    const modalDiv2 = document.getElementById('myModal2');
    if (modalDiv2 != null) {
      modalDiv2.style.display = 'none';
    }
  }
  logout() {
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  urunBulInput() {
    const getElement = (name: string) =>
      document.getElementById(name) as HTMLInputElement;

    const productsInHtml = document.getElementsByClassName(
      'thisIsProduct'
    ) as HTMLCollectionOf<HTMLElement>;

    const id = getElement('ürün-id'),
      idDiv = getElement('ürün-id-div');
    const name = getElement('ürün-adı'),
      nameDiv = getElement('ürün-adı-div');

    if (!id?.value && !name?.value) {
      nameDiv.style.display = 'block';
      idDiv.style.display = 'block';

      for (let i = 0; i < productsInHtml.length; i++) {
        productsInHtml[i].style.display = 'table-row';
      }
    }

    if (id.value && !name?.value) {
      nameDiv.style.display = 'none';
    }
    if (!id.value && name?.value) {
      idDiv.style.display = 'none';
    }
  }

  urunBulButton() {
    const getElement = (name: string) =>
      document.getElementById(name) as HTMLInputElement;

    const productsInHtml = document.getElementsByClassName(
      'thisIsProduct'
    ) as HTMLCollectionOf<HTMLElement>;

    //arama kutuları
    const id = getElement('ürün-id');
    const name = getElement('ürün-adı');

    if (!id?.value && !name?.value) {
      for (let i = 0; i < productsInHtml.length; i++) {
        productsInHtml[i].style.display = 'table-row';
      }
      return;
    }

    if (id?.value) {
      let finded = [];

      for (let i = 0; i < productsInHtml.length; i++) {
        if (productsInHtml[i].id.includes(id?.value))
          finded.push(productsInHtml[i])
        };

      if (finded.length > 0) {
        for (let i = 0; i < productsInHtml.length; i++) {
          productsInHtml[i].style.display = 'none';
        }

        for (let i = 0; i < finded.length; i++) {
          finded[i].style.display = 'table-row';
        }

        return;
      }
    }

    if (name?.value) {
      let finded = [];

      for (let i = 0; i < productsInHtml.length; i++) {
        const textContent =
          productsInHtml[i].children[1].textContent?.toLowerCase();
        if (textContent?.includes((name?.value).toLowerCase()))
          finded.push(productsInHtml[i]);
      }

      if (finded.length > 0) {
        for (let i = 0; i < productsInHtml.length; i++) {
          productsInHtml[i].style.display = 'none';
        }

        for (let i = 0; i < finded.length; i++) {
          finded[i].style.display = 'table-row';
        }

        return;
      }
    }

    return alert('Ürün bulunamadı');
  }

  urunDelete() {
    const delete_id = document.getElementById('delete-id') as HTMLInputElement;
    this.service.deleteProducts(Number(delete_id.value)).subscribe(
      () => {
        console.log('Ürün başarı ile silindi');
        this.getproducts();
        this.silModalClose();
        alert('Ürün Silindi.');
      },
      (error) => {
        console.error('Ürün silinirken hata ile karşılaşıldı', error);
        alert('Ürün silinirken hata oluştu.' + error);
      }
    );
  }

  silModalOpen(veri: any) {
    const silmeModal = document.getElementById('silModal');
    if (silmeModal != null) {
      const delete_id = document.getElementById(
        'delete-id'
      ) as HTMLInputElement;
      const delete_adi = document.getElementById(
        'delete-adi'
      ) as HTMLInputElement;
      const delete_fiyati = document.getElementById(
        'delete-fiyati'
      ) as HTMLInputElement;
      delete_id.value = veri.id;
      delete_adi.value = veri.title;
      delete_fiyati.value = veri.price;
      silmeModal.style.display = 'block';
    }
  }
  silModalClose() {
    const silmeModal = document.getElementById('silModal');
    if (silmeModal != null) {
      silmeModal.style.display = 'none';
    }
  }

  urunEkle() {
    const getElement = (name: string) =>
      document.getElementById(name) as HTMLInputElement;
    const id = getElement('create-id');
    const adi = getElement('create-adi');
    const fiyati = getElement('create-fiyati');
    const product: Product = {
      id: Number(id.value),
      title: adi.value,
      price: Number(fiyati.value),
    };
    if (product.id == 0 || product.title == '' || product.price == 0) {
      alert('Lütfen tüm alanları doldurunuz.');
      return;
    }
    this.service.createProducts(product).subscribe(
      () => {
        console.log('Ürün başarı ile eklendi');
        this.getproducts();
        id.value = '';
        adi.value = '';
        fiyati.value = '';
        this.closeModal();
      },
      (error) => {
        console.error('Ürün eklenirken hata ile karşılaşıldı', error);
      }
    );
  }

  urunGuncelle() {
    const getElement = (name: string) =>
      document.getElementById(name) as HTMLInputElement;
    const id = getElement('edit-id');
    const adi = getElement('edit-adi');
    const fiyati = getElement('edit-fiyati');
    const product: Product = {
      id: Number(id.value),
      title: adi.value,
      price: Number(fiyati.value),
    };
    this.service.updateProducts(product.id,product).subscribe(
      () => {
        console.log('Ürün başarı ile güncellendi');
        this.getproducts();
        this.closeModal2();
      },
      (error) => {
        console.error('Ürün güncellenirken hata ile karşılaşıldı', error);
      }
    );
  }
}
