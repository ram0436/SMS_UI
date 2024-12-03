import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeeStructureComponent } from "./component/fee-structure/fee-structure.component";
import { FeeAmountSlabComponent } from "./component/fee-amount-slab/fee-amount-slab.component";
import { FeeDiscountComponent } from "./component/fee-discount/fee-discount.component";
import { FeeDepositComponent } from "./component/fee-deposit/fee-deposit.component";

const routes: Routes = [
  { path: "fee-structure", component: FeeStructureComponent },
  { path: "fee-amount-slab", component: FeeAmountSlabComponent },
  { path: "fee-discount", component: FeeDiscountComponent },
  { path: "fee-deposit", component: FeeDepositComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeeRoutingModule {}
