import { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { MobileNavigation } from "./components/MobileNavigation";
import { DesktopNavigation } from "./components/DesktopNavigation";
import React, { Suspense } from 'react';
const DesktopGalleryLazy = React.lazy(() => import('./components/DesktopGallery').then(m => ({ default: m.DesktopGallery })));
import { DesktopContactForm } from "./components/DesktopContactForm";
import { DesktopAmenities } from "./components/DesktopAmenities";
import { MobileGridGallery } from "./components/MobileGridGallery";
import { OriginalMobileAmenities } from "./components/OriginalMobileAmenities";
import { ContactForm } from "./components/ContactForm";
import { ContactLegalSection } from "./components/ContactLegalSection";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { ResponsivePicture, buildSrcSet } from "./components/figma/ResponsivePicture";
import { Toaster } from "./components/ui/sonner";
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useTranslation } from 'react-i18next';
// Hero background: default image plus imagetools-generated variants
import heroDefault from "./assets/hero/hero-background.webp";
// Generate multiple width variants (WebP), returned as an object map
// Example keys include widths; we'll convert to a srcset string in usage
import heroVariants from "./assets/hero/hero-background.webp?w=640;960;1280;1920;2560&format=webp;webp;webp;webp;webp&as=object";
import heroAvif from "./assets/hero/hero-background.webp?w=640;960;1280;1920;2560&format=avif;avif;avif;avif;avif&as=object";
import imgRectangle2 from "./assets/about/about-interior.png";
// Contact background: default and responsive variants
import contactDefault from "./assets/contact/contact-background.webp";
import contactVariants from "./assets/contact/contact-background.webp?w=640;960;1280;1920;2560&format=webp;webp;webp;webp;webp&as=object";  
import contactAvif from "./assets/contact/contact-background.webp?w=640;960;1280;1920;2560&format=avif;avif;avif;avif;avif&as=object";  

export default function App() {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("welcome");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const activeSectionRef = useRef(activeSection);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const scrollCheckInterval = useRef<number | null>(null);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, -100],
  );
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, 0],
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentLanguage = i18n.resolvedLanguage === "en" ? "en" : "hr";
  const setLanguage = (language: "hr" | "en") => {
    void i18n.changeLanguage(language);
    window.localStorage.setItem("appLanguage", language);
  };

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      // Set flag to disable observer updates during programmatic scroll
      isScrollingRef.current = true;
      setActiveSection(section);
      
      // Clear any existing timeouts and intervals
      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (scrollCheckInterval.current !== null) {
        clearInterval(scrollCheckInterval.current);
      }
      
      const offsetTop = element.offsetTop - (isMobile ? 0 : 80);
      const targetY = offsetTop;
      
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      
      // Monitor scroll completion by checking if scroll position stops changing
      lastScrollY.current = window.scrollY;
      let stableCount = 0;
      
      scrollCheckInterval.current = window.setInterval(() => {
        const currentY = window.scrollY;
        const diff = Math.abs(currentY - lastScrollY.current);
        
        // If scroll position is stable (not changing) or very close to target
        if (diff < 2 || Math.abs(currentY - targetY) < 10) {
          stableCount++;
          // After 4 consecutive stable checks (200ms), consider scroll complete
          if (stableCount >= 4) {
            isScrollingRef.current = false;
            if (scrollCheckInterval.current !== null) {
              clearInterval(scrollCheckInterval.current);
              scrollCheckInterval.current = null;
            }
          }
        } else {
          stableCount = 0;
        }
        
        lastScrollY.current = currentY;
      }, 50);
      
      // Fallback timeout in case interval doesn't clear
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
        if (scrollCheckInterval.current !== null) {
          clearInterval(scrollCheckInterval.current);
          scrollCheckInterval.current = null;
        }
      }, 2000);
    }
  };

  useEffect(() => {
    const sections = ["welcome", "about", "gallery", "contact"];
    const ratioById = new Map<string, number>();
    const topById = new Map<string, number>();
    const thresholds = Array.from({ length: 11 }, (_, i) => i / 10);

    const observer = new IntersectionObserver(
      (entries) => {
        // Skip observer updates during programmatic scrolling
        if (isScrollingRef.current) {
          return;
        }
        
        entries.forEach((entry) => {
          ratioById.set(entry.target.id, entry.intersectionRatio);
          topById.set(entry.target.id, entry.boundingClientRect.top);
        });

        // Find section with highest intersection ratio
        let bestId = sections[0];
        let bestRatio = 0;
        let bestTop = Number.POSITIVE_INFINITY;

        sections.forEach((id) => {
          const ratio = ratioById.get(id) ?? 0;
          const top = topById.get(id) ?? Number.POSITIVE_INFINITY;
          
          // Prefer section with higher visibility
          if (ratio > bestRatio + 0.05) {
            bestId = id;
            bestRatio = ratio;
            bestTop = top;
          } 
          // If similar visibility, prefer the one closer to top
          else if (Math.abs(ratio - bestRatio) <= 0.05 && ratio > 0) {
            if (Math.abs(top) < Math.abs(bestTop)) {
              bestId = id;
              bestRatio = ratio;
              bestTop = top;
            }
          }
        });

        // If no section is visible, find the one closest to viewport top
        if (bestRatio === 0) {
          sections.forEach((id) => {
            const top = topById.get(id) ?? Number.POSITIVE_INFINITY;
            if (top < 0 && Math.abs(top) < Math.abs(bestTop)) {
              bestId = id;
              bestTop = top;
            } else if (top >= 0 && top < bestTop) {
              bestId = id;
              bestTop = top;
            }
          });
        }

        if (bestId !== activeSectionRef.current) {
          setActiveSection(bestId);
        }
      },
      {
        threshold: thresholds,
        rootMargin: isMobile ? "0px 0px -45% 0px" : "-80px 0px -35% 0px",
      },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (scrollCheckInterval.current !== null) {
        clearInterval(scrollCheckInterval.current);
      }
    };
  }, [isMobile]);

  if (isMobile) {
    // Mobile layout (existing implementation)
    return (
      <div className="min-h-screen bg-white pb-28">
        <div className="fixed top-4 right-4 z-40">
          <div className="flex items-center gap-1 rounded-full border border-white/40 bg-black/20 px-1 py-1 text-white shadow-lg backdrop-blur-md">
            <button
              type="button"
              onClick={() => setLanguage("hr")}
              aria-label={t("common.switchToCroatian")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                currentLanguage === "hr" ? "bg-[#a18f85] text-white" : "text-white/90 hover:bg-white/20"
              }`}
            >
              HR
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              aria-label={t("common.switchToEnglish")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                currentLanguage === "en" ? "bg-[#a18f85] text-white" : "text-white/90 hover:bg-white/20"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Welcome Section */}
        <section
          id="welcome"
          className="relative h-screen w-full overflow-hidden"
        >
          <ResponsivePicture
            alt={t('media.alt.heroExterior')}
            imgSrc={heroDefault}
            className="absolute inset-0"
            imgClassName="w-full h-full object-cover"
            sizes="100vw"
            width={1920}
            height={1080}
            sources={[
              { type: 'image/avif', srcSet: buildSrcSet(heroAvif as any, 'w') },
              { type: 'image/webp', srcSet: buildSrcSet(heroVariants as any, 'w') }
            ]}
            priority
          />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
            <div className="text-center px-6 max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="space-y-4"
              >
                <p className="text-lg tracking-widest uppercase opacity-90 mb-6">
                  {t('hero.welcomeTo')}
                </p>
                <h1 className="text-6xl sm:text-7xl font-bold uppercase leading-none tracking-tight">
                  <span className="block text-shadow-2xl">
                    Zollus
                  </span>
                  <span className="block text-shadow-2xl mt-2">
                    House
                  </span>
                </h1>
                <div className="w-16 h-0.5 bg-white/60 mx-auto mt-8"></div>
                <p className="text-sm uppercase tracking-wide opacity-80 mt-6">
                  {t('hero.highlights')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="relative min-h-screen w-full"
        >
          <div className="bg-[#a18f85] relative">
            <div className="p-6 pb-8 text-white">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl font-bold text-center uppercase mb-6 mt-8"
              >
                {t('about.title')}
              </motion.h2>
              <div className="max-w-md mx-auto space-y-4 text-center">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-sm leading-relaxed mobile-about-text"
                >
                  {t('about.paragraph1')}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-sm leading-relaxed mobile-about-text"
                >
                  {t('about.paragraph2')}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-4 text-sm leading-relaxed mobile-about-text"
                >
                  {(() => {
                    const [firstPart, secondPart] = t('about.priceInfo').split(' | ');
                    const [beforePrice, afterPrice] = firstPart.split('185.00 EUR');
                    return (
                      <>
                        <span className="text-base text-white">{beforePrice}</span>
                        <span className="font-bold text-lg text-white">185.00 EUR</span>
                        <span className="text-base text-white">{afterPrice}</span>
                        <br />
                        <span className="text-xs text-white/80">{secondPart}</span>
                      </>
                    );
                  })()}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-6 mb-10"
              >
                <OriginalMobileAmenities />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: window.innerWidth < 768 ? 0 : 0.8, delay: window.innerWidth < 768 ? 0 : 0.3 }}
            className="relative h-[60vh]"
          >
            <ImageWithFallback
              src={imgRectangle2}
              alt={t('media.alt.elegantInterior')}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="relative w-full">
          <MobileGridGallery className="w-full" />
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="relative min-h-screen w-full"
        >
          <ResponsivePicture
            alt={t('media.alt.contactBackground')}
            imgSrc={contactDefault}
            className="absolute inset-0"
            imgClassName="w-full h-full object-cover"
            sizes="100vw"
            sources={[
              { type: 'image/avif', srcSet: buildSrcSet(contactAvif as any, 'w') },
              { type: 'image/webp', srcSet: buildSrcSet(contactVariants as any, 'w') }
            ]}
          />

          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[rgba(161,143,133,0.54)]" />

          <div className="relative z-10 min-h-screen flex flex-col justify-between p-6">
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl font-bold text-white uppercase mb-8"
                >
                  {t('contact.title')}
                </motion.h2>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

        <div className="flex flex-col">
          <ContactLegalSection className="order-2 md:order-1" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 md:order-2 bg-[#a18f85] p-6 sm:p-5 mt-0 sm:mt-12 mb-0 pb-16 sm:pb-20 mx-6"
          >
            <div className="text-center mb-6 sm:mb-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-white text-lg sm:text-lg uppercase font-medium"
              >
                {t('contact.comfort')}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-white text-lg sm:text-lg uppercase font-medium mt-2"
              >
                {t('contact.stayBegins')}
              </motion.p>
            </div>
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-white text-sm"
              >
                {t('footer.rights')}
              </motion.p>
            </div>
          </motion.div>
        </div>

        <MobileNavigation
          activeSection={activeSection}
          onSectionChange={scrollToSection}
        />

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-4 z-40 bg-[#a18f85] hover:bg-[#8d7a70] text-white p-3 rounded-full shadow-lg transition-all duration-200"
            aria-label={t('common.scrollToTop')}
          >
            <ArrowUp size={20} />
          </button>
        )}

        <Toaster />
        <SpeedInsights />
      </div>
    );
  }

  // Desktop layout (improved implementation)
  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Navigation */}
      <DesktopNavigation
        activeSection={activeSection}
        onSectionChange={scrollToSection}
      />

      {/* Hero Section */}
      <section
        id="welcome"
        className="relative h-screen w-full overflow-hidden"
      >
        <ResponsivePicture
          alt={t('media.alt.heroExterior')}
          imgSrc={heroDefault}
          className="absolute inset-0"
          imgClassName="w-full h-full object-cover"
          sizes="100vw"
          width={1920}
          height={1080}
          sources={[
            { type: 'image/avif', srcSet: buildSrcSet(heroAvif as any, 'w') },
            { type: 'image/webp', srcSet: buildSrcSet(heroVariants as any, 'w') }
          ]}
          priority
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 flex items-center justify-center text-white z-10"
        >
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-left"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xl mb-6 text-white/90"
              >
                {t('hero.welcomeToGuestHouse')}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="text-7xl xl:text-8xl font-bold uppercase leading-tight mb-8 text-shadow-lg"
              >
                Zollus
                <br />
                House
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <button
                  onClick={() => scrollToSection("about")}
                  className="bg-[#a18f85] hover:bg-[#8d7a70] text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {t('hero.discoverMore')}
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl font-bold text-[#a18f85] mb-8 uppercase"
              >
                {t('about.title')}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6 text-lg text-gray-700 leading-relaxed"
              >
                <p>{t('about.paragraph1')}</p>
                <p>
                  {t('about.paragraph2')}
                </p>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  {(() => {
                    const [firstPart, secondPart] = t('about.priceInfo').split(' | ');
                    const [beforePrice, afterPrice] = firstPart.split('185.00 EUR');
                    return (
                      <>
                        {beforePrice}
                        <span className="font-bold text-gray-900">185.00 EUR</span>
                        {afterPrice}
                        <span className="text-gray-600"> | </span>
                        {secondPart}
                      </>
                    );
                  })()}
                </p>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: window.innerWidth < 768 ? 0 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: window.innerWidth < 768 ? 0 : 0.8 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <ImageWithFallback
                  src={imgRectangle2}
                  alt={t('media.alt.elegantInterior')}
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#a18f85]/20 to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Amenities */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <div className="bg-[#a18f85] rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a18f85] to-[#8d7a70]" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white text-center mb-12 uppercase">
                  {t('amenities.title')}
                </h3>
                <DesktopAmenities />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section (lazy) */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <Suspense fallback={<div className="text-center text-gray-500 py-12">{t('gallery.loading')}</div>}>
            <DesktopGalleryLazy />
          </Suspense>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-20 min-h-screen"
      >
        <ResponsivePicture
          alt={t('media.alt.contactBackground')}
          imgSrc={contactDefault}
          className="absolute inset-0"
          imgClassName="w-full h-full object-cover"
          sizes="100vw"
          sources={[
            { type: 'image/avif', srcSet: buildSrcSet(contactAvif as any, 'w') },
            { type: 'image/webp', srcSet: buildSrcSet(contactVariants as any, 'w') }
          ]}
        />

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#a18f85]/60 to-[#8d7a70]/60" />

        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl font-bold text-white mb-8 uppercase">
              {t('contact.title')}
            </h2>
            <div className="space-y-6 text-xl text-white/90 leading-relaxed">
              <p className="text-2xl font-medium">{t('contact.comfort')}</p>
              <p className="text-xl">{t('contact.stayBegins')}</p>
              <p className="text-lg">{t('contact.description')}</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <div className="space-y-6">
            <DesktopContactForm />
          </div>
        </div>
        </div>
      </section>

      <ContactLegalSection />

      <div className="bg-[#a18f85]/90 backdrop-blur-sm py-6">
        <div className="container mx-auto px-6 text-center">
        <p className="text-white">{t('footer.rights')}</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 bg-[#a18f85] hover:bg-[#8d7a70] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label={t('common.scrollToTop')}
        >
          <ArrowUp size={24} />
        </motion.button>
      )}

      <Toaster />
      <SpeedInsights />
    </div>
  );
}