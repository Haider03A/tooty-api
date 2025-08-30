export const othersErorrHandler = (error, req, res, next) => {
  if (error instanceof SyntaxError) {
    return res.status(400).json({
      message: "Invalid data format, Please check the syntax of your request",
    });
  }

  console.error(error);
  return res.status(500).json({
    message: "Something went wrong, Please try again later",
  });
};
