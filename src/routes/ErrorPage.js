import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const { error } = useRouteError();
  console.log(error);
  return (
    <div id="error-page" className="container">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error}</i>
      </p>
    </div>
  );
};

export default ErrorPage;