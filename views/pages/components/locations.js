import * as React from "react";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  getAccessToken,
  getApiKey,
  getToken,
} from "../../../src/main/middleware/auth";
import axios from "axios";

const getDeviceLocation = (callback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback);
  } else {
    alert("geolocation not enabled on browser");
  }
};

const recordLocation = (callback) => {
  getDeviceLocation((position) => {
    if (position == null) {
      alert("Unable to get location information, check browser.");
      return;
    }
    axios
      .post(
        "https://gateway.dev.klustr.io/events/self/locations",
        {
          device_id: window.navigator.userAgent,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        {
          headers: {
            Authorization: "Bearer " + getAccessToken(),
            "X-API-Key": getApiKey(),
          },
        }
      )
      .then(() => {
        callback();
      })
      .catch((e) => {
        if (e?.response?.status == 401) {
          alert("Not authenticated, logout and login.");
        } else {
          alert(e.message);
        }
      });
  });
};

const getMostRecentLocation = function (json) {
  let accessToken = getAccessToken();
  if (accessToken.length <= 0) {
    throw "No token valid";
  }

  return axios.get("https://gateway.dev.klustr.io/events/self/locations", {
    headers: {
      Authorization: "Bearer " + accessToken,
      "X-API-Key": getApiKey(),
    },
  });
};

const deleteLocations = function (json) {
  let accessToken = getAccessToken();
  if (accessToken.length <= 0) {
    throw "No token valid";
  }

  return axios.delete("https://gateway.dev.klustr.io/events/self/locations", {
    headers: {
      Authorization: "Bearer " + accessToken,
      "X-API-Key": getApiKey(),
    },
  });
};

export default function LocationsWidget() {
  const [token, setToken] = React.useState({});
  const [data, setData] = React.useState([]);

  const handleLoad = () => {
    getMostRecentLocation().then(({ data: json }) => {
      setData(json);
    });
  };

  const handleDelete = () => {
    deleteLocations().then(() => {
      handleLoad();
    });
  };

  React.useEffect(() => {
    setToken(getToken());
  }, []);

  return (
    <Stack gap={4}>
      {data?.docs?.length > 0 && (
        <Table sx={{ maxWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Lat</TableCell>
              <TableCell>Long</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>User Id</TableCell>
              <TableCell>Org Id</TableCell>
              <TableCell>Project Id</TableCell>
              <TableCell>Client Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.docs?.map((doc) => {
              return (
                <TableRow>
                  <TableCell>{doc.id}</TableCell>
                  <TableCell>{doc.lat}</TableCell>
                  <TableCell>{doc.lng}</TableCell>
                  <TableCell>{doc.timestamp}</TableCell>
                  <TableCell>{doc.user_id}</TableCell>
                  <TableCell>{doc.org_id}</TableCell>
                  <TableCell>{doc.project_id}</TableCell>
                  <TableCell>{doc.client_id}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <Stack
        gap={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "1em", marginBottom: "2em" }}
      >
        {token?.scopes?.indexOf("location.places.write") >= 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              recordLocation(() => {
                handleLoad();
              });
            }}
          >
            Capture Location
          </Button>
        )}

        {token?.scopes?.indexOf("location.places.read") >= 0 && (
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              handleLoad();
            }}
          >
            Get User Locations
          </Button>
        )}

        {token?.scopes?.indexOf("location.places.write") >= 0 && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              handleDelete();
            }}
          >
            Delete Locations
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
