const errorMiddleware = (err, req, res, next) => {
  // Log the error to the console or any other logging mechanism
  console.error(err);

  // Send an error response to the client
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorMiddleware;
