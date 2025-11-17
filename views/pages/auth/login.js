import { useTheme } from "@mui/material/styles";
import React from "react";

import {
  Alert,
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

  var error_message = query.get("message");

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        sx={{
          backgroundImage:
            "url('https://storage.googleapis.com/rize_fit/coffee-02.jpg')",
          backgroundBlendMode: "hard-light",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          resize: "horizontal",
          backgroundPosition: "center",
          display: { xs: "none", sm: "none", md: "block" },
          minHeight: "100vh",
        }}
      ></Grid>
      <Grid item xs={12} sm={12} md={5}>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: { xs: "100vh", sm: "100vh" }, backgroundColor: "#1d1d1d" }}
        >
          <Container sx={{ backgroundColor: "#1d1d1d"}}>
            <Card
              sx={{ boxShadow: { xs: theme.shadows[0], sm: theme.shadows[0] }, backgroundColor: "#1d1d1d" }}
            >
              <CardContent align="center">
                <Stack gap={2}>
                  <Stack sx={{ mb: "20px" }} align="center">
                    <center>
                      <img
                        src="https://storage.googleapis.com/rize_fit/hexagon.png"
                        height={192}
                        style={{ maxHeight: "192px" }}
                      />
                    </center>
                  </Stack>
                  <Stack gap={1}>
                    <Typography
                      variant="h3"
                      style={{ fontSize: "48px", fontWeight: "300", color: '#fff' }}
                    >
                      Demo App
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
                  <Box noValidate sx={{ m: "0px auto", textAlign: "center" }}>
                    <Container sx={{ mt: "1em", mb: "1em" }}>
                      <Stack
                        spacing={1}
                        alignContent={"center"}
                        alignItems={"center"}
                      >
                        {error_message && (
                          <Alert
                            icon={false}
                            color="error"
                            sx={{ maxWidth: "350px" }}
                          >
                            <Stack>
                              <Typography variant="h5">Error</Typography>
                              <Typography variant="body2">
                                {error_message}
                              </Typography>
                            </Stack>
                          </Alert>
                        )}

                        <Button
                          elevation={0}
                          href={`/auth/oidc`}
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
