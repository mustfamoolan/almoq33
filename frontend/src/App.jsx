import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  Bike,
  Check,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Headphones,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Plus,
  Rocket,
  Send,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  Store,
  UtensilsCrossed,
  Users,
  Wrench,
  X,
} from 'lucide-react'

const products = [
  {
    icon: ShoppingCart,
    title: 'نظام نقاط البيع',
    desc: 'نظام كاشير للمحلات والمطاعم: بيع سريع، إدارة للمخزون، وفواتير وتقارير.',
    features: ['شاشة بيع سهلة', 'متابعة المخزون', 'تقارير المبيعات اليومية'],
  },
  {
    icon: Stethoscope,
    title: 'نظام إدارة العيادات',
    desc: 'المواعيد وملفات المرضى والوصفات والحسابات في نظام واحد.',
    features: ['حجز المواعيد', 'ملف المريض', 'الفواتير والحسابات'],
  },
  {
    icon: GraduationCap,
    title: 'نظام إدارة المدارس',
    desc: 'الطلاب والدرجات والأقساط والتواصل مع أولياء الأمور.',
    features: ['سجل الطلاب', 'الدرجات والنتائج', 'الأقساط والمدفوعات'],
  },
  {
    icon: UtensilsCrossed,
    title: 'نظام إدارة المطاعم',
    desc: 'طلبات الطاولات وشاشة المطبخ والتوصيل في نظام واحد.',
    features: ['إدارة الطاولات', 'شاشة المطبخ', 'طلبات التوصيل'],
  },
  {
    icon: Store,
    title: 'متجر إلكتروني',
    desc: 'متجر احترافي يعرض منتجاتك ويستقبل الطلبات أونلاين.',
    features: ['واجهة متجر أنيقة', 'سلة ودفع', 'إدارة الطلبات'],
  },
  {
    icon: Bike,
    title: 'تطبيق توصيل',
    desc: 'إدارة الطلبات والسائقين مع تتبع مباشر وإشعارات للعميل.',
    features: ['تتبع الطلبات', 'تطبيق للسائق', 'إشعارات العملاء'],
  },
]

const services = [
  {
    icon: Wrench,
    title: 'تجهيز وتشغيل',
    desc: 'نثبت النظام على أجهزتك ونجهزه للعمل من أول يوم.',
  },
  {
    icon: SlidersHorizontal,
    title: 'تخصيص حسب نشاطك',
    desc: 'نعدل الشاشات والتقارير بما يناسب طريقة عمل نشاطك.',
  },
  {
    icon: Users,
    title: 'تدريب فريقك',
    desc: 'ندرب موظفيك على النظام حتى يستخدموه بثقة.',
  },
  {
    icon: Headphones,
    title: 'دعم بعد البيع',
    desc: 'نبقى معك بعد التشغيل للمتابعة وحل أي مشكلة.',
  },
]

const steps = [
  {
    title: 'اختر نظامك',
    desc: 'تصفح الأنظمة واختر ما يناسب نشاطك.',
  },
  {
    title: 'اطلب عرضاً',
    desc: 'نتواصل معك ونحدد احتياجك والسعر.',
  },
  {
    title: 'نجهّزه لك',
    desc: 'نثبت النظام ونخصصه وندرّب فريقك.',
  },
  {
    title: 'ابدأ العمل',
    desc: 'استخدم نظامك مباشرة، ونحن بجانبك للدعم.',
  },
]

const faqs = [
  {
    q: 'هل الأنظمة جاهزة للاستخدام؟',
    a: 'نعم. الأنظمة جاهزة للتشغيل، ونثبتها على أجهزتك ونجهزها حسب نشاطك قبل التسليم.',
  },
  {
    q: 'هل يمكن تعديل النظام ليناسب نشاطي؟',
    a: 'نعم. يمكن تعديل الشاشات والتقارير وإضافة ما يحتاجه عملك. أخبرنا باحتياجك ونقترح الحل المناسب.',
  },
  {
    q: 'هل يشمل السعر التدريب والدعم؟',
    a: 'نوضح في عرض السعر ما يشمله التدريب والتشغيل والدعم، بدون تكاليف مخفية.',
  },
  {
    q: 'كيف أعرف سعر النظام؟',
    a: 'أرسل طلب عرض السعر مع اسم النشاط والنظام المطلوب، وسنتواصل معك بعرض واضح.',
  },
]

const budgets = [
  'أقل من 1,000$',
  '1,000$ – 3,000$',
  '3,000$ – 7,000$',
  'أكثر من 7,000$',
  'غير محدد',
]

const systemOptions = [...products.map((product) => product.title), 'نظام مخصص', 'أخرى']

const posItems = [
  { name: 'قهوة عربية', price: '3,000' },
  { name: 'كيك', price: '4,500' },
  { name: 'عصير برتقال', price: '2,500' },
  { name: 'شاي', price: '1,500' },
]

const emptyForm = {
  name: '',
  phone: '',
  project_type: '',
  budget: '',
  message: '',
  company: '',
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function Logo() {
  return (
    <span className="flex items-center gap-3">
      <img src="/logo.png" alt="شعار almoq3" className="h-11 w-auto" />
      <span className="leading-tight">
        <span className="block text-lg font-bold tracking-tight text-brand">almoq3</span>
        <span className="block text-[11px] font-medium text-slate-500">أنظمة إدارة الأعمال</span>
      </span>
    </span>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (status !== 'success') return undefined
    const timer = window.setTimeout(() => {
      document.getElementById('request')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
    return () => window.clearTimeout(timer)
  }, [status])

  const update = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const chooseProduct = (type) => {
    setForm((prev) => ({ ...prev, project_type: type }))
    document.getElementById('request')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const response = await fetch('/api/v1/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || 'تعذر إرسال الطلب، حاول مرة أخرى.')
      }

      setForm(emptyForm)
      setStatus('success')
    } catch (err) {
      setError(err.message || 'تعذر الاتصال بالخادم، تحقق من اتصالك وحاول مجدداً.')
      setStatus('error')
    }
  }

  const navLinks = [
    { href: '#products', label: 'الأنظمة' },
    { href: '#about', label: 'عن الشركة' },
    { href: '#process', label: 'طريقة الشراء' },
    { href: '#faq', label: 'الأسئلة' },
    { href: '#request', label: 'تواصل' },
  ]

  return (
    <div id="top" className="min-h-screen bg-white">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/85 backdrop-blur-lg">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" aria-label="almoq3 — الصفحة الرئيسية">
            <Logo />
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="التنقل الرئيسي">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href="#request" className="btn-primary !py-3">
              اطلب عرض سعر
              <ArrowLeft size={16} />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-brand md:hidden"
            aria-label="فتح القائمة"
            aria-expanded={menuOpen}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* ---------- Mobile menu ---------- */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-brand/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-brand"
                aria-label="إغلاق القائمة"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-5" aria-label="قائمة الجوال">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3.5 text-base font-semibold text-slate-700 transition hover:bg-brand-sky hover:text-brand"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="border-t border-slate-100 p-5">
              <a
                href="#request"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full"
              >
                اطلب عرض سعر
                <ArrowLeft size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      <main>
        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:grid-cols-2 lg:gap-12 lg:pb-28 lg:pt-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-sky px-4 py-1.5 text-xs font-semibold text-brand">
                <Sparkles size={14} className="text-brand-cyan" />
                شركة almoq3 للبرمجيات
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-[1.2] tracking-tight text-brand sm:text-5xl lg:text-[3.4rem]">
                أنظمة برمجية
                <br className="hidden sm:block" />{' '}
                <span className="whitespace-nowrap border-b-4 border-brand-cyan/70">
                  جاهزة لعملك.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                نبيع ونشغّل أنظمة إدارة للمحلات والشركات: نقاط بيع، عيادات، مدارس،
                مطاعم، متاجر إلكترونية، وتطبيقات توصيل — مع تجهيز وتدريب ودعم بعد
                التسليم.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#products" className="btn-primary">
                  تصفح الأنظمة
                  <ArrowLeft size={18} />
                </a>
                <a href="#request" className="btn-secondary">
                  اطلب عرض سعر
                </a>
              </div>

              <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
                {['أنظمة عربية سهلة', 'تجهيز وتدريب', 'دعم بعد البيع'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-cyan/15 text-brand">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Product preview: point of sale */}
            <div className="relative mx-auto w-full max-w-lg">
              <div
                className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-brand-cyan/25 via-brand-sky to-transparent blur-2xl"
                aria-hidden="true"
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-brand/10">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">
                    almoq3 — نظام نقاط البيع
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-bold text-brand">اختر المنتج</p>
                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                      البيع جاهز
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {posItems.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-3 py-2.5"
                      >
                        <div>
                          <p className="text-[11px] font-semibold text-slate-700">{item.name}</p>
                          <p className="mt-0.5 text-[10px] text-slate-400">{item.price} د.ع</p>
                        </div>
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-brand-sky text-brand">
                          <Plus size={12} />
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 rounded-2xl bg-brand p-4 text-white">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] text-white/60">الفاتورة #1042</p>
                      <span className="text-[10px] font-medium text-brand-cyan">3 أصناف</span>
                    </div>

                    <div className="mt-3 space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">قهوة عربية × 2</span>
                        <span>6,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">كيك × 1</span>
                        <span>4,500</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">عصير برتقال × 1</span>
                        <span>2,500</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="text-[11px] text-white/60">الإجمالي</span>
                      <span className="text-lg font-bold">
                        13,000{' '}
                        <span className="text-[10px] font-medium text-white/60">د.ع</span>
                      </span>
                    </div>

                    <div className="mt-3 w-full rounded-lg bg-brand-cyan py-2 text-center text-[11px] font-bold text-brand-dark">
                      إتمام الدفع
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl shadow-brand/10 sm:flex">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-sky text-brand">
                  <Stethoscope size={20} />
                </span>
                <span className="leading-tight">
                  <span className="block text-xs font-bold text-brand">نظام العيادات</span>
                  <span className="block text-[11px] text-slate-500">
                    المواعيد والملفات والحسابات
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Products ---------- */}
        <section
          id="products"
          className="scroll-mt-24 border-y border-slate-100 bg-slate-50/70 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">
                أنظمتنا
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
                أنظمة إدارة جاهزة لعملك
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                اختر النظام الذي يناسب نشاطك، ونجهّزه لك بالكامل: تثبيت، تخصيص، تدريب،
                ودعم بعد التسليم.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <Reveal key={product.title} delay={(index % 3) * 80}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-cyan/40 hover:shadow-xl hover:shadow-brand/5">
                    <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 p-5">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white transition group-hover:bg-brand-cyan group-hover:text-brand-dark">
                        <product.icon size={22} strokeWidth={1.8} />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-brand">{product.title}</h3>
                        <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                          نظام جاهز للتشغيل
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-sm leading-7 text-slate-600">{product.desc}</p>

                      <ul className="mt-4 space-y-2">
                        {product.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-[13px] text-slate-600"
                          >
                            <Check size={15} className="shrink-0 text-brand-cyan" strokeWidth={2.5} />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        onClick={() => chooseProduct(product.title)}
                        className="mt-6 inline-flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-brand transition hover:border-brand-cyan/40 hover:bg-brand-sky/60"
                      >
                        اطلب هذا النظام
                        <ArrowLeft size={16} />
                      </button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10">
              <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-brand-cyan/30 bg-brand-sky/60 p-6 sm:flex-row sm:p-7">
                <div className="text-center sm:text-right">
                  <h3 className="text-lg font-bold text-brand">لم تجد النظام المناسب؟</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    نبني لك نظاماً خاصاً حسب طبيعة عملك.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => chooseProduct('نظام مخصص')}
                  className="btn-primary shrink-0"
                >
                  اطلب نظاماً مخصصاً
                  <ArrowLeft size={17} />
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- About + services ---------- */}
        <section
          id="about"
          className="relative scroll-mt-24 overflow-hidden bg-brand py-20 text-white sm:py-24"
        >
          <div
            className="absolute -top-40 left-1/2 h-[26rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-cyan/10 blur-[120px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <Reveal>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">
                  عن الشركة
                </span>
                <h2 className="mt-3 text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
                  شركة برمجيات عراقية،
                  <br />
                  نصنع أنظمة يعتمد عليها عملك.
                </h2>
                <p className="mt-5 max-w-md text-base leading-8 text-white/70">
                  almoq3 شركة متخصصة في أنظمة إدارة الأعمال. نعمل مع أصحاب المحلات
                  والشركات والمؤسسات لتقديم أنظمة عربية عملية، نسلّمها جاهزة للتشغيل
                  مع التدريب والدعم. هدفنا أن تمتلك نظاماً يوفّر وقتك ويسهّل عملك.
                </p>

                <ul className="mt-7 space-y-3 text-sm text-white/80">
                  {[
                    'أنظمة مصممة لطبيعة السوق العراقي',
                    'تسليم وتشغيل كامل',
                    'متابعة ودعم بعد البيع',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-cyan/15 text-brand-cyan">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a href="#process" className="btn-cyan mt-8">
                  كيف تشتري نظامك؟
                  <ArrowLeft size={18} />
                </a>
              </Reveal>

              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((service, index) => (
                  <Reveal key={service.title} delay={index * 80}>
                    <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-cyan/15 text-brand-cyan">
                        <service.icon size={21} strokeWidth={1.8} />
                      </span>
                      <h3 className="mt-4 text-base font-bold">{service.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/65">{service.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Buying process ---------- */}
        <section id="process" className="scroll-mt-24 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">
                طريقة الشراء
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
                أربع خطوات لتبدأ بنظامك
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                من اختيار النظام إلى التشغيل — نرافقك في كل خطوة.
              </p>
            </Reveal>

            <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div
                className="absolute right-0 top-7 hidden h-px w-full bg-gradient-to-l from-transparent via-slate-200 to-transparent lg:block"
                aria-hidden="true"
              />
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 90} className="relative">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-base font-bold text-white shadow-lg shadow-brand/20">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-brand">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{step.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section
          id="faq"
          className="scroll-mt-24 border-y border-slate-100 bg-slate-50/70 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <Reveal className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">
                الأسئلة الشائعة
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
                إجابات سريعة قبل الشراء
              </h2>
            </Reveal>

            <div className="mt-10 space-y-3">
              {faqs.map((faq, index) => (
                <Reveal key={faq.q} delay={index * 60}>
                  <details className="group rounded-2xl border border-slate-200 bg-white p-5 transition open:border-brand-cyan/40 open:shadow-sm">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-brand [&::-webkit-details-marker]:hidden">
                      {faq.q}
                      <ChevronDown
                        size={18}
                        className="shrink-0 text-slate-400 transition group-open:rotate-180"
                      />
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{faq.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Request form ---------- */}
        <section id="request" className="scroll-mt-24 py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">
                اطلب عرض سعر
              </span>
              <h2 className="mt-3 text-3xl font-bold leading-snug tracking-tight text-brand sm:text-4xl">
                أخبرنا بالنظام الذي تحتاجه،
                <br />
                ونرسل لك عرضاً واضحاً.
              </h2>
              <p className="mt-5 max-w-md text-base leading-8 text-slate-600">
                املأ النموذج باختصار. سنراجع طلبك ونتواصل معك لمناقشة احتياجك وتقديم
                عرض سعر ومدة تجهيز.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href="mailto:admin@almoq3.com"
                  className="flex items-center gap-3 text-sm font-medium text-slate-700 transition hover:text-brand-cyan"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-sky text-brand">
                    <Mail size={19} />
                  </span>
                  admin@almoq3.com
                </a>
                <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-sky text-brand">
                    <MapPin size={19} />
                  </span>
                  العراق — نخدم جميع المحافظات
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-sky text-brand">
                    <MessageCircle size={19} />
                  </span>
                  نرد خلال ساعات العمل
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="flex items-center gap-2 text-sm font-bold text-brand">
                  <CheckCircle2 size={18} className="text-brand-cyan" />
                  ما الذي يساعدنا على تجهيز عرضك؟
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {['اسم النشاط أو الشركة', 'النظام المطلوب', 'عدد المستخدمين أو الفروع'].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check size={15} className="text-brand-cyan" strokeWidth={2.5} />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand/5 sm:p-8">
                {status === 'success' ? (
                  <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckCircle2 size={34} />
                    </span>
                    <h3 className="mt-6 text-2xl font-bold text-brand">وصلنا طلبك</h3>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">
                      شكراً لثقتك. سيتواصل معك فريق almoq3 قريباً لتحديد التفاصيل
                      وإرسال عرض السعر.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="btn-secondary mt-7"
                    >
                      إرسال طلب آخر
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-brand">طلب عرض سعر</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        الحقول المعلّمة بـ <span className="text-rose-500">*</span> مطلوبة.
                      </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-brand">
                          الاسم <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={update('name')}
                          placeholder="اسمك الكريم"
                          className="field"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-brand">
                          رقم التواصل <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          required
                          autoComplete="tel"
                          value={form.phone}
                          onChange={update('phone')}
                          placeholder="07XX XXX XXXX"
                          className="field"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="project_type"
                          className="mb-2 block text-sm font-medium text-brand"
                        >
                          النظام المطلوب
                        </label>
                        <select
                          id="project_type"
                          name="project_type"
                          value={form.project_type}
                          onChange={update('project_type')}
                          className="field"
                        >
                          <option value="">اختر النظام</option>
                          {systemOptions.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="budget"
                          className="mb-2 block text-sm font-medium text-brand"
                        >
                          الميزانية التقريبية
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={form.budget}
                          onChange={update('budget')}
                          className="field"
                        >
                          <option value="">اختر الميزانية</option>
                          {budgets.map((budget) => (
                            <option key={budget} value={budget}>
                              {budget}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-brand">
                        ملاحظاتك <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={update('message')}
                        placeholder="اكتب لنا عن نشاطك وما تحتاجه من النظام..."
                        className="field resize-none"
                      />
                    </div>

                    {/* Honeypot — hidden from real users */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="company">Company</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.company}
                        onChange={update('company')}
                      />
                    </div>

                    {status === 'error' && (
                      <div
                        role="alert"
                        className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
                      >
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          جارٍ الإرسال...
                        </>
                      ) : (
                        <>
                          <Send size={17} />
                          اطلب عرض السعر
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs leading-6 text-slate-400">
                      بياناتك تُستخدم للتواصل بخصوص طلبك فقط، ولا تُشارك مع أي طرف آخر.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- CTA band ---------- */}
        <section className="px-5 pb-20 sm:px-8">
          <Reveal className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-12 text-center text-white sm:px-12 sm:py-16">
              <div
                className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand-cyan/20 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-brand-cyan/10 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-brand-cyan">
                  <Rocket size={14} />
                  ابدأ الآن
                </span>
                <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
                  جاهز تشغّل عملك بنظام أفضل؟
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                  اختر نظامك أو اطلب عرض سعر، وفريقنا يتولى التجهيز والتدريب والدعم.
                </p>
                <a href="#request" className="btn-cyan mt-8">
                  اطلب عرض سعر
                  <ArrowLeft size={18} />
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-slate-100 bg-slate-50/70">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
              شركة almoq3 للبرمجيات — نبيع ونشغّل أنظمة إدارة الأعمال للمحلات
              والشركات، مع تجهيز وتدريب ودعم بعد التسليم.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-brand">روابط سريعة</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              {[
                { href: '#products', label: 'الأنظمة' },
                { href: '#about', label: 'عن الشركة' },
                { href: '#process', label: 'طريقة الشراء' },
                { href: '#faq', label: 'الأسئلة الشائعة' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-brand-cyan">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-brand">تواصل معنا</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>
                <a
                  href="mailto:admin@almoq3.com"
                  className="inline-flex items-center gap-2 transition hover:text-brand-cyan"
                >
                  <Mail size={15} />
                  admin@almoq3.com
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin size={15} />
                العراق
              </li>
              <li>
                <a
                  href="#request"
                  className="inline-flex items-center gap-2 font-semibold text-brand transition hover:text-brand-cyan"
                >
                  <MessageCircle size={15} />
                  اطلب عرض سعر
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200/70">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:px-8">
            <p>© {new Date().getFullYear()} almoq3 — جميع الحقوق محفوظة.</p>
            <p>شركة برمجيات عراقية.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
