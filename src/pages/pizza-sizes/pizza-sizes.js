import React from "react";
import { Route } from "react-router-dom";
import TablePizzasSizes from "./table";
import FormRegisterSize from "./form";
import { PIZZAS_SIZES, NEW, EDIT } from "../../routes";

const newPizzaSize = `${PIZZAS_SIZES}${NEW}`;
const editPizzaSize = `${PIZZAS_SIZES}${EDIT()}`;

function PizzasSizes() {
  return (
    <>
      <Route path={[newPizzaSize, editPizzaSize]}>
        <FormRegisterSize />
      </Route>
      <TablePizzasSizes />
    </>
  );
}

export default PizzasSizes;
