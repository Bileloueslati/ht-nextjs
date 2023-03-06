import { Stack, Box, Typography, Button, MenuItem, Menu } from "@mui/material";
import Link from "next/link";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/contexts/globalData";
import { CRM_URL } from "@/const";

export default function Nav() {
  const router = useRouter();

  const handleClick = (href: string) => {
    router.push(href);
  };

  const { interventions } = useGlobalContext();

  const navItems = [
    {
      name: "À propos",
      link: "/about",
      children: [],
    },
    {
      name: "Interventions",
      link: "/about",
      children: interventions,
    },
    {
      name: "Obésité",
      link: "/about",
      children: [],
    },
    {
      name: "Invitro",
      link: "/about",
      children: [],
    },
    {
      name: "Dentaire",
      link: "/about",
      children: [],
    },
    {
      name: "Soins esthétiques",
      link: "/about",
      children: [],
    },
  ] as const;

  return (
    <Box
      component="nav"
      py={1}
      sx={{
        display: {
          lg: "block",
          xs: "none",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={4}
        component="ul"
        justifyContent="end"
        alignItems="center"
        sx={{ listStyle: "none" }}
      >
        {navItems.map(({ name, link, children }) => (
          <Box component="li" key={name} sx={{ color: "white" }}>
            {children.length ? (
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <>
                    <Button
                      variant="text"
                      sx={{ color: "#fff" }}
                      {...bindTrigger(popupState)}
                    >
                      {name}
                    </Button>
                    <Menu
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      {...bindMenu(popupState)}
                    >
                      {children.map(({ id, attributes: { name, slug } }, i) => (
                        <MenuItem
                          sx={{
                            fontWeight: 400,
                            fontSize: "0.875rem",
                            cursor: "pointer",
                          }}
                          key={i}
                          onClick={() => {
                            popupState.close();
                            handleClick(`/intervention/${slug}/${id}`);
                          }}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                )}
              </PopupState>
            ) : (
              <Link href={link}>
                <Typography
                  component="span"
                  color="white"
                  fontWeight={500}
                  fontSize={"0.875rem"}
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  {name}
                </Typography>
              </Link>
            )}
          </Box>
        ))}

        <Box component="li">
          <Button
            href={CRM_URL}
            target="_blank"
            variant="contained"
            startIcon={<PermIdentityOutlinedIcon />}
          >
            Espace perso
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
