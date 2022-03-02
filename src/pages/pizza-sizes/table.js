import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Table, TableRow, TableCell, TableBody, Grid } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import {
  TableTitle,
  TableContainer,
  THead,
  TCell,
  TableTitleContainer,
  TableButton,
} from "../../ui";
import { useCollection } from "../../hooks";
import { singularOrPlural } from "../../utils";
import { PIZZAS_SIZES, NEW, EDIT } from "../../routes";

function TablePizzasSizes() {
  const { data: pizzasSizes, removePizzaSize: remove } =
    useCollection("pizzasSizes");
  const newSizePath = useRouteMatch(`${PIZZAS_SIZES}${NEW}`);

  return (
    <TableContainer>
      <TableTitleContainer>
        <Grid item>
          <TableTitle>Tamanhos cadastrados</TableTitle>
        </Grid>
        <Grid item>
          <TableButton
            startIcon={<Add />}
            color="primary"
            component={Link}
            to={`${PIZZAS_SIZES}${NEW}`}
            disabled={!!newSizePath}
          >
            Adicionar novo tamanho
          </TableButton>
        </Grid>
      </TableTitleContainer>
      <Table>
        <THead>
          <TableRow>
            <TCell>Nome</TCell>
            <TCell>Diâmetro</TCell>
            <TCell>Fatias</TCell>
            <TCell>Sabores</TCell>
            <TCell />
          </TableRow>
        </THead>
        <TableBody>
          {pizzasSizes?.map((pizza) => (
            <TableRow key={pizza.id}>
              <TableCell>{pizza.name}</TableCell>
              <TableCell>{pizza.size}</TableCell>
              <TableCell>{pizza.slices} fatias</TableCell>
              <TableCell>
                {pizza.flavours}{" "}
                {singularOrPlural(pizza.flavours, "sabor", "sabores")}
              </TableCell>
              <TableCell align="right">
                <TableButton
                  startIcon={<Edit />}
                  component={Link}
                  to={`${PIZZAS_SIZES}${EDIT(pizza.id)}`}
                >
                  Editar
                </TableButton>
                <TableButton
                  startIcon={<Delete />}
                  color="secondary"
                  onClick={() => remove(pizza.id)}
                >
                  Remover
                </TableButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TablePizzasSizes;
