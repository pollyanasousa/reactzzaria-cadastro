 import React from "react";
import styled from "styled-components";
import { Button, Grid, Typography } from "@material-ui/core";
import useAuth from "../../hooks/auth";
// eslint-disable-next-line
import FirebaseApp from "../../services/firebase";

function Login() {
  const { login } = useAuth();

  return (
    <Container>
      <Grid container spacing={5} justifyContent={"center"}>
        <Grid item>
          <Title>React-zzaria</Title>
          <Description>Sistema de cadastros</Description>
        </Grid>

        <Grid item xs={12} container justifyContent={"center"}>
          <GithubButton onClick={login}>Entrar com GitHub</GithubButton>
        </Grid>
      </Grid>
    </Container>
  );
}

const Title = styled(Typography).attrs({ variant: "h2" })`
  font-weight: bold;
  text-align: center;
  position: relative;

  &::after {
    border-bottom: 1px solid #000;
    bottom: -13px;
    content: "";
    position: absolute;
    left: 0;
    width: 150px;
  }
`;

const Description = styled(Typography)`
  text-align: right;
`;

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(3)}px;
`;

const GithubButton = styled(Button).attrs({
  variant: "contained",
  fullWidth: true,
})`
  && {
    text-transform: none;
    font-size: ${({ theme }) => theme.typography.h5.fontsize};
    padding: ${({ theme }) => theme.spacing(2)}px;
    max-width: 480px;
  }
`;

export default Login;
