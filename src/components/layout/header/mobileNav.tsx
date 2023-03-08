import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useState, Fragment, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { AccordionDetails, Divider, Typography } from "@mui/material";
import logo from "../../../assets/img/logo.png";
import Image from "next/image";
import { useGlobalContext } from "@/contexts/globalData";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/router";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const close = () => {
    setOpen(false);
  };

  const { interventions } = useGlobalContext();

  const primaryItems = interventions.filter(
    ({ attributes: { primary_nav } }) => Boolean(primary_nav) === true
  );

  const secondaryItems = interventions.filter(
    ({ attributes: { primary_nav } }) => Boolean(primary_nav) === false
  );

  const { events } = useRouter();

  useEffect(() => {
    events.on("routeChangeComplete", () => {
      close();
    });
  }, [events]);

  return (
    <Box>
      <Button onClick={toggle} variant="text">
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
          <ListItem>
            <Link href="/">
              <Typography sx={{ fontWeight: 600 }} component="span">
                Accueil
              </Typography>
            </Link>
          </ListItem>

          <Divider component="li" />

          <ListItem>
            <Link href="/about">
              <Typography sx={{ fontWeight: 600 }} component="span">
                A propos
              </Typography>
            </Link>
          </ListItem>
          <Divider component="li" />

          <ListItem sx={{ p: 0 }}>
            <Accordion
              sx={{
                "&.MuiPaper-root": {
                  width: "100%",
                },
                "&.MuiListItem-root": {
                  padding: 0,
                },
                "&.MuiAccordion-root": {
                  boxShadow: "none",
                },
              }}
            >
              <AccordionSummary
                sx={{ fontWeight: 600, color: "secondary.main" }}
                component="span"
                expandIcon={<ExpandMoreIcon />}
              >
                Interventions
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <List>
                  {secondaryItems.map(
                    (
                      { id, attributes: { name, slug, navigation_name } },
                      i
                    ) => (
                      <Fragment key={name}>
                        <ListItem>
                          <Link href={`/intervention/${slug}/${id}`}>
                            <Typography
                              sx={{ fontWeight: 600 }}
                              component="span"
                            >
                              {navigation_name || name}
                            </Typography>
                          </Link>
                        </ListItem>
                        {i < secondaryItems.length - 1 && (
                          <Divider component="li" />
                        )}
                      </Fragment>
                    )
                  )}
                </List>
              </AccordionDetails>
            </Accordion>
          </ListItem>

          <Divider component="li" />
          {primaryItems.map(
            ({ id, attributes: { name, slug, navigation_name, services } }) =>
              services?.data.length ? (
                <Accordion
                  key={id}
                  sx={{
                    "&.MuiPaper-root": {
                      width: "100%",
                    },
                    "&.MuiListItem-root": {
                      padding: 0,
                    },
                    "&.MuiAccordion-root": {
                      boxShadow: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    sx={{ fontWeight: 600, color: "secondary.main" }}
                    component="span"
                    expandIcon={<ExpandMoreIcon />}
                  >
                    {navigation_name || name}
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: 0 }}>
                    <List>
                      {services.data.map(
                        (
                          {
                            id,
                            attributes: {
                              name,
                              slug: serviceSlug,
                              navigation_name,
                            },
                          },
                          i
                        ) => (
                          <Fragment key={name}>
                            <ListItem>
                              <Link
                                href={`/intervention/${slug}/${id}/${serviceSlug}`}
                              >
                                <Typography
                                  sx={{ fontWeight: 600 }}
                                  component="span"
                                >
                                  {navigation_name || name}
                                </Typography>
                              </Link>
                            </ListItem>
                            {i < services.data.length - 1 && (
                              <Divider component="li" />
                            )}
                          </Fragment>
                        )
                      )}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <Fragment key={name}>
                  <ListItem>
                    <Link href={`/intervention/${slug}/${id}`}>
                      <Typography sx={{ fontWeight: 600 }} component="span">
                        {navigation_name || name}
                      </Typography>
                    </Link>
                  </ListItem>
                </Fragment>
              )
          )}
          <Divider component="li" />
          <ListItem>
            <Link href="/temoignages">
              <Typography sx={{ fontWeight: 600 }} component="span">
                Témoignages
              </Typography>
            </Link>
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <Link href="/blog">
              <Typography sx={{ fontWeight: 600 }} component="span">
                Blog
              </Typography>
            </Link>
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <Link href="/contact">
              <Typography sx={{ fontWeight: 600 }} component="span">
                Contact
              </Typography>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
