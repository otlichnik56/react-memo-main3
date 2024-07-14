const baseHost = "https://wedev-api.sky.pro/api/leaderboard";

export async function getLeaders() {
    const response = await fetch(baseHost, {
      method: "GET"
    });
    if(!response.ok){
      throw Error("Ошибка сервера, он устал");
    }
    const leaders = await response.json();
    return leaders;
  }