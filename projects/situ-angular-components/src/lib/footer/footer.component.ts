import { Component, OnInit, Input } from '@angular/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

class Footer {
  title: string;
  content: string;
  careersLink: string;
  cookiePolicyLink: string;
  privacyPolicyLink: string;
  termsLink: string;
}

@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  @Input() promise: () => Promise<any>;
  public section: Footer;

  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.getComponent();
  }

  private async getComponent(): Promise<void> {
    let component = await this.promise();
    this.section = {
      title: component.fields.title,
      content: documentToHtmlString(component.fields.content),
      careersLink: component.fields.careersLink,
      cookiePolicyLink: component.fields.cookiePolicyLink,
      privacyPolicyLink: component.fields.privacyPolicyLink,
      termsLink: component.fields.termsLink,
    };
  }
}