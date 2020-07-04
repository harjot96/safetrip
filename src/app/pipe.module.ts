/* pipes.modules.ts */
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CreditcardmaskPipe } from './creditcardmask.pipe';


@NgModule({
  declarations: [CreditcardmaskPipe],
  imports: [IonicModule],
  exports: [CreditcardmaskPipe]
})
export class PipesModule {}