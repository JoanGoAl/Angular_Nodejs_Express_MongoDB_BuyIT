import { Component, OnInit } from '@angular/core';
import { UserService, ProductService } from '../core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user?: any
  infoUser?: any
  isAutorized: boolean = false

  values?: any[]
  favorites?: any[]
  products?: any[]

  option: 'products' | 'favorites' = 'products'

  constructor(
    private userService: UserService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private productService: ProductService
  ) { }

  getUser() {

    let auxUser = this.userService.getCurrentUser().username
      ? this.userService.getCurrentUser().username
      : `${this.aRouter.snapshot.paramMap.get('user')}`

    if (this.userService.getCurrentUser().username) {
      this.isAutorized = true
      this.getAutorizedUser(auxUser)
    } else {
      this.isAutorized = false
      this.getUnautorizedUser(auxUser)
    }

  }

  getAutorizedUser(user: string) {
    this.userService.getInfoUser(user).subscribe(data => {
      this.infoUser = data

        this.productService.getUserProducts(this.infoUser.products).subscribe(data => {
          this.products = data
        })

        this.productService.getUserProducts(this.infoUser.favorites).subscribe(data => {
          this.favorites = data
      })
    })
  }

  changeOption(newValue: 'products' | 'favorites') {
    this.option = newValue;
    this.values = this[newValue]
  }

  getUnautorizedUser(user: string) {
    this.userService.getInfoUser(user).subscribe(data => {
      this.infoUser = data

      this.productService.getUserProducts(this.infoUser.products).subscribe(data => {
        this.values = data
      })

    })
  }

  goProduct(slug: string) {
    this.router.navigateByUrl(`/shop/product/${slug}`)
  }

  ngOnInit(): void {
    this.getUser()
    setTimeout(() => {
      this.values = this.products
    }, 100);
  }

}
