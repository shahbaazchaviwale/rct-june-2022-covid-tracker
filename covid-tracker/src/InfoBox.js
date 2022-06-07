import "./InfoBox.css";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function InfoBox({ title, cases, total, active, isRed, ...props }) {
  return (
    <div
      onClick={props.onClick}
      className={`${active && "infoBox--selected"} ${isRed && "infoBox--red"} `}
    >
      <Box sx={{ minWidth: 100 }}>
        <Card variant="outlined" className={`infoBox`}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <h2
              className={`${
                !isRed ? "infoBox__cases--green" : "infoBox__cases"
              }`}
            >
              {cases}
            </h2>
            <Typography className="infoBox__total" color="textSecondary">
              {total} Total
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default InfoBox;
