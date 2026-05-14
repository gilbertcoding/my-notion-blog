const NOTION_API_BASE = "https://api.notion.com/v1"
const NOTION_VERSION = "2022-06-28"
const apiKey = "ntn_mE2985207423dNrAbXpDwFHttaxvIid8YqFvffOTBZc4YF"
const dbId = "35f011cb10a680198065c2818ea4b535"

function createSlug(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w가-힣-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

async function test() {
  const slug = "뜨개질로-만든-귀여운-토끼-인형"
  
  const response = await fetch(
    `${NOTION_API_BASE}/databases/${dbId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": NOTION_VERSION,
      },
      body: JSON.stringify({
        filter: {
          property: "Status",
          select: { equals: "발행됨" },
        },
      }),
    }
  )

  const data = await response.json()
  const pages = data.results || []
  
  console.log("Total posts:", pages.length)
  
  pages.forEach((p, i) => {
    const title = p.properties.Title?.title[0]?.plain_text ?? ""
    const generatedSlug = createSlug(title)
    console.log(`[${i}] Title: "${title}"`)
    console.log(`    Generated slug: "${generatedSlug}"`)
    console.log(`    Match: ${generatedSlug === slug}`)
  })
}

test().catch(console.error)
