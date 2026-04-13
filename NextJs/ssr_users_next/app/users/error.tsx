"use client";

const Error = ({ error }: { error: Error }) => {
  console.log(error);
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
};

export default Error;
