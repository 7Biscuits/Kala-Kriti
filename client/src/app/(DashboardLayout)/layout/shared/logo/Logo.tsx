import Link from "next/link";
import { styled, Typography } from "@mui/material";
import Image from "next/image";
import logo from "../../../../../../public/images/logos/logo.png";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image style={{ marginTop: 20 }} width={180} height={40} src={logo}></Image>
    </LinkStyled>
  );
};

export default Logo;
