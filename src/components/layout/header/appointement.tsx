import {
  Button,
  Fade,
  Modal,
  Box,
  IconButton,
  useTheme,
  TextField,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Alert,
  Autocomplete,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import EastIcon from "@mui/icons-material/East";
import { countries, CountryType } from "@/const/countries";
import Image from "next/image";
import { useEffect } from "react";
import { Api } from "@/libs/axios";

registerLocale("fr", fr);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
  background: "#fff",
  py: 3,
  px: 5,
  borderRadius: 3,
  maxHeight: {
    lg: "80%",
    xs: "75%",
  },
  overflowY: {
    lg: "hidden",
    xs: "scroll",
  },
  width: {
    lg: 700,
    xs: "95%",
  },
};

type Props = {
  open?: boolean;
};

export type AppointementFormData = {
  contact_type: string;
  country: CountryType;
  date: string;
  email: string;
  fullName: string;
  phone_number: string;
};

export default function Appointement({ open: defaultOpen = false }: Props) {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { palette } = useTheme();

  const now = new Date();

  const minTime = () =>
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<AppointementFormData>();

  const onSubmit = async (data: any) => {
    try {
      await Api.post("/appointement", data);
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getCountry = async () => {
      try {
        const { data } = await axios.get<{
          country: { iso_code: CountryType["code"] };
        }>(
          "https://api.geoapify.com/v1/ipinfo?&apiKey=1f1107afde3a4aff803f579ebe3a32c4"
        );

        const country = countries.find(
          ({ code }) => code === data.country.iso_code
        );

        if (country) {
          setValue("country", country);
        }
      } catch (e: any) {}
    };
    getCountry();
  }, [setValue]);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="text"
        size="small"
        startIcon={<CalendarMonthIcon />}
      >
        Demande de consulation
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          zIndex: 1200,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              position="absolute"
              top={{
                lg: 5,
                xs: 10,
              }}
              right={0}
            >
              <IconButton
                sx={{ color: palette.primary.main, fontSize: 30 }}
                onClick={handleClose}
              >
                <CloseIcon fontSize="inherit" color="inherit" />
              </IconButton>
            </Box>

            <Box>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <CalendarMonthIcon fontSize="large" color="primary" />
                <Typography
                  fontSize={{
                    lg: 22,
                    xs: 20,
                  }}
                  variant="h3"
                  color="primary"
                >
                  Prise de rendez-vous
                </Typography>
              </Stack>

              <Typography fontSize={14} fontWeight={400}>
                Demandez conseil ?? propos de vos questions beaut?? ?? nos
                expertes. Nous vous contactons pour r??pondre ?? toutes vos
                questions
              </Typography>
            </Box>

            {isSubmitSuccessful ? (
              <Alert severity="success" sx={{ mt: 2, fontWeight: 400 }}>
                Merci. Nous avons bien re??u votre demande
              </Alert>
            ) : (
              <Box component="form" mt={3} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item lg={6} xs={12}>
                    <Controller
                      control={control}
                      name="date"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          locale={fr}
                          minDate={new Date()}
                          timeCaption="Heure"
                          dateFormat="d MMMM yyyy ?? H:mm"
                          timeIntervals={60}
                          minTime={minTime()}
                          maxTime={
                            new Date(
                              now.getFullYear(),
                              now.getMonth(),
                              now.getDate(),
                              17,
                              0,
                              0
                            )
                          }
                          selected={value ? new Date(value) : null}
                          value={value || ""}
                          onChange={onChange}
                          customInput={
                            <TextField
                              fullWidth
                              label="Date"
                              error={!!errors.date}
                            />
                          }
                          showTimeSelect
                        />
                      )}
                    />
                  </Grid>

                  <Grid item lg={6} xs={12}>
                    <TextField
                      label="Nom et pr??nom"
                      fullWidth
                      error={!!errors.fullName}
                      {...register("fullName", { required: true })}
                    />
                  </Grid>

                  <Grid item lg={6} xs={12}>
                    <TextField
                      label="Num??ro de t??l??phone"
                      {...register("phone_number", { required: true })}
                      error={!!errors.phone_number}
                      type="number"
                      sx={{
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                          {
                            margin: 0,
                            appearance: "none",
                          },
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <TextField
                      label="Email"
                      {...register("email", {
                        required: true,
                        pattern: /\S+@\S+\.\S+/,
                      })}
                      error={!!errors.email}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      control={control}
                      name="country"
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          onChange={(e, newValue) => {
                            onChange(newValue);
                          }}
                          value={value || countries[0]}
                          sx={{ width: "100%" }}
                          options={countries}
                          autoHighlight
                          getOptionLabel={(option) => option.label}
                          renderOption={(props, option) => (
                            <Box
                              component="li"
                              position="relative"
                              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                              {...props}
                            >
                              <Image
                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                height={20}
                                width={20}
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                              {option.label} ({option.code}) +{option.phone}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              helperText="??a nous permet de connaitre l'indicatif de votre pays afin de vous joindre"
                              {...params}
                              label="S??lectionner votre pays"
                              inputProps={{
                                ...params.inputProps,
                              }}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item lg={12} xs={12}>
                    <FormControl>
                      <FormLabel>Je souhaite ??tre contact?? par:</FormLabel>
                      <Controller
                        rules={{ required: true }}
                        control={control}
                        name="contact_type"
                        render={({ field: { value, ...rest } }) => (
                          <RadioGroup value={value || "Whatsapp"} row {...rest}>
                            {["Whatsapp", "T??l??phone", "Email"].map((v) => (
                              <FormControlLabel
                                key={v}
                                value={v}
                                control={<Radio size="small" />}
                                label={v}
                              />
                            ))}
                          </RadioGroup>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Box mx="auto" textAlign="center">
                      <LoadingButton
                        type="submit"
                        loading={isSubmitting}
                        loadingPosition="center"
                        variant="contained"
                        size="large"
                        startIcon={<EastIcon />}
                      >
                        Envoyer
                      </LoadingButton>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
