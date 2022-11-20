import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import styled from "@emotion/styled";

const CitiesContainer = styled.div`
  margin-top: 1px;
`;

const ListButton = styled(ListItemButton)`
  border-radius: 5px;
`;

export const Cities = React.memo(({ cities, openDialog }) => {
  return (
    <CitiesContainer>
      {cities.length > 0 &&
        cities.map((city) => (
          <span key={city.name}>
            <h3 style={{ marginBottom: "0px" }}>Results</h3>
            <ListItem>
              <Tooltip title={`Forecast in ${city.name} today`}>
                <ListButton onClick={() => openDialog(city)}>
                  <ListItemText
                    primary={`${city.name} ${city.country}`}
                    secondary={city.state}
                  />
                </ListButton>
              </Tooltip>
            </ListItem>
          </span>
        ))}
    </CitiesContainer>
  );
});
