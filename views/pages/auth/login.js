import { useTheme } from "@mui/material/styles";
import React from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useLocation } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Example Project / "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LoginPage() {
  const theme = useTheme();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  var redirect = query.get("redirect");

  return (
    <Grid
    container
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
  >
      <Grid item xs={12} sm={12} md={7} sx={{ 
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('/public/unsplash.jpg')", 
        backgroundBlendMode: "hard-light",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", 
        resize: "horizontal", 
        backgroundPosition: "center", 
        display: { xs: "none", sm: "none", md: "block" },
        minHeight: "100vh"}}>
        
      </Grid>
      <Grid item xs={12} sm={12} md={5}>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: {
            xs: "100vh",
            sm: "100vh",
          },
        }}
      >
        <Container>
          <Card
            sx={{
              boxShadow: {
                xs: theme.shadows[0],
                sm: theme.shadows[0],
              },
            }}
          >
            <CardContent align="center">
              <Stack gap={2}>
              <Stack sx={{ mb: "20px" }} align="center">
                <center>
                  <img
                    src="/public/logo.png"
                    height={192}
                    style={{ maxHeight: "192px" }}
                  />
                </center>
              </Stack>
              <Stack gap={1}>
              <Typography
                variant="h3"
                style={{ fontSize: "48px", fontWeight: "300" }}
              >
                Digital City
              </Typography>
              <Typography
                variant="h4"
                style={{
                  fontSize: "32px",
                  fontWeight: "100",
                  color: theme.palette.text.secondary,
                }}
              >
                Example Project
              </Typography>
              
              </Stack>
              
              <Typography variant="body">
                Demo application to help you understandard klustr.io
              </Typography>
              <Box noValidate sx={{ mt: 3 }}>
                <Container sx={{ mt: "1em", mb: "1em" }}>
                  <Stack spacing={1} maxWidth={"200px"}>
                    <Button
                      elevation={0}
                      href={`/auth/oidc?redirect=` + redirect}
                      variant="contained"
                    >
                      <Typography>Sign In</Typography>
                    </Button>

                  </Stack>
                </Container>
              </Box>
              </Stack>
            </CardContent>
          </Card>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>
      </Grid>
    </Grid>
  );
}
