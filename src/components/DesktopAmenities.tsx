import { motion } from 'motion/react';
import { Wifi } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import svgPaths from '../imports/svg-hlfzlrhqss';

interface AmenityCardProps {
  icon: React.ReactNode;
  label: string;
  delay: number;
}

function AmenityCard({ icon, label, delay }: AmenityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:border-white/40 transition-all duration-300"
    >
      <div className="text-white mb-4 flex justify-center">
        {icon}
      </div>
      <span className="text-white text-sm font-medium uppercase tracking-wide">
        {label}
      </span>
    </motion.div>
  );
}

export function DesktopAmenities() {
  const { t } = useTranslation();

  const amenities = [
    {
      icon: <Wifi size={32} />,
      label: t('amenities.wifi')
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 37 27">
          <path d={svgPaths.p1cfd9100} fill="currentColor" />
        </svg>
      ),
      label: t('amenities.beds')
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 32 32">
          <path d={svgPaths.p1d7c7b00} fill="currentColor" />
        </svg>
      ),
      label: t('amenities.jacuzzi')
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 33 37">
          <path d={svgPaths.p4368af0} fill="currentColor" />
        </svg>
      ),
      label: t('amenities.balcony')
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 30 28">
          <path d={svgPaths.p9eb7280} fill="currentColor" />
        </svg>
      ),
      label: t('amenities.dart')
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {amenities.map((amenity, index) => (
        <AmenityCard
          key={index}
          icon={amenity.icon}
          label={amenity.label}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}