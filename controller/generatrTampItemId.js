export const generateTampItemId = (req, res) => {
  const generatorTemporaryId = () =>
    Math.random().toString(36).substr(2, 9) + "-" + Date.now();
  res.status(200).json({ tempItemId: generatorTemporaryId() });
};
