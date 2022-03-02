import styled from "styled-components";
import {
  TableHead,
  TableCell,
  Typography,
  Paper,
  TableContainer as MaterialTableContainer,
  Grid,
  Button as MaterialButton,
} from "@material-ui/core";
export const THead = styled(TableHead)`
  background: ${({ theme }) => theme.palette.common.black};
`;

export const TCell = styled(TableCell)`
  color: ${({ theme }) => theme.palette.common.white};
`;

export const TableTitle = styled(Typography).attrs({ variant: "h6" })`
  padding: ${({ theme }) => theme.spacing(3)}px;
`;

export const TableContainer = styled(MaterialTableContainer).attrs({
  component: Paper,
})`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`;

export const TableButton = styled(MaterialButton).attrs({
  variant: "contained",
})`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`;

export const TableTitleContainer = styled(Grid).attrs({
  container: true,
  justifyContent: "space-between",
  alignItems: "center",
})`
  padding: ${({ theme }) => theme.spacing(3)}px;

  ${TableTitle} {
    padding: 0;
  }
`;
