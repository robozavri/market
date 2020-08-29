import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersRoutingModule } from './filters-routing.module';
import { FiltersComponent } from './filters.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [FiltersComponent],
  imports: [
    CommonModule,
    FiltersRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  exports: [],
})
export class FiltersModule { }
