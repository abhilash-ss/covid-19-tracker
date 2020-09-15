import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

interface Props {
  title: string;
  cases: number;
  total: number;
}

const InfoBox = (props: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h3" component="h3">
          {props.cases}
        </Typography>
        <Typography color="textSecondary">{props.total} Total</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
