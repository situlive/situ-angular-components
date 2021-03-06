import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: '[situ-youtube-icon]',
  templateUrl: './youtube-icon.component.html',
  styleUrls: ['./youtube-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class YoutubeIconComponent implements OnInit {
  public constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'youtube',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/youtube.svg')
    );
  }

  public ngOnInit(): void {}
}
