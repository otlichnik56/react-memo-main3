const baseHost = "https://wedev-api.sky.pro/api/v2/leaderboard";

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

export async function postLeader({ name, time, achievements }) {
  const response = await fetch(baseHost, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      time: time,
      achievements: achievements
    }),
  });
  if(!response.ok){
    throw Error("Ошибка сервера, он устал");
  }
  const leaders = await response.json();
  return leaders;
}