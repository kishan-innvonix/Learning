import React from "react";

const AuthLayout = ({
  children,
  leftTitle,
  leftDescription,
  leftSubText,
  authTitle,
}) => {
  return (
    <div className="registerContainer flex justify-center items-center w-full relative">
      <div className="left w-[50%] hidden bg-black h-full md:flex flex-col justify-center items-center px-16 text-center gap-8 ">
        <h2 className="lg:text-5xl text-4xl text-white font-bold">
          {" "}
          {leftTitle}
        </h2>

        <p className="lg:text-2xl text-xl text-zinc-200">{leftDescription}</p>

        <p className="lg:text-lg text-zinc-400">{leftSubText}</p>
      </div>

      <div className="right w-full md:w-[50%]">
        <div className="flex flex-col gap-10 items-center justify-evenly">
          <h1 className="text-4xl font-bold ">{authTitle}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
