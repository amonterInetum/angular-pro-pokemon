import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-pricing',
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);


  ngOnInit(): void {


    // console.log('Pricing Page Loaded $platform:', this.platform);

    // if(!isPlatformServer(this.platform)){
    //   document.title = 'Pricing Page';
    // }

    this.title.setTitle('Pricing Page');

    this.meta.updateTag({ name: 'description', content: 'This is the Pricing page of our application.' });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing page' });
    this.meta.updateTag({ name: 'keywords', content: 'Pricing, Mundo' });
  }
}
