import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-about',
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);


  ngOnInit() : void {
    this.title.setTitle('About Page');

    this.meta.updateTag({name: 'description', content: 'This is the about page of our application.'});
    this.meta.updateTag({name: 'og:title', content: 'About page'});
    this.meta.updateTag({name: 'keywords', content: 'About, Mundo'});


  }

 }
