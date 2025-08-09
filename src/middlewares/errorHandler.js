const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.message.includes("not found")) {
    return res.status(404).json({ error: error.message });
  }
  if (error.message.includes("Failed to fetch blogs")) {
    return res.status(400).json({ error: error.message });
  }
  if (error.message.includes("Failed to create blog")) {
    return res.status(400).json({ error: error.message });
  }
  if (error.message.includes("Failed to update blog")) {
    return res.status(400).json({ error: error.message });
  }
  if (error.message.includes("Failed to delete blog")) {
    return res.status(400).json({ error: error.message });
  }
  res.status(500).json({ error: error.message });
};

module.exports = errorHandler;