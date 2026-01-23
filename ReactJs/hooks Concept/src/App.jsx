import useFetch from "./hooks/useFetch";

const App = () => {
  const { data, isLoading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/todos/",
  );
  const { data: user, isLoading: userLoading } = useFetch(
    "https://jsonplaceholder.typicode.com/todos/3",
  );

  if(error) return <h1>Error...</h1>

  return (
    <>
      {userLoading ? <h1>loading user...</h1> : user?.id}
      {isLoading ? <h1>Loading users...</h1> : data?.map((item, index) => (
        <li key={index}>
          <span>{item.id}</span>
          {item.title}
        </li>
      ))}
    </>
  );
};

export default App;
