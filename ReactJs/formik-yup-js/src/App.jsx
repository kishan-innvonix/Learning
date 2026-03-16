import { Field, Form, Formik, ErrorMessage } from "formik";
import { formSchema } from "./schemas/schemas";

const App = () => {
  const handleSubmit = async (values) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error)
    } finally {
      console.log("Done")
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
        }}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValidating }) => (
          <Form className="flex justify-center items-center w-full min-h-[50vh] flex-col">
            <div className="space-y-2">
              <h1 className="text-center underline">Demo</h1>
              <div className="name">
                <label htmlFor="name">Name: </label>
                <Field
                  id="name"
                  className={`${
                    errors.name && touched.name ? "border-red-500" : "*:"
                  } border block`}
                  type="text"
                  name="name"
                />
                <ErrorMessage
                  className="text-red-500"
                  name="name"
                  component={"p"}
                />
              </div>
              <div className="email">
                <label htmlFor="email">Email: </label>
                <Field
                  id="email"
                  className={`${
                    errors.email && touched.email ? "border-red-500" : ""
                  } border block`}
                  type="email"
                  name="email"
                />
                <ErrorMessage
                  className="text-red-500"
                  name="email"
                  component={"p"}
                />
              </div>
              <button type="submit" className="border px-2">
                {isValidating ? "Validating Input..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default App;
