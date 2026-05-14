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

async function getPublishedPosts() {
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
        sorts: [
          {
            property: "PublishedAt",
            direction: "descending",
          },
        ],
      }),
    }
  )

  const data = await response.json()
  return (data.results || []).map((page) => {
    const title = page.properties.Title?.title[0]?.plain_text ?? ""
    return {
      slug: createSlug(title),
      title,
    }
  })
}

async function test() {
  const posts = await getPublishedPosts()
  console.log("Posts for generateStaticParams:")
  posts.forEach(p => {
    console.log(`  - slug: "${p.slug}"`)
  })
}

test().catch(console.error)
