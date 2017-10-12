import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b>
      <a href="https://github.com/wats0ns" target="_blank">Quentin Maire</a> and 
      <a href="https://github.com/benjaminaudet" target="_blank">Benjamin Audet</a>
      </b> - 2017</span>
    <div class="socials">
      <a href="https://github.com/Wats0ns/intra_native" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}
