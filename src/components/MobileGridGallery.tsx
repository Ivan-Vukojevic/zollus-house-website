import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ResponsivePicture, buildSrcSet } from './figma/ResponsivePicture';
import { useTranslation } from 'react-i18next';
import imgRectangle1 from '../assets/gallery/living-room-overview.jpg';
import imgRectangle2 from '../assets/gallery/bathroom-deluxe-overview.png';
import imgRectangle3 from '../assets/gallery/living-room-wide-angle.jpg';
import imgRectangle4 from '../assets/gallery/bedroom-deluxe-overview.png';
import imgRectangle5 from '../assets/gallery/lobby-entrance.png';
import imgRectangle6 from '../assets/gallery/living-room-sofa-main.jpg';
import imgRectangle7 from '../assets/gallery/amenity-cozy-night-seating.png';
import imgRectangle8 from '../assets/gallery/atmosphere-morning-light.png';
import imgRectangle9 from '../assets/gallery/amenity-outdoor-darts-area.png';
import imgRectangle10 from '../assets/gallery/amenity-backyard-jacuzzi-wide.png';
import imgRectangle11 from '../assets/gallery/bedroom-quad-overview.png';
import imgRectangle12 from '../assets/gallery/lobby-entrance-main.png';
import imgRectangle13 from '../assets/gallery/exterior-front-night.png';
import imgRectangle14 from '../assets/gallery/bedroom-family-quad-room.png';
import imgRectangle15 from '../assets/gallery/staircase-wooden-classic.png';
import imgRectangle16 from '../assets/gallery/attic-chill-section.png';
import imgRectangle17 from '../assets/gallery/bedroom-attic-view.png'
import imgRectangle18 from '../assets/gallery/main-entrance-facade.png';
import imgRectangle19 from '../assets/gallery/amenity-jacuzzi-deckchairs.png';
import imgRectangle20 from '../assets/gallery/bathroom-standard-overview.png';
import imgRectangle21 from '../assets/gallery/window-road-view.png';
import imgRectangle22 from '../assets/gallery/bedroom-quad-entrance-view.png';
import imgRectangle23 from '../assets/gallery/amenity-peaceful-night-garden.png';
import imgRectangle24 from '../assets/gallery/kitchen-overview.png';
import imgRectangle25 from '../assets/gallery/amenity-jacuzzi-hangout-sled.png';
// Responsive variants (AVIF/WebP) for first-row images (optimize above-the-fold)
import mRect1Avif from '../assets/gallery/living-room-overview.jpg?w=480;768;1024;1440;1920&format=avif;avif;avif;avif;avif&as=object';
import mRect1Webp from '../assets/gallery/living-room-overview.jpg?w=480;768;1024;1440;1920&format=webp;webp;webp;webp;webp&as=object';
import mRect2Avif from '../assets/gallery/bathroom-deluxe-overview.png?w=480;768;1024;1440;1920&format=avif;avif;avif;avif;avif&as=object';
import mRect2Webp from '../assets/gallery/bathroom-deluxe-overview.png?w=480;768;1024;1440;1920&format=webp;webp;webp;webp;webp&as=object';
import mRect3Avif from '../assets/gallery/living-room-wide-angle.jpg?w=480;768;1024;1440;1920&format=avif;avif;avif;avif;avif&as=object';
import mRect3Webp from '../assets/gallery/living-room-wide-angle.jpg?w=480;768;1024;1440;1920&format=webp;webp;webp;webp;webp&as=object';
import mRect4Avif from '../assets/gallery/bedroom-deluxe-overview.png?w=480;768;1024;1440;1920&format=avif;avif;avif;avif;avif&as=object';
import mRect4Webp from '../assets/gallery/bedroom-deluxe-overview.png?w=480;768;1024;1440;1920&format=webp;webp;webp;webp;webp&as=object';

interface MobileGridGalleryProps {
  className?: string;
}

export function MobileGridGallery({ className = '' }: MobileGridGalleryProps) {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      src: imgRectangle1,
      key: 'livingRoom'
    },
    {
      src: imgRectangle2,
      key: 'deluxeBathroom'
    },
    {
      src: imgRectangle3,
      key: 'loungeArea'
    },
    {
      src: imgRectangle4,
      key: 'deluxeBedroom'
    },
    {
      src: imgRectangle5,
      key: 'lobbyEntrance'
    },
    {
      src: imgRectangle6,
      key: 'seatingArea'
    },
    {
      src: imgRectangle7,
      key: 'nightAmbiance'
    },
    {
      src: imgRectangle8,
      key: 'morningLight'
    },
    {
      src: imgRectangle9,
      key: 'outdoorGames'
    },
    {
      src: imgRectangle10,
      key: 'jacuzziSpa'
    },
    {
      src: imgRectangle11,
      key: 'familyRoom'
    },
    {
      src: imgRectangle12,
      key: 'mainLobby'
    },
    {
      src: imgRectangle13,
      key: 'nightExterior'
    },
    {
      src: imgRectangle14,
      key: 'groupRoom'
    },
    {
      src: imgRectangle15,
      key: 'grandStaircase'
    },
    {
      src: imgRectangle16,
      key: 'atticChillZone'
    },
    {
      src: imgRectangle17,
      key: 'bedroomAtticView'
    },
    {
      src: imgRectangle18,
      key: 'mainEntrance'
    },
    {
      src: imgRectangle19,
      key: 'jacuzziDeckchairs'
    },
    {
      src: imgRectangle20,
      key: 'bathroomOverview'
    },
    {
      src: imgRectangle21,
      key: 'roadView'
    },
    {
      src: imgRectangle22,
      key: 'quadBedroomEntrance'
    },
    {
      src: imgRectangle23,
      key: 'nightGarden'
    },
    {
      src: imgRectangle24,
      key: 'kitchenOverview'
    },
    {
      src: imgRectangle25,
      key: 'jacuzziHangout'
    }
  ];

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <div className={`relative w-full min-h-screen bg-[#a18f85] ${className}`}>
      {/* Header with descriptive text */}
      <div className="relative z-10 p-6 text-white">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center uppercase mb-6"
        >
          {t('gallery.title')}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md mx-auto space-y-4 text-center mb-8"
        >
          <p className="text-sm leading-relaxed mobile-gallery-text">
            {t('gallery.description1')}
          </p>
          <p className="text-sm leading-relaxed mobile-gallery-text">
            {t('gallery.description2')}
          </p>
        </motion.div>
      </div>

      {/* Gallery Grid */}
      <div className="px-4 pb-8">
        <div className="grid grid-cols-2 gap-3">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div 
                className="relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm cursor-pointer aspect-square"
                onClick={() => openModal(index)}
              >
                {index < 4 ? (
                  <ResponsivePicture
                    alt={t(`gallery.imageAlts.${image.key}`)}
                    imgSrc={image.src}
                    imgClassName="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(min-width: 768px) 50vw, 50vw"
                    sources={[
                      { type: 'image/avif', srcSet: buildSrcSet([mRect1Avif, mRect2Avif, mRect3Avif, mRect4Avif][index] as any, 'w') },
                      { type: 'image/webp', srcSet: buildSrcSet([mRect1Webp, mRect2Webp, mRect3Webp, mRect4Webp][index] as any, 'w') },
                    ]}
                  />
                ) : (
                  <ImageWithFallback
                    src={image.src}
                    alt={t(`gallery.imageAlts.${image.key}`)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                
                {/* Hover content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-white">
                    <ZoomIn className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium uppercase">{t(`gallery.imageTitles.${image.key}`)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for full-size image viewing */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-60 text-white hover:text-gray-300 transition-colors"
              aria-label={t('gallery.closeImage')}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Image navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-60 text-white hover:text-gray-300 transition-colors"
              aria-label={t('gallery.previousImage')}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-60 text-white hover:text-gray-300 transition-colors"
              aria-label={t('gallery.nextImage')}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Main image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={images[selectedImage].src}
                alt={t(`gallery.imageAlts.${images[selectedImage].key}`)}
                className="w-full h-full object-contain rounded-lg"
                loading='lazy'
              />
              
              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                <h3 className="text-white text-lg font-medium">{t(`gallery.imageTitles.${images[selectedImage].key}`)}</h3>
                <p className="text-white/80 text-sm">{t(`gallery.imageAlts.${images[selectedImage].key}`)}</p>
              </div>
            </motion.div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}