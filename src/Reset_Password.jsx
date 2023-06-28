import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup"; 
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const formValidationSchema = yup.object({
  userid: yup.string().required().email(),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Reset_Password() {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        userid: ""
      },
      validationSchema: formValidationSchema,
      onSubmit: async (e) => {
        const result = await fetch(
          "https://sample-login-node.vercel.app/passwordlink",
          {
            method: "POST",
            body: JSON.stringify({
              username: e.userid
            }),
            headers: { "Content-Type": "application/json" },
          }
        ).then((data) => data);
        if (result.status == 201) {
           handleClick();
        } else {
          navigate("/");
        }
      },
    });
  const navigate = useNavigate();
  return (
    <div style={{ padding: "80px 0" }}>
    <div></div>
    <div className="login-box">
      <p>Enter your Email Id</p>
      <form onSubmit={handleSubmit}>
        <TextField
          name="userid"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.userid}
          label="Email Id"
          variant="outlined"
          size="small"
        />
        {touched.userid && errors.userid ? errors.userid : null}
        <Button variant="contained" type="submit">
          Send
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            Check email for reset link
          </Alert>
        </Snackbar>
    </div>
  </div>
  );
}