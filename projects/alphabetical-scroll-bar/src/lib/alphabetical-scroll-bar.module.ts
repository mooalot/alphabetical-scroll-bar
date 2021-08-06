import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlphabeticalScrollBarComponent } from './alphabetical-scroll-bar.component';



@NgModule({
  declarations: [AlphabeticalScrollBarComponent],
  imports: [
    CommonModule
  ],
  exports: [AlphabeticalScrollBarComponent]
})
export class AlphabeticalScrollBarModule { }
