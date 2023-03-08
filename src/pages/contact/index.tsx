import Banner from "@/components/common/banner";
import Layout from "@/components/layout";
import {
  Box,
  Container,
  TextField,
  FormControl,
  Select,
  Alert,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Seo from "../../components/common/seo";
import Grid from "@mui/material/Unstable_Grid2";
import { LoadingButton } from "@mui/lab";
import EastIcon from "@mui/icons-material/East";
import { Api } from "@/libs/axios";

export default function Contact() {
  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await Api.post("/contact", data);
    } catch (e: any) {}
  };

  return (
    <>
      <Seo metaTitle="Contact" />

      <Layout>
        <Banner title="Contactez-nous" />

        <Box my={6}>
          <Container>
            <Grid container>
              <Grid mdOffset={1} md={10} xs={12}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={4}>
                    <Grid xs={12} md={6}>
                      <TextField
                        label="Nom et prénom"
                        {...register("fullName", {
                          required: true,
                        })}
                        error={!!errors.fullName}
                        disabled={isSubmitSuccessful}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        label="Email"
                        {...register("email", {
                          required: true,
                          pattern: /\S+@\S+\.\S+/,
                        })}
                        error={!!errors.email}
                        fullWidth
                        disabled={isSubmitSuccessful}
                      />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <TextField
                        label="Numéro de téléphone"
                        type="number"
                        sx={{
                          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                            {
                              margin: 0,
                              appearance: "none",
                            },
                        }}
                        {...register("phoneNumber", { required: true })}
                        error={!!errors.phoneNumber}
                        disabled={isSubmitSuccessful}
                        fullWidth
                      />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Controller
                        control={control}
                        name="subject"
                        render={({ field: { onChange, value } }) => (
                          <FormControl fullWidth>
                            <InputLabel id="subject">Objet</InputLabel>
                            <Select
                              labelId="subject"
                              label="Objet"
                              onChange={onChange}
                              value={value || "Demande consultation"}
                              disabled={isSubmitSuccessful}
                            >
                              {[
                                "Demande consultation",
                                "Demande de devis",
                                "Presse",
                                "Autre",
                              ].map((item, i) => (
                                <MenuItem key={i} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      />
                    </Grid>

                    <Grid xs={12} md={12}>
                      <TextField
                        multiline
                        rows={4}
                        label="Votre message"
                        {...register("msg", { required: true })}
                        error={!!errors.msg}
                        fullWidth
                        disabled={isSubmitSuccessful}
                      />
                    </Grid>

                    <Grid xs={12} md={12}>
                      <Box mx="auto" textAlign="center">
                        {isSubmitSuccessful ? (
                          <Alert
                            severity="success"
                            sx={{ mt: 2, fontWeight: 400 }}
                          >
                            Merci. Nous avons bien reçu votre message et nous
                            vous répondrons dans les plus brefs délais.
                          </Alert>
                        ) : (
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
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {},
  };
}
