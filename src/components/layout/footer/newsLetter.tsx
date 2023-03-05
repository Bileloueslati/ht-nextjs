import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import NearMeIcon from "@mui/icons-material/NearMe";

export default function NewsLetter() {
  return (
    <Box sx={{backgroundColor: "transparent"}}>
      <Container>
        <Stack
          sx={{
            backgroundColor: "#fff",
            boxShadow: "0 5px 40px 0 rgb(0 0 0 / 9%)",
            padding: 4,
            borderRadius: "10px",
            position: "relative",
            top: 20,
          }}
        >
          <Grid container spacing={0} alignItems="center">
            <Grid item lg={6} xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ color: "white" }}
                spacing={1.6}
              >
                <MarkAsUnreadIcon fontSize="large" color="primary" />
                <Box>
                  <Typography
                    fontSize={22}
                    fontWeight={600}
                    color="primary.main"
                  >
                    Newsletter
                  </Typography>
                  <Typography fontSize={14}>
                    Inscrivez-vous à notre newsletter pour recevoir nos offres,
                    nos actualités et nos promotions.
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid
              lg={6}
              xs={12}
              sx={{
                pt: {
                  lg: 2,
                },
                mt: {
                  lg: 0,
                  xs: 2,
                },
              }}
            >
              <Box>
                <TextField
                  fullWidth
                  label="Votre adresse email"
                  variant="outlined"
                  sx={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <NearMeIcon color="primary" />
                      </IconButton>
                    ),
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
