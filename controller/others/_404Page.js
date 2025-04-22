export const _404Page = (req, res) => {
  res.status(404).send("error 404: Not Found - " + req.url);
};
