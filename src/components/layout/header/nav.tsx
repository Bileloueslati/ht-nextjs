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

  const primaryItems = interventions.filter(
    ({ attributes: { primary_nav } }) => Boolean(primary_nav) === true
  );

  const secondaryItems = interventions.filter(
    ({ attributes: { primary_nav } }) => Boolean(primary_nav) === false
  );

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
        <Box component="li">
          <Link href="/about">
            <Typography
              component="span"
              color="white"
              fontWeight={500}
              fontSize={"1rem"}
              sx={{
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              A propos
            </Typography>
          </Link>
        </Box>

        <Box component="li">
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <>
                <Button
                  variant="text"
                  sx={{ color: "#fff", fontSize: "1rem" }}
                  {...bindTrigger(popupState)}
                >
                  Interventions
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
                  {secondaryItems.map(
                    (
                      { id, attributes: { name, navigation_name, slug } },
                      i
                    ) => (
                      <MenuItem
                        sx={{
                          fontWeight: 400,
                          fontSize: "1rem",
                          cursor: "pointer",
                        }}
                        key={i}
                        onClick={() => {
                          popupState.close();
                          handleClick(`/intervention/${slug}/${id}`);
                        }}
                      >
                        {navigation_name || name}
                      </MenuItem>
                    )
                  )}
                </Menu>
              </>
            )}
          </PopupState>
        </Box>

        {primaryItems.map(
          ({ id, attributes: { name, navigation_name, slug, services } }) =>
            services?.data.length ? (
              <Box component="li" key={id}>
                <PopupState variant="popover">
                  {(popupState) => (
                    <>
                      <Button
                        variant="text"
                        sx={{ color: "#fff", fontSize: "1rem" }}
                        {...bindTrigger(popupState)}
                      >
                        {navigation_name || name}
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
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                        {...bindMenu(popupState)}
                      >
                        {services.data.map(
                          (
                            {
                              id,
                              attributes: {
                                name,
                                navigation_name,
                                slug: serviceSlug,
                              },
                            },
                            i
                          ) => (
                            <MenuItem
                              sx={{
                                fontWeight: 400,
                                fontSize: "1rem",
                                cursor: "pointer",
                              }}
                              key={i}
                              onClick={() => {
                                popupState.close();
                                handleClick(
                                  `/intervention/${slug}/${id}/${serviceSlug}`
                                );
                              }}
                            >
                              {navigation_name || name}
                            </MenuItem>
                          )
                        )}
                      </Menu>
                    </>
                  )}
                </PopupState>
              </Box>
            ) : (
              <Box component="li" key={id}>
                <Link href={`/intervention/${slug}/${id}`}>
                  <Typography
                    component="span"
                    color="white"
                    fontWeight={500}
                    fontSize={"1rem"}
                    sx={{
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {navigation_name || name}
                  </Typography>
                </Link>
              </Box>
            )
        )}

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
