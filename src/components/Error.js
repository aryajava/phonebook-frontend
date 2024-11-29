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

export const NotFoundPage = () => {
  return (
    <div id="not-found-page">
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};
