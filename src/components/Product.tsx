import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
} from "@mui/material";
import { IProduct } from "model/IProduct";

interface ProductProps extends IProduct {}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  productStats,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const totalYearlySales = productStats.reduce(
    (acc, stat) => acc + (stat.yearlySalesTotal || 0),
    0
  );

  const totalYearlyUnitsSold = productStats.reduce(
    (acc, stat) => acc + (stat.yearlyTotalSoldUnits || 0),
    0
  );

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {totalYearlySales}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {totalYearlyUnitsSold}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Product;
