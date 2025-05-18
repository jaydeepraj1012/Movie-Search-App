export default async function handler(req, res) {
    const { movieName } = req.query;
  
    const apiRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=2804451af6e88beb0b3478904a2b9ee3&query=${movieName}`
    );
  
    const data = await apiRes.json();
  
    // CORS header allow
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  }
  