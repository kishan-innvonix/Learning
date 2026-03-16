import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { registerSchema, type registerValueType } from "./schemas/schemas";

const App = () => {
  
  const handleSubmit = async (
    value: registerValueType,
    {
      resetForm,
      setErrors,
      setSubmitting,
      setStatus,
    }: FormikHelpers<registerValueType>,
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(value);
      resetForm();
      setStatus({ success: "Registered!" });
    } catch (error) {
      setErrors({ name: "Error occured", email: "Error occured" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik<registerValueType>
        initialValues={{
          name: "",
          email: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={toFormikValidationSchema(registerSchema)}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex justify-center items-center w-full min-h-[50vh] flex-col">
            <div className="space-y-2">
              <h1 className="text-center underline">Demo</h1>
              <div className="name">
                <label htmlFor="name">Name: </label>
                <Field
                  id="name"
                  className={`border block ${errors.name && touched.name && "border-red-500"}`}
                  type="text"
                  name="name"
                />
                <ErrorMessage
                  className="text-red-500 font-light"
                  name="name"
                  component={"p"}
                />
              </div>
              <div className="email">
                <label htmlFor="email">Email: </label>
                <Field
                  id="email"
                  className={`border block ${errors.email && touched.email && "border-red-500"}`}
                  type="email"
                  name="email"
                />
                <ErrorMessage
                  className="text-red-500 font-light"
                  name="email"
                  component={"p"}
                />
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="border px-2"
              >
                {isSubmitting ? "Submiting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default App;
