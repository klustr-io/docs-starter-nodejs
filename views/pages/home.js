import * as React from "react";
import AppTemplate from "../layouts/template";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Grid,
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import {
  getAccessToken,
  getApiKey,
  getToken,
  logoutUser,
} from "../../src/main/middleware/auth";
import axios from "axios";
import LocationsWidget from "./components/locations";

export default function HomePage() {
  const [token, setToken] = React.useState({});

  React.useEffect(() => {
    setToken(getToken());
  }, []);

  return AppTemplate(
    <Box
      sx={{ backgroundColor: "#f9f9f9" }}
      alignContent={"center"}
      alignItems={"center"}
      padding={10}
    >
      <Grid
        container
        justify="center"
        alignItems="center"
        alignContent={"center"}
        textAlign={"center"}
        spacing={2}
        width={"100%"}
      >
        <Stack gap={4} sx={{ width: "100%"}} alignItems={"center"} alignContent={"center"}>
          <Card >
            <CardContent style={{ textAlign: "center" }}>
              <Typography variant="h3">Signed In</Typography>
              <Typography variant="body">
                You've successfully signed into this application.
              </Typography>
              <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Property</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>{token?.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Picture</TableCell>
                    <TableCell>{token?.picture}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>{token?.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Scopes</TableCell>
                    <TableCell>{token?.scopes?.toString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Expires</TableCell>
                    <TableCell>{token?.expires_at}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Access Token</TableCell>
                    <TableCell>
                      <code
                        style={{
                          display: "block",
                          maxWidth: "300px",
                          overflow: "clip",
                        }}
                      >
                        {token?.accessToken}
                      </code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ID Token</TableCell>
                    <TableCell>
                      <code
                        style={{
                          display: "block",
                          maxWidth: "300px",
                          overflow: "clip",
                        }}
                      >
                        {token?.idToken}
                      </code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardActions>
              <Box padding={2}>
                <Stack
                  direction={"row"}
                  gap={2}
                  alignContent={"center"}
                  alignItems={"center"}
                  flexGrow={"unset"}
                  flexWrap={"nowrap"}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      logoutUser();
                    }}
                  >
                    Logout
                  </Button>

                  <Button href="https://secure.dev.klustr.io/kratos/self-service/settings/browser?&prompt=profile&return_to=http://localhost:5000/">
                    Edit Your Profile
                  </Button>
                </Stack>
              </Box>
            </CardActions>
          </Card>
          <LocationsWidget />
        </Stack>
      </Grid>
    </Box>
  );
}
