const ErrorMessage = ({ message = "Something went wrong" }) => {
  return <div data-testid="error-message">{message}</div>;
};

export default ErrorMessage;
