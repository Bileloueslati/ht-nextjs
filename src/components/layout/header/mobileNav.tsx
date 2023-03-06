import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useState, Fragment } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { Divider, Typography } from "@mui/material";
import logo from "../../../assets/img/logo.png";
import Image from "next/image";
import { useGlobalContext } from "@/contexts/globalData";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const { palette } = useTheme();

  const toggle = () => {
    setOpen(!open);
  };

  const close = () => {
    setOpen(false);
  };

  const {interventions} = useGlobalContext()

  return (
    <Box>
      <Button onClick={toggle} size="large">
        <MenuIcon fontSize="large" />
      </Button>
      <Drawer
        anchor="right"
        open={open}
        sx={{
          zIndex: 6666,
          ".MuiDrawer-paper": {
            width: "100%",
          },
        }}
      >
        <Box position="absolute" top={10} right={0} zIndex={9999}>
          <Button size="large" onClick={close}>
            <CloseIcon />
          </Button>
        </Box>

        <Box position="relative" height={90} width={120} mx="auto" mt={2}>
          <Link href="/">
            <Image
              fill
              src={logo}
              alt="Health travel"
              style={{ objectFit: "contain" }}
            />
          </Link>
        </Box>

        <List sx={{ mt: 4 }}>
          {interventions.map(({attributes: { name, slug }}) => (
            <Fragment key={name}>
              <ListItem>
                <Link href={name}>
                  <Typography sx={{ fontWeight: 600 }} component="span">
                    {name}
                  </Typography>
                </Link>
              </ListItem>
              <Divider component="li" />
            </Fragment>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
