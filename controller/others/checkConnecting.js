export const checkConnecting = (req, res) => {
  res.status(200).json({
    message: "Connected the server",
    isConnected: true,
  });
};
