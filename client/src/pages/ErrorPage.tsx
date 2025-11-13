import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const result = isRouteErrorResponse(error); // true / false we can dynamically render a error

  return <div>ErrorPage</div>;
};

export default ErrorPage;
