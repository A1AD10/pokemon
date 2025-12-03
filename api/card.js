export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.pokemontcg.io/v2/cards", {
      headers: {
        "X-Api-Key": process.env.POKEMON_API_KEY
      }
    });

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
}
