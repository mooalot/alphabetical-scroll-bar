import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AlphabeticalScrollBarModule } from 'alphabetical-scroll-bar';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, AlphabeticalScrollBarModule],
  declarations: [HomePage],
})
export class HomePageModule {}
