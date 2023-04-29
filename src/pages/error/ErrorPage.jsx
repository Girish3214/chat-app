import { useRouteError, Link } from "react-router-dom";
import "./error.css";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={"/"}>Go to Home page</Link>
    </div>
  );
};

export default ErrorPage;
