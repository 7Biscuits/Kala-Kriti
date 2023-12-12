import Link from "next/link";
import { styled, Typography } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Typography variant="h1" color="grey">Kala-Kriti</Typography>
    </LinkStyled>
  );
};

export default Logo;
