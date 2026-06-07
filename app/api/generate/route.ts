import { NextRequest, NextResponse } from 'next/server'

const SIZE_MAP: Record<string, string> = {
  '9:16': '2K',
  '1:1': '2K',
  '4:3': '2K',
}

const STYLE_PROMPTS: Record<string, string> = {
  fresh: 'fresh and clean aesthetic, soft natural lighting, pastel tones, airy atmosphere',
  vintage: 'vintage film photography style, warm nostalgic tones, slight grain texture, retro aesthetic',
  minimal: 'minimalist design, clean composition, negative space, simple and elegant, muted colors',
  trendy: 'trendy modern style, vibrant colors, bold composition, contemporary aesthetic, high contrast',
  chinese: 'traditional Chinese aesthetic, ink wash painting style, elegant calligraphy elements, red and gold accents',
  tropical: 'tropical paradise vibe, lush greenery, bright sunlight, vivid saturated colors, summer energy',
}

const ANGLE_VARIATIONS = [
  'wide angle shot, full scene view',
  'close-up detail shot, macro perspective',
  'medium shot, balanced composition',
  'creative angle, dynamic perspective',
]

async function generateSingleImage(
  apiKey: string,
  model: string,
  prompt: string,
  sizeVal: string,
  variation: string,
): Promise<string | null> {
  const variedPrompt = `${prompt}, ${variation}`

  try {
    const arkResponse = await fetch('https://ark.cn-beijing.volces.com/api/v3/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        prompt: variedPrompt,
        size: sizeVal,
        watermark: true,
        response_format: 'url',
        sequential_image_generation: 'disabled',
      }),
    })

    if (!arkResponse.ok) {
      const errText = await arkResponse.text()
      console.error(`[Generate] Ark API error: ${arkResponse.status} - ${errText}`)
      return null
    }

    const arkData = await arkResponse.json()
    return arkData.data?.[0]?.url ?? null
  } catch (error) {
    console.error('[Generate] Single image error:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  // 延迟读取环境变量，避免编译时未定义导致错误
  const apiKey = process.env.ARK_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { code: 'CONFIG_ERROR', message: '服务未配置 API Key' },
      { status: 500 },
    )
  }

  const model = process.env.IMAGE_MODEL || 'doubao-seedream-5-0-260128'

  try {
    const body = await request.json()
    const { prompt, size = '1:1', style = 'fresh', count = 4 } = body

    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ code: 'EMPTY_PROMPT', message: '提示词不能为空' }, { status: 400 })
    }

    const sizeVal = SIZE_MAP[size] ?? '2K'
    const stylePrompt = STYLE_PROMPTS[style] ?? ''
    const enhancedPrompt = `${prompt}, ${stylePrompt}`

    const tasks = Array.from({ length: count }, (_, i) =>
      generateSingleImage(apiKey, model, enhancedPrompt, sizeVal, ANGLE_VARIATIONS[i % ANGLE_VARIATIONS.length] ?? ''),
    )

    const results = await Promise.all(tasks)
    const images = results.filter((url): url is string => url !== null)

    if (images.length === 0) {
      return NextResponse.json(
        { code: 'ALL_FAILED', message: '所有图片生成均失败' },
        { status: 500 },
      )
    }

    return NextResponse.json({ images })
  } catch (error) {
    console.error('[Generate] Unexpected error:', error)
    return NextResponse.json(
      { code: 'INTERNAL_ERROR', message: '服务器内部错误' },
      { status: 500 },
    )
  }
}
