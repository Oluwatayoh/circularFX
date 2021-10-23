import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Facebook, Twitter, Instagram, Linkedin } from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  Facebook,
  Twitter,
  Instagram,
  Linkedin
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }