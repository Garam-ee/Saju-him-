/* 넷리파이 폼에 이메일이 들어오면 노션 원장에 한 줄 쌓는다.
 *
 * 이 함수가 없어도 이메일은 절대 안 없어진다 — 넷리파이 폼 대시보드에
 * 그대로 남는다. 이건 "노션에서 보고 싶다"를 위한 배선일 뿐이다.
 *
 * 켜려면 넷리파이 Site settings → Environment variables 에 두 개:
 *   NOTION_TOKEN  = ntn_... (notion.so/my-integrations 에서 발급)
 *   NOTION_DB     = 7e97257ca64445138330d59549df2de3
 * 그리고 노션 원장 페이지에서 ⋯ → Connections → 그 integration 을 연결.
 * 토큰이 없으면 조용히 아무것도 안 하고 200을 돌려준다 — 폼 접수는
 * 어차피 성공했고, 여기서 500을 내면 넷리파이가 실패로 기록한다.
 */
exports.handler = async (event) => {
  const ok = { statusCode: 200, body: "ok" };
  const token = process.env.NOTION_TOKEN;
  const db = process.env.NOTION_DB;
  if (!token || !db) {
    console.log("notion relay off — NOTION_TOKEN/NOTION_DB not set");
    return ok;
  }

  let data = {};
  try { data = (JSON.parse(event.body || "{}").payload || {}).data || {}; }
  catch (e) { console.log("bad payload", e.message); return ok; }

  const email = (data.email || "").trim();
  if (!email) return ok;

  const props = {
    email:   { title: [{ text: { content: email } }] },
    "받은날": { date: { start: new Date().toISOString() } },
    "어디서": { select: { name: "free result" } },
  };
  // 점수는 폼에 실려 올 때만 넣는다. 빈 값을 넣으면 노션이 0으로 기록한다.
  const score = Number(data.score);
  if (Number.isFinite(score) && score > 0) props["궁합점수"] = { number: score };

  try {
    const r = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parent: { database_id: db }, properties: props }),
    });
    if (!r.ok) console.log("notion rejected", r.status, await r.text());
  } catch (e) {
    console.log("notion relay failed", e.message);
  }
  return ok;
};
