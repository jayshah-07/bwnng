import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalService } from './rental.service';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { HttpClientModule } from '@angular/common/http';

import { UppercasePipe } from '../common/pipes/uppercase';


const routes: Routes = [
    {path:"rentals", 
    component: RentalComponent,
    children: [
        { path: "", component: RentalListComponent },
        { path: ":rentalId", component: RentalDetailComponent }
    ]}
  ]

@NgModule({
    declarations:[
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
        UppercasePipe
    ],
    imports: [CommonModule,
    HttpClientModule,
    NgPipesModule,
    RouterModule.forChild(routes)],
    providers:[RentalService]
})

export class RentalModule {};