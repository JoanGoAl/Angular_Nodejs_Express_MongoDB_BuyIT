import { NgModule } from '@angular/core'

import { CarouselComponent } from '.'
import { CarouselModule } from 'primeng/carousel';
import { CategoriesComponent } from './categories/categories.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    CarouselComponent,
    CategoriesComponent,
    ListProductsComponent
  ],
  imports: [
    CarouselModule,
    InfiniteScrollModule
  ],
  exports: [
    CarouselComponent,
    CategoriesComponent,
    ListProductsComponent
  ]
})

export class SharedModule { }
