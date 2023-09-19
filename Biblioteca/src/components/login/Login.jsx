import React from "react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";
import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";

export default function Login() {
  const [value, setValue] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const isInvalid = React.useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  return (
    

    <form className="flex flex-col justify-center items-center shadow-md rounded px-8 pt-6 pb-8">

        <h1 className="text-4xl font-extrabold text-center mb-6" style={{ fontFamily: 'Futura, sans-serif' }}>
          Login Usuarios
        </h1>

        <Input 
          key="email"
          value={value}
          type="email"
          label="Email"
          variant="bordered"
          isInvalid={isInvalid}
          color={isInvalid ? "danger" : "success"}
          errorMessage={isInvalid && "Please enter a valid email"}
          onValueChange={setValue}
          className="max-w-xs mb-4"
        />
        <Input 
          key="password"
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs mb-4"
        />
        <Button color="primary" variant="shadow" type="submit">
            Login
        </Button>
      </form>
    
  );
}

