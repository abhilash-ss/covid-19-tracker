import React, { FunctionComponent, MouseEventHandler } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import "./InfoBox.scss";

interface Props {
  title: string;
  cases: string;
  total: string;
  active: boolean;
  uiType: "success" | "alert";
  onClick: MouseEventHandler;
}

const InfoBox: FunctionComponent<Props> = ({
  title,
  cases = 0,
  total = 0,
  active,
  uiType,
  onClick,
}) => {
  return (
    <Card
      className={`info-box ${active && `info-box--selected-${uiType}`}`}
      onClick={onClick}
    >
      <CardContent>
        <Typography
          className="info-box__title"
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>
        {/* <Typography variant="h3" component="h3"> */}
        <h2 className="info-box__cases">{cases}</h2>
        {/* </Typography> */}
        <Typography className="info-box__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
