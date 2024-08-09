// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// function LoginPage() {
//     const navigate = useNavigate();
//     let location = useLocation();
//     let auth = useAuth();

//     function handleSubmit(event) {
//         event.preventDefault();

//         const from = location.state?.from?.pathname || "/";
//         const formData = new FormData(event.currentTarget);
//         const username = formData.get("username").trim();
//         if (!username) {
//             return alert("username require")
//         }
//         auth.login(username, () => {
//             navigate(from, { replace: true });
//         });
//     }

//     return (
//         <div>
//             <h1>LoginPage</h1>

//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Username: <input name="username" type="text" required />
//                 </label>{" "}
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// }

// export default LoginPage;

import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, FTextField } from "../form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
});
const defaultValues = {
    username: "",
};

function LoginPage() {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });
    const { handleSubmit } = methods;

    const onSubmit = async (data) => {
        let from = location.state?.from?.pathname || "/";
        let username = data.username;

        auth.login(username, () => {
            navigate(from, { replace: true });
        });
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ minWidth: "350px" }}>
                <Typography variant="h4" textAlign="center">
                    Login
                </Typography>
                <FTextField name="username" label="Username" />

                <Button type="submit" variant="contained">
                    Login
                </Button>
            </Stack>
        </FormProvider>
    );
}

export default LoginPage;