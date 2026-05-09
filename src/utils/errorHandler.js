const getErrorMessage = (error) => {
  // Backend sent response
  if (error.response) {
    return error.response.data?.message || "Something went wrong";
  }

  // No response from server
  if (error.request) {
    return "Network error. Please check your connection.";
  }

  // Other unexpected errors
  return error.message || "An unexpected error occurred";
};

export default getErrorMessage;
