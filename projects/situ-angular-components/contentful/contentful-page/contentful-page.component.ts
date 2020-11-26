import { Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Page } from '../_core/models';
import { PageService } from '../_core/services/page.service';

export class ContentfulPageComponent<T extends Page> implements OnInit {
  private currentUrl: string = '/';
  private callback: (page: any) => T;

  protected router: Router;
  protected pageService: PageService;

  public page: Page;
  public affix: string = ' | Situ Live';
  public loaded: boolean;

  constructor(
    router: Router,
    pageService: PageService,
    callback?: (page: any) => T
  ) {
    this.router = router;
    this.pageService = pageService;
    this.callback = callback;
  }

  ngOnInit(): void {
    this.currentUrl = this.getCurrentUrl(this.router.url); // For initial page load

    this.getPage();
    this.setTitle();

    this.onNavigationEnd();
  }

  public getCurrentUrl(current: string): string {
    let urlWithoutHash = current.split('#')[0];
    let urlWithoutQuery = urlWithoutHash.split('?')[0];
    return urlWithoutQuery;
  }

  private setTitle(): void {
    this.pageService.setTitle((this.page?.title ?? 'Home') + this.affix);
  }

  private getPage(): void {
    this.loaded = false;
    this.pageService
      .getPage(this.currentUrl, this.callback)
      .subscribe((page: T) => {
        if (!page) return; // TODO: throw error or redirect to 404
        this.page = page;
        this.loaded = true;
      });
  }

  private onNavigationEnd(): void {
    this.router.events.subscribe((event: any) => {
      if (!(event instanceof NavigationEnd)) return;

      this.currentUrl = this.getCurrentUrl(event.urlAfterRedirects);

      this.getPage();
      this.setTitle();
    });
  }
}
