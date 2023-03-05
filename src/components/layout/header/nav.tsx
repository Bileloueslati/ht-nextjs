import { Stack, Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

export const navItems = [
  {
    name: "À propos",
    link: "/about",
    children: [],
  },
  {
    name: "Interventions",
    link: "/about",
    children: [
      {
        name: "Obésité",
        link: "/about",
      },
    ],
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

export default function Nav() {
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
        {navItems.map(({ name, link }) => (
          <Box component="li" key={name} sx={{ color: "white" }}>
            <Link href={link}>
              <Typography
                component="span"
                color="white"
                fontWeight={400}
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {name}
              </Typography>
            </Link>
          </Box>
        ))}

        <Box component="li">
          <Button variant="contained" startIcon={<PermIdentityOutlinedIcon />}>
            Espace perso
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
