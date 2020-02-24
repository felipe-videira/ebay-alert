
module.exports = async (req, res, next) => {
  try {
    req.lng = (req.get('Accept-Language') || '').split(',')[0].split('-')[0];
    next && next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}