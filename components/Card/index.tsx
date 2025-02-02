import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "block",
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  maxWidth: "400px",
  margin: "0 auto", // Center the card horizontally
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const CardWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const StyledSpan = styled("span")(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: "block",
  color: theme.palette.text.secondary,
}));

const CustomIcon = styled(Box)({
  "& svg": {
    width: "2em",
    height: "2em",
  },
});

interface CustomCardProps {
  title: string; // Main title
  subtitle: string; // Subtitle or description
  value: string | number; // Main numeric value
  additionalInfo: string; // Text below the card
  IconComponent: React.ElementType; // Icon component
  iconColor?: "inherit" | "primary" | "secondary" | "action" | "disabled" | "error"; // MUI icon color
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  subtitle,
  value,
  additionalInfo,
  IconComponent,
  iconColor = "primary",
}) => {
  return (
    <StyledCard>
      <CardWrapper>
        <IconWrapper>
          <CustomIcon>
            <IconComponent fontSize="large" color={iconColor} />
          </CustomIcon>
        </IconWrapper>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
          <Typography variant="h3" component="div" style={{textAlign: "right"}}>
            {value}
          </Typography>
        </CardContent>
      </CardWrapper>
      <hr />
      <StyledSpan>{additionalInfo}</StyledSpan>
    </StyledCard>
  );
};

export default CustomCard;
