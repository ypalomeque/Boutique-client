import { CircularProgress, Box, styled } from "@mui/material";

// STYLED COMPONENT
const StyledLoading = styled("div")({
  width: "100% !important",
  height: "100% !important",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "auto",
    height: "25px"
  },
  "& .circleProgress": {
    position: "absolute",
    left: -7,
    right: 0,
    top: "calc(50% - 25px)",
    color: "#c752c1 !important"
  }
});

export default function Loading() {
  return (
    <StyledLoading>
      <Box position="relative">
        {/* <img src="/assets/images/logo-circle.svg" alt="" /> */}
        <CircularProgress className="circleProgress" />
      </Box>
    </StyledLoading>
  );
}

// color: "#c752c1"
