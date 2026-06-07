"use client";

import { useEffect, useState } from "react";

// Translations matching PicFlow AI's message structure
const en = {
  nav: {
    home: "Home",
    generate: "Create Image",
    templates: "Templates",
    pricing: "Pricing",
    account: "Account",
    startCreate: "Start Creating",
  },
  home: {
    badge: "Powered by FLUX.1-Schnell · 100% Free",
    heroCta: "→ Start Creating Free",
    heroViewCases: "View Showcase",
    heroSlogan: "AI-Driven Image Creation for Social & E-commerce Scenarios",
    heroDesc:
      "No registration required. Unlimited free generations. Optimized for short-video covers, e-commerce product images, and regional content. Describe it, get it in 10 seconds.",
    stats: {
      mau: "Monthly Active Users",
      images: "Images Generated",
      rating: "User Rating",
      encryption: "Data Encryption",
    },
    features: {
      title: "Why PicFlow AI",
      subtitle: "Deeply optimized for social & e-commerce scenarios",
    },
    showcase: {
      title: "Featured Creations",
      subtitle: "Millions of creators are using PicFlow AI to generate quality content",
      cta: "Create Your First Image →",
    },
    reviews: {
      title: "User Reviews",
      subtitle: "Genuine feedback from creators worldwide",
    },
    faq: { title: "FAQ", subtitle: "Quick answers to common questions" },
  },
  generate: {
    title: "Describe Image",
    prompt: { placeholder: "Describe what you want to generate..." },
    size: { label: "Size", shortVideo: "Short Video", social: "Social Media", ecommerce: "E-commerce" },
    style: { label: "Style", fresh: "Fresh", vintage: "Vintage", minimal: "Minimal", trendy: "Trendy", chinese: "Chinese", tropical: "Tropical" },
    generate: "✦ Generate",
    generating: "Generating...",
    gdprSafe: "🛡️ GDPR Safe",
    zeroRetention: "Zero data retention · Privacy compliant",
    results: "Results",
    resultsSubtitle: "Click image to enlarge · Download supported",
    e2eEncrypted: "🛡️ End-to-end encrypted",
    waiting: "Waiting...",
    generatingState: "Generating...",
    downloadImage: "⬇️ Download",
    share: "Share",
    close: "Close",
    chips: { tropical: "🌴 Tropical", product: "🛍️ Product", cover: "🎬 Cover", food: "🍜 Food", fashion: "👗 Fashion", travel: "🏖️ Travel" },
  },
  templates: {
    title: "Templates",
    subtitle: "100+ professional templates covering major social & e-commerce scenarios",
    all: "All",
    shortVideo: "Short Video",
    ecommerce: "E-commerce",
    social: "Social Media",
    regional: "Regional",
    search: "Search templates by name or scenario...",
    useButton: "Use Template",
    noResults: "No matching templates found",
    clearFilters: "Clear filters",
  },
};

const zh = {
  nav: {
    home: "首页",
    generate: "生成图片",
    templates: "模板",
    pricing: "价格",
    account: "账户",
    startCreate: "开始创作",
  },
  home: {
    badge: "由 FLUX.1-Schnell 驱动 · 100% 免费",
    heroCta: "→ 免费开始创作",
    heroViewCases: "查看案例",
    heroSlogan: "AI 驱动的社交媒体与电商图像创作",
    heroDesc: "无需注册，无限免费生成。专为短视频封面、电商产品图和区域特色内容优化。描述它，10 秒内获得。",
    stats: { mau: "月活跃用户", images: "图片生成量", rating: "用户评分", encryption: "数据加密率" },
    features: { title: "为什么选择 PicFlow AI", subtitle: "深度优化社交与电商场景" },
    showcase: { title: "精选作品", subtitle: "数百万创作者正在使用 PicFlow AI 生成优质内容", cta: "创作您的第一张图片 →" },
    reviews: { title: "用户评价", subtitle: "来自全球创作者的真实反馈" },
    faq: { title: "常见问题", subtitle: "快速解答常见问题" },
  },
  generate: {
    title: "描述图片",
    prompt: { placeholder: "描述你想要生成的内容..." },
    size: { label: "尺寸", shortVideo: "短视频", social: "社媒主图", ecommerce: "电商展示" },
    style: { label: "风格", fresh: "清新", vintage: "复古", minimal: "简约", trendy: "潮流", chinese: "国风", tropical: "热带" },
    generate: "✦ 生成图片",
    generating: "生成中...",
    gdprSafe: "🛡️ GDPR 安全",
    zeroRetention: "零数据留存 · 隐私合规",
    results: "生成结果",
    resultsSubtitle: "点击图片可查看大图 · 支持下载",
    e2eEncrypted: "🛡️ 端到端加密",
    waiting: "等待生成...",
    generatingState: "生成中...",
    downloadImage: "⬇️ 下载图片",
    share: "分享",
    close: "关闭",
    chips: { tropical: "🌴 热带", product: "🛍️ 产品", cover: "🎬 封面", food: "🍜 美食", fashion: "👗 穿搭", travel: "🏖️ 旅行" },
  },
  templates: {
    title: "模板库",
    subtitle: "100+ 专业模板 · 覆盖主流社媒电商场景",
    all: "全部",
    shortVideo: "短视频",
    ecommerce: "电商主图",
    social: "社媒贴文",
    regional: "区域特化",
    search: "搜索模板名称或场景...",
    useButton: "使用此模板",
    noResults: "没有找到匹配的模板",
    clearFilters: "清除筛选条件",
  },
};

const es = {
  nav: {
    home: "Inicio",
    generate: "Crear",
    templates: "Plantillas",
    pricing: "Precios",
    account: "Cuenta",
    startCreate: "Comenzar",
  },
  home: {
    badge: "Impulsado por FLUX.1-Schnell · 100% Gratis",
    heroCta: "→ Comenzar Gratis",
    heroViewCases: "Ver Demostración",
    heroSlogan: "Creación de Imágenes AI para Redes Sociales y E-commerce",
    heroDesc: "Sin registro. Generaciones ilimitadas gratis. Optimizado para portadas de videos, imágenes de productos.",
    stats: { mau: "Usuarios Activos", images: "Imágenes Generadas", rating: "Valoración", encryption: "Cifrado" },
    features: { title: "Por qué PicFlow AI", subtitle: "Optimizado para redes sociales y e-commerce" },
    showcase: { title: "Creaciones Destacadas", subtitle: "Millones de creadores usan PicFlow AI", cta: "Crea tu primera imagen →" },
    reviews: { title: "Opiniones", subtitle: "Feedback genuino de creadores" },
    faq: { title: "FAQ", subtitle: "Respuestas rápidas" },
  },
  generate: {
    title: "Describir imagen",
    prompt: { placeholder: "Describe lo que quieres generar..." },
    size: { label: "Tamaño", shortVideo: "Video corto", social: "Redes sociales", ecommerce: "E-commerce" },
    style: { label: "Estilo", fresh: "Fresco", vintage: "Vintage", minimal: "Minimalista", trendy: "Moderno", chinese: "Estilo chino", tropical: "Tropical" },
    generate: "✦ Generar",
    generating: "Generando...",
    gdprSafe: "🛡️ GDPR Seguro",
    zeroRetention: "Retención de datos cero · Privacidad conforme",
    results: "Resultados",
    resultsSubtitle: "Haz clic para ampliar · Descarga disponible",
    e2eEncrypted: "🛡️ Encriptado de extremo a extremo",
    waiting: "Esperando...",
    generatingState: "Generando...",
    downloadImage: "⬇️ Descargar",
    share: "Compartir",
    close: "Cerrar",
    chips: { tropical: "🌴 Tropical", product: "🛍️ Producto", cover: "🎬 Portada", food: "🍜 Comida", fashion: "👗 Moda", travel: "🏖️ Viaje" },
  },
  templates: {
    title: "Plantillas",
    subtitle: "Más de 100 plantillas profesionales para escenarios sociales y de e-commerce",
    all: "Todas",
    shortVideo: "Video corto",
    ecommerce: "E-commerce",
    social: "Redes sociales",
    regional: "Regional",
    search: "Buscar plantillas por nombre o escenario...",
    useButton: "Usar plantilla",
    noResults: "No se encontraron plantillas coincidentes",
    clearFilters: "Limpiar filtros",
  },
};

type Messages = typeof en;
export type Locale = "en" | "zh" | "es";

const messagesMap: Record<Locale, Messages> = { en, zh, es };

let currentLocale: Locale = "en";
const listeners = new Set<() => void>();

export function getLocale(): Locale {
  return currentLocale;
}

export function setLocale(locale: Locale) {
  currentLocale = locale;
  if (typeof window !== "undefined") {
    localStorage.setItem("picflow-locale", locale);
  }
  listeners.forEach((fn) => fn());
}

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(currentLocale);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("picflow-locale") as Locale | null;
      if (stored && messagesMap[stored]) {
        currentLocale = stored;
        setLocaleState(stored);
      }
    }
    const handler = () => setLocaleState(currentLocale);
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  return locale;
}

export function getMessages(locale?: Locale): Messages {
  return messagesMap[locale || currentLocale] || en;
}

/** Lightweight `useTranslations` hook */
export function useT<K extends keyof Messages>(namespace: K): Messages[K] {
  const locale = useLocale();
  const messages = messagesMap[locale] || en;
  return messages[namespace];
}
