import { useState } from "react";

const WHATSAPP_NUMBER = "966501234567";
const WHATSAPP_MESSAGE = "مرحباً، أود الحجز في مطعم الأصالة 🍽️";

const menuItems = [
  {
    category: "المقبلات",
    emoji: "🥗",
    items: [
      { name: "حمص بالطحينة", desc: "حمص كريمي مع زيت الزيتون والبابريكا", price: "25" },
      { name: "تبولة طازجة", desc: "بقدونس، طماطم، برغل، ليمون وزيت الزيتون", price: "22" },
      { name: "بابا غنوج", desc: "باذنجان مشوي بالطحينة والثوم", price: "24" },
      { name: "فتوش بالرمان", desc: "سلطة الخضار الطازجة بحبات الرمان", price: "28" },
    ],
  },
  {
    category: "الأطباق الرئيسية",
    emoji: "🍖",
    items: [
      { name: "مشاوي مشكلة", desc: "كفتة، شيش طاووق، لحم، مع الأرز والخبز", price: "89" },
      { name: "ضلع غنم مشوي", desc: "ضلع غنم متبل بالأعشاب العربية مع الأرز البسمتي", price: "95" },
      { name: "مندي دجاج", desc: "دجاج طري بالتوابل اليمنية مع الأرز المبهر", price: "75" },
      { name: "سمك مشوي", desc: "سمك طازج مشوي بالليمون والأعشاب", price: "85" },
    ],
  },
  {
    category: "الحلويات",
    emoji: "🍮",
    items: [
      { name: "كنافة بالجبن", desc: "كنافة ناعمة بالجبن العكاوي وشيرة القطر", price: "35" },
      { name: "بقلاوة مشكلة", desc: "تشكيلة بقلاوة بالفستق والجوز", price: "40" },
      { name: "أم علي", desc: "حلوى مصرية دافئة بالمكسرات والقشدة", price: "32" },
      { name: "لقيمات بالتمر", desc: "كرات عجين مقلية بصلصة التمر والسمسم", price: "28" },
    ],
  },
];

const reviews = [
  {
    name: "أحمد الشمري",
    rating: 5,
    text: "تجربة لا تُنسى! الطعام رائع والخدمة ممتازة. المشاوي المشكلة كانت من أفضل ما تذوقت في حياتي.",
    avatar: "أ",
    date: "منذ أسبوع",
  },
  {
    name: "سارة العتيبي",
    rating: 5,
    text: "الأجواء رومانسية وهادئة، مثالية للعائلات. الكنافة بالجبن كانت طازجة ولذيذة جداً. سأعود قريباً!",
    avatar: "س",
    date: "منذ أسبوعين",
  },
  {
    name: "محمد الغامدي",
    rating: 5,
    text: "خدمة احترافية وسرعة في التقديم. ضلع الغنم المشوي أشهى ما أكلت. المكان نظيف وراقي جداً.",
    avatar: "م",
    date: "منذ شهر",
  },
  {
    name: "نورة القحطاني",
    rating: 4,
    text: "مطعم ممتاز بكل المقاييس. أنصح بتجربة طبق المندي، رائع حقاً! سنزوره مع العائلة مرة أخرى.",
    avatar: "ن",
    date: "منذ شهر",
  },
];

const workingHours = [
  { day: "السبت - الخميس", hours: "12:00 ظ – 12:00 م", isOpen: true },
  { day: "الجمعة", hours: "1:00 م – 12:00 م", isOpen: true },
  { day: "الأعياد الرسمية", hours: "2:00 م – 11:00 م", isOpen: true },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-amber-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const galleryImages = [
    { src: "/images/gallery1.jpg", alt: "قاعة المطعم" },
    { src: "/images/gallery2.jpg", alt: "التراس الخارجي" },
    { src: "/images/gallery3.jpg", alt: "حلويات شرقية" },
    { src: "/images/dish2.jpg", alt: "ضلع الغنم المشوي" },
    { src: "/images/dish3.jpg", alt: "مشاوي مشكلة" },
  ];

  return (
    <div className="font-['Tajawal',sans-serif] bg-stone-50 text-stone-800 overflow-x-hidden">

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 w-full z-50 bg-stone-900/95 backdrop-blur-md border-b border-amber-700/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-xl">
              🍽️
            </div>
            <div>
              <h1 className="text-amber-400 font-bold text-lg leading-none">مطعم الأصالة</h1>
              <p className="text-amber-200/60 text-xs">Al-Asala Restaurant</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-stone-300">
            <a href="#menu" className="hover:text-amber-400 transition-colors">القائمة</a>
            <a href="#gallery" className="hover:text-amber-400 transition-colors">الصور</a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">آراء العملاء</a>
            <a href="#location" className="hover:text-amber-400 transition-colors">الموقع</a>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 shadow-lg"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            احجز الآن
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/50 to-stone-900/80" />

        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-4 py-2 rounded-full text-sm mb-6 backdrop-blur-sm">
            <span>⭐</span> الأفضل في المطبخ العربي الأصيل
          </div>
          <h1
            className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: "'Tajawal', sans-serif", textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
          >
            مطعم{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              الأصالة
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 mb-3 font-light leading-relaxed">
            حيث تلتقي عراقة المطبخ العربي بجماليات التجربة الراقية
          </p>
          <p className="text-base md:text-lg text-stone-300/80 mb-10 font-light">
            نقدم لكم أشهى الأطباق العربية الأصيلة بأجواء فاخرة لا مثيل لها
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-2xl shadow-green-900/50"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              احجز طاولتك عبر واتساب
            </a>
            <a
              href="#menu"
              className="border-2 border-amber-400/60 text-amber-300 hover:bg-amber-400/10 px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105"
            >
              استعرض القائمة ↓
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-amber-400/50 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-amber-400/70 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-amber-700 py-6">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { num: "+500", label: "طبق يومياً" },
            { num: "10+", label: "سنوات خبرة" },
            { num: "98%", label: "رضا العملاء" },
            { num: "+50", label: "طبق أصيل" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-black">{s.num}</div>
              <div className="text-amber-200 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED DISHES ===== */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">أبرز أطباقنا</span>
          <h2 className="text-4xl font-black text-stone-800 mt-2">روائع المطبخ العربي</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              img: "/images/dish1.jpg",
              title: "مزة عربية",
              desc: "تشكيلة مميزة من أشهر المقبلات العربية بمكونات طازجة",
              badge: "الأكثر طلباً",
              price: "89 ر.س",
            },
            {
              img: "/images/dish2.jpg",
              title: "ضلع غنم مشوي",
              desc: "ضلع غنم طري بالتوابل العربية الأصيلة مع الأرز البسمتي",
              badge: "شيف مميز",
              price: "95 ر.س",
            },
            {
              img: "/images/dish3.jpg",
              title: "مشاوي مشكلة",
              desc: "تشكيلة مشاوي فاخرة من اللحوم والدجاج مع الأرز",
              badge: "عرض مميز",
              price: "89 ر.س",
            },
          ].map((dish, i) => (
            <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dish.img}
                  alt={dish.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {dish.badge}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-stone-800 mb-2">{dish.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">{dish.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-amber-600">{dish.price}</span>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                  >
                    اطلب الآن
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FULL MENU ===== */}
      <section id="menu" className="py-20 px-4 bg-stone-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">قائمة الطعام</span>
            <h2 className="text-4xl font-black text-white mt-2">اكتشف كل ما نقدمه</h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {menuItems.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  activeCategory === i
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105"
                    : "bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.category}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid md:grid-cols-2 gap-4">
            {menuItems[activeCategory].items.map((item, i) => (
              <div
                key={i}
                className="bg-stone-800 border border-stone-700 rounded-2xl p-5 flex items-center justify-between hover:border-amber-600/50 transition-all group"
              >
                <div className="flex-1">
                  <h4 className="text-white font-bold text-lg group-hover:text-amber-400 transition-colors">{item.name}</h4>
                  <p className="text-stone-400 text-sm mt-1 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mr-4 text-right">
                  <div className="text-2xl font-black text-amber-400">{item.price}</div>
                  <div className="text-stone-500 text-xs">ر.س</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              احجز طاولتك الآن
            </a>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="gallery" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">معرض الصور</span>
          <h2 className="text-4xl font-black text-stone-800 mt-2">جولة في عالم الأصالة</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              style={{ height: i === 0 ? "400px" : "190px" }}
              onClick={() => setGalleryOpen(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">🔍</span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-900/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-semibold text-sm">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {galleryOpen !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setGalleryOpen(null)}
          >
            <button className="absolute top-6 left-6 text-white text-3xl hover:text-amber-400 transition-colors">✕</button>
            <img
              src={galleryImages[galleryOpen].src}
              alt={galleryImages[galleryOpen].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 flex gap-3">
              <button
                onClick={(e) => { e.stopPropagation(); setGalleryOpen((galleryOpen - 1 + galleryImages.length) % galleryImages.length); }}
                className="bg-white/20 hover:bg-white/40 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all"
              >→</button>
              <button
                onClick={(e) => { e.stopPropagation(); setGalleryOpen((galleryOpen + 1) % galleryImages.length); }}
                className="bg-white/20 hover:bg-white/40 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all"
              >←</button>
            </div>
          </div>
        )}
      </section>

      {/* ===== WORKING HOURS + WHATSAPP ===== */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-900 via-stone-900 to-stone-900">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Working Hours */}
          <div>
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">ساعات الخدمة</span>
            <h2 className="text-3xl font-black text-white mt-2 mb-8">أوقات العمل</h2>
            <div className="space-y-4">
              {workingHours.map((wh, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-stone-800/60 border border-stone-700 rounded-2xl px-6 py-4 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${wh.isOpen ? "bg-green-400 shadow-lg shadow-green-400/50" : "bg-red-400"} animate-pulse`} />
                    <span className="text-white font-semibold">{wh.day}</span>
                  </div>
                  <span className="text-amber-400 font-bold">{wh.hours}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 text-stone-400 text-sm bg-stone-800/40 rounded-2xl px-5 py-3 border border-stone-700">
              <span className="text-2xl">📞</span>
              <div>
                <div className="text-white font-semibold">للحجز والاستفسار</div>
                <div dir="ltr" className="text-amber-400">+966 50 123 4567</div>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-700/40 rounded-3xl p-8 text-center backdrop-blur-sm">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-2xl font-black text-white mb-3">احجز فوراً عبر واتساب</h3>
            <p className="text-stone-300 mb-6 leading-relaxed">
              تواصل معنا مباشرة لحجز طاولتك أو الاستفسار عن القائمة والعروض الخاصة
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all hover:scale-105 shadow-2xl shadow-green-900/50 mb-4"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              ابدأ المحادثة الآن
            </a>
            <p className="text-stone-500 text-xs">سيرد عليك فريقنا خلال دقائق ✨</p>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section id="reviews" className="py-20 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">آراء العملاء</span>
            <h2 className="text-4xl font-black text-stone-800 mt-2">ماذا يقول ضيوفنا</h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
            <div className="flex items-center justify-center gap-2 mt-4">
              <StarRating rating={5} />
              <span className="text-stone-600 font-semibold">4.9 / 5</span>
              <span className="text-stone-400 text-sm">من أكثر من 800 تقييم</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-stone-100"
              >
                <StarRating rating={review.rating} />
                <p className="text-stone-600 text-sm leading-relaxed mt-3 mb-5">"{review.text}"</p>
                <div className="flex items-center gap-3 border-t border-stone-100 pt-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-stone-800 text-sm">{review.name}</div>
                    <div className="text-stone-400 text-xs">{review.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GOOGLE MAP ===== */}
      <section id="location" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">موقعنا</span>
            <h2 className="text-4xl font-black text-stone-800 mt-2">كيف تصل إلينا</h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
            <p className="text-stone-500 mt-4">حي العليا، شارع التحلية، الرياض، المملكة العربية السعودية</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Map */}
            <div className="md:col-span-2 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.674!2d46.6753!3d24.6931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2z2KfZhNix2YrYp9i2!5e0!3m2!1sar!2ssa!4v1620000000000!5m2!1sar!2ssa"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع مطعم الأصالة"
              />
            </div>

            {/* Location Info */}
            <div className="space-y-4">
              {[
                {
                  icon: "📍",
                  title: "العنوان",
                  value: "حي العليا، شارع التحلية\nالرياض، 12244\nالمملكة العربية السعودية",
                },
                {
                  icon: "📞",
                  title: "الهاتف",
                  value: "+966 50 123 4567",
                },
                {
                  icon: "✉️",
                  title: "البريد الإلكتروني",
                  value: "info@alasala.sa",
                },
                {
                  icon: "🅿️",
                  title: "موقف السيارات",
                  value: "موقف خاص مجاني للضيوف",
                },
              ].map((info, i) => (
                <div key={i} className="flex gap-4 bg-stone-50 rounded-2xl p-4 border border-stone-100">
                  <div className="text-2xl flex-shrink-0">{info.icon}</div>
                  <div>
                    <div className="font-bold text-stone-700 text-sm mb-1">{info.title}</div>
                    <div className="text-stone-500 text-sm whitespace-pre-line">{info.value}</div>
                  </div>
                </div>
              ))}
              <a
                href="https://maps.google.com/?q=حي+العليا+الرياض"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-2xl font-bold transition-all hover:scale-105"
              >
                <span>🗺️</span>
                افتح في خرائط جوجل
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-2xl">
                  🍽️
                </div>
                <div>
                  <h3 className="text-white font-black text-xl">مطعم الأصالة</h3>
                  <p className="text-amber-500/60 text-xs">Al-Asala Restaurant</p>
                </div>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed">
                نقدم لكم أفضل تجربة طعام عربية أصيلة في أجواء فاخرة وخدمة لا مثيل لها منذ عام 2015.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm">
                {["الصفحة الرئيسية", "قائمة الطعام", "معرض الصور", "آراء العملاء", "تواصل معنا"].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                      <span className="text-amber-600 text-xs">◆</span> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">تابعنا</h4>
              <div className="flex gap-3 flex-wrap">
                {[
                  { name: "واتساب", icon: "💬", color: "bg-green-700 hover:bg-green-600", href: whatsappLink },
                  { name: "إنستغرام", icon: "📸", color: "bg-pink-800 hover:bg-pink-700", href: "#" },
                  { name: "تويتر", icon: "🐦", color: "bg-sky-800 hover:bg-sky-700", href: "#" },
                  { name: "تيك توك", icon: "🎵", color: "bg-stone-700 hover:bg-stone-600", href: "#" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all hover:scale-105`}
                  >
                    <span>{social.icon}</span> {social.name}
                  </a>
                ))}
              </div>
              <div className="mt-6 bg-stone-800 rounded-2xl p-4 border border-stone-700">
                <p className="text-xs text-stone-500 mb-1">للحجز الفوري عبر واتساب</p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="text-green-400 font-bold text-lg hover:text-green-300 transition-colors"
                >
                  +966 50 123 4567
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-6 text-center text-sm text-stone-600">
            <p>© 2025 مطعم الأصالة • جميع الحقوق محفوظة • صُنع بـ ❤️ في المملكة العربية السعودية</p>
          </div>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP BUTTON ===== */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-900/50 hover:scale-110 transition-all animate-bounce"
        title="احجز عبر واتساب"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}
