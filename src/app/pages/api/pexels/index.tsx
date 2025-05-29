export const getCityImage = async (city: string) => {
    const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
    console.log(apiKey);
    if (!apiKey) {
        throw new Error("PEXELS_API_KEY is not defined");
    }
    const response = await fetch(`https://api.pexels.com/v1/search?query=${city}&per_page=1`, {
        method: "GET",
        headers: {
            Authorization: apiKey,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return data.photos[0].src.large;
}