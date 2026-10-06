import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Legal and contact information for Zollus House
const OWNER_DATA = {
  owner: 'Alen Vukojević',
  oib: '47555896124',
  email: 'zollushouse1@gmail.com',
  tel: '+385 91 944 2925',
  eVisitorId: '0250687'
} as const;

interface ContactLegalSectionProps {
  className?: string;
}

export function ContactLegalSection({ className = '' }: ContactLegalSectionProps) {
  const { t } = useTranslation();

  return (
    <section
      className={`relative w-full text-left ${className}`}
      style={{ backgroundColor: 'rgb(141, 122, 112)', paddingTop: '56px', paddingBottom: '120px' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(161, 143, 133, 0.9), rgba(141, 122, 112, 0))',
        }}
      />
      <div className="mx-auto px-4 sm:px-6" style={{maxWidth: '500px'}}>
        <div className="space-y-4 sm:space-y-5" style={{marginBottom: '24px'}}>
          <details className="group overflow-hidden rounded-xl border-0 backdrop-blur-md shadow-sm transition-shadow duration-200 hover:shadow-md" style={{backgroundColor: 'rgba(255, 255, 255, 0.96)', border: 'none', outline: 'none'}}>
            <summary 
              className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 sm:px-6 py-3 text-sm font-medium text-left transition-colors duration-200 [&::-webkit-details-marker]:hidden"
              style={{cursor: 'pointer', color: 'rgb(141, 122, 112)'}}
            >
              <span>{t('legal.ownerTitle')}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-base leading-none transition-transform duration-200 group-open:rotate-45 shrink-0" style={{backgroundColor: 'rgb(141, 122, 112)', color: 'white'}}>+</span>
            </summary>
            <div className="px-6 pb-5 pt-4 text-sm font-normal text-white/90 leading-relaxed text-left space-y-2" style={{backgroundColor: 'rgba(141, 122, 112, 0.1)', color: 'rgb(141, 122, 112)'}}>
              <p className="text-sm"><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>{t('legal.ownerLabel')}</strong> {OWNER_DATA.owner}</p>
              <p className="text-sm"><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>{t('legal.oibLabel')}</strong> {OWNER_DATA.oib}</p>
              <p className="text-sm"><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>{t('legal.eVisitorLabel')}</strong> {OWNER_DATA.eVisitorId}</p>
              <p className="text-sm"><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>{t('legal.emailLabel')}</strong> {OWNER_DATA.email}</p>
              <p className="text-sm"><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>{t('legal.telLabel')}</strong> {OWNER_DATA.tel}</p>
            </div>
          </details>

          <details className="group overflow-hidden rounded-xl border-0 backdrop-blur-md shadow-sm transition-shadow duration-200 hover:shadow-md" style={{backgroundColor: 'rgba(255, 255, 255, 0.96)', border: 'none', outline: 'none'}}>
            <summary 
              className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 sm:px-6 py-3 text-sm font-medium text-left transition-colors duration-200 [&::-webkit-details-marker]:hidden"
              style={{cursor: 'pointer', color: 'rgb(141, 122, 112)'}}
            >
              <span>{t('legal.bookingTitle')}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-base leading-none transition-transform duration-200 group-open:rotate-45 shrink-0" style={{backgroundColor: 'rgb(141, 122, 112)', color: 'white'}}>+</span>
            </summary>
            <div className="px-6 pb-5 pt-4 text-sm font-normal text-white/90 leading-relaxed text-left space-y-2" style={{backgroundColor: 'rgba(141, 122, 112, 0.1)', color: 'rgb(141, 122, 112)'}}>
              <p className="text-sm"><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>Plaćanje i otkazivanje:</strong> {t('legal.bookingContent.payment').replace('Plaćanje i otkazivanje: ', '')}</p>
              <p className="text-sm"><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>Boravak i kućni red:</strong> {t('legal.bookingContent.houseRules').replace('Boravak i kućni red: ', '')}</p>
              <p className="text-sm"><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>Naknade i porezi:</strong> {t('legal.bookingContent.fees').replace('Naknade i porezi: ', '')}</p>
              <p className="text-sm"><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>Sigurnost i odgovornost:</strong> {t('legal.bookingContent.security').replace('Sigurnost i odgovornost: ', '')}</p>
              <p className="text-sm"><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>Napomena:</strong> {t('legal.bookingContent.note').replace('Napomena: ', '')}</p>
            </div>
          </details>

          <details className="group overflow-hidden rounded-xl border-0 backdrop-blur-md shadow-sm transition-shadow duration-200 hover:shadow-md" style={{backgroundColor: 'rgba(255, 255, 255, 0.96)', border: 'none', outline: 'none'}}>
            <summary 
              className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 sm:px-6 py-3 text-sm font-medium text-left transition-colors duration-200 [&::-webkit-details-marker]:hidden"
              style={{cursor: 'pointer', color: 'rgb(141, 122, 112)'}}
            >
              <span>{t('legal.privacyTitle')}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-base leading-none transition-transform duration-200 group-open:rotate-45 shrink-0" style={{backgroundColor: 'rgb(141, 122, 112)', color: 'white'}}>+</span>
            </summary>
            <div className="px-6 pb-5 pt-4 text-sm font-normal text-white/90 leading-relaxed text-left" style={{backgroundColor: 'rgba(141, 122, 112, 0.1)', color: 'rgb(141, 122, 112)'}}>
              <p className="text-sm">{t('legal.privacyContent', {
                eVisitorId: OWNER_DATA.eVisitorId,
                email: OWNER_DATA.email,
              })}</p>
            </div>
          </details>

          <details className="group overflow-hidden rounded-xl border-0 backdrop-blur-md shadow-sm transition-shadow duration-200 hover:shadow-md" style={{backgroundColor: 'rgba(255, 255, 255, 0.96)', border: 'none', outline: 'none'}}>
            <summary 
              className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 sm:px-6 py-3 text-sm font-medium text-left transition-colors duration-200 [&::-webkit-details-marker]:hidden"
              style={{cursor: 'pointer', color: 'rgb(141, 122, 112)'}}
            >
              <span>{t('legal.complaintsTitle')}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-base leading-none transition-transform duration-200 group-open:rotate-45 shrink-0" style={{backgroundColor: 'rgb(141, 122, 112)', color: 'white'}}>+</span>
            </summary>
            <div className="px-6 pb-5 pt-4 text-sm font-normal text-white/90 leading-relaxed text-left space-y-2" style={{backgroundColor: 'rgba(141, 122, 112, 0.1)', color: 'rgb(141, 122, 112)'}}>
              <p className="text-sm">{t('legal.complaintsContent', { email: OWNER_DATA.email })}</p>
              <p className="text-sm">{t('legal.complaintsResponseTime')}</p>
            </div>
          </details>
        </div>

        <a
          href="/cjenik.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-3 rounded-xl border border-white/30 backdrop-blur-md px-4 py-3.5 text-sm font-semibold transition-colors duration-200 mb-8"
          style={{
            backgroundColor: 'white',
            color: 'rgb(141, 122, 112)',
            width: '100%'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgb(245, 245, 245)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
        >
          <span>{t('legal.officialPriceList')}</span>
          <ExternalLink className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" style={{color: 'rgb(141, 122, 112)'}} />
        </a>

      </div>
    </section>
  );
}
