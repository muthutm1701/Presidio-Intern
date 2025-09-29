const VALID_API_KEY = "Imadmin"; 
const checkApiKey = (req, res, next) => {
    const apiKey = req.query.apiKey; 
    if (!apiKey || apiKey !== VALID_API_KEY) {
        return res.status(401).json({ error: "Invalid or missing API key" });
    }
    next(); 
};

module.exports = checkApiKey;
