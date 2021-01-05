import React from "react";
import Form from "../Form/Form"

const signUpForm = (props) => {
    return (
        <>
            <Form
                submit={props.submit}
                buttonText={props.buttonText}
                inputs={[
                    {
                        title: "User name",
                        placeholder: "User name",
                        required: true
                    },
                    {
                        title: "Email address",
                        placeholder: "Email address",
                        required: true,
                    },
                    {
                        title: "Password",
                        type: "password",
                        placeholder: "Password",
                        required: true,
                    },
                ]}
            />
        </>
    );
};

export default signUpForm;
