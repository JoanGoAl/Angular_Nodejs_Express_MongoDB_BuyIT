import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models';
import { CategoryService } from 'src/app/core/services';
import { ProductService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @ViewChild('single') single!: TemplateRef<any>;
  @ViewChild('double') double!: TemplateRef<any>;
  @ViewChild('triple') triple!: TemplateRef<any>;

  data: Array<Category[]> = [];

  offset = 3;
  count = 0;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';

  constructor(
    private categoriesService: CategoryService,
    private _productService: ProductService,
    private router: Router
  ) {}

  onScrollDown() {
    this.getScrollCategories();
  }

  getScrollCategories() {
    this.categoriesService
      .getCategories(this.count, this.offset)
      .subscribe((docs) => {
        if (docs.length != 0) {
          docs.map((i: Category) =>
            this._productService
              .getRandomProduct(<string>i.title)
              .subscribe((e) => (i.product_img = e[0]))
          );

          setTimeout(() => {
            this.data.push(docs)
          }, 100)

          this.count += 3;
        }
      });
  }

  goFilteredProducts(title: String) {
    this.router.navigateByUrl(
      `shop/${btoa(`filters?category=${title.toLowerCase()}&page=1`)}`
    );
  }

  getTemplate(length: number) {
    switch (length) {
      case 1:
        return this.single;
      case 2:
        return this.double;
      case 3:
        return this.triple;
    }

    return null;
  }

  ngOnInit(): void {
    this.getScrollCategories();
  }
}
