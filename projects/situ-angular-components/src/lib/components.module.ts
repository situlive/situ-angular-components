import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreModule } from './_core/core.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [CoreModule, CommonModule, RouterModule],
  declarations: [BreadcrumbComponent, HeaderComponent, LoaderComponent],
  exports: [BreadcrumbComponent, HeaderComponent, LoaderComponent],
})
export class ComponentsModule {}