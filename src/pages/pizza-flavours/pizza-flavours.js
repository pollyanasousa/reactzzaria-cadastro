import React from "react";
import { Route } from "react-router-dom";
import TablePizzasFlavours from "./table";
import FormRegisterFlavour from "./form";
import { NEW, EDIT, PIZZAS_FLAVOURS } from "../../routes";

const newFlavourPath = `${PIZZAS_FLAVOURS}${NEW}`;
const editFlavourPath = `${PIZZAS_FLAVOURS}${EDIT()}`;

function PizzasFlavours() {
  return (
    <>
      <Route path={[newFlavourPath, editFlavourPath]}>
        <FormRegisterFlavour />
      </Route>
      <TablePizzasFlavours />
    </>
  );
}

export default PizzasFlavours;
