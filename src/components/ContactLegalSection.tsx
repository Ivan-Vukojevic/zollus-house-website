import { ExternalLink } from 'lucide-react';

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
  return (
    <section className={`w-full text-left ${className}`} style={{backgroundColor: 'rgb(141, 122, 112)', paddingTop: '80px', paddingBottom: '120px', borderTop: 'none', marginTop: '-1px'}}>
      <div className="mx-auto px-4 sm:px-6" style={{maxWidth: '500px'}}>
        <div className="space-y-6" style={{marginBottom: '24px'}}>
          <details className="group overflow-hidden rounded-xl border-0 backdrop-blur-md" style={{backgroundColor: 'white', border: 'none', outline: 'none'}}>
            <summary 
              className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 sm:px-6 py-3 text-sm font-normal text-left transition-colors duration-200 [&::-webkit-details-marker]:hidden"
              style={{cursor: 'pointer', color: 'rgb(141, 122, 112)'}}
            >
              <span>Službeni podaci vlasnika</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-base leading-none transition-transform duration-200 group-open:rotate-45 shrink-0" style={{backgroundColor: 'rgb(141, 122, 112)', color: 'white'}}>+</span>
            </summary>
            <div className="px-6 pb-5 pt-4 text-sm font-normal text-white/90 leading-relaxed text-left space-y-2" style={{backgroundColor: 'rgba(141, 122, 112, 0.1)', color: 'rgb(141, 122, 112)'}}>
              <p><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>Voditelj obrade / Vlasnik:</strong> {OWNER_DATA.owner}</p>
              <p><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>OIB:</strong> {OWNER_DATA.oib}</p>
              <p><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>eVisitor ID objekta:</strong> {OWNER_DATA.eVisitorId}</p>
              <p><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>Email:</strong> {OWNER_DATA.email}</p>
              <p><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>Tel:</strong> {OWNER_DATA.tel}</p>
            </div>
          </details>

          <details className="group overflow-hidden rounded-xl border-0 backdrop-blur-md" style={{backgroundColor: 'white', border: 'none', outline: 'none'}}>
            <summary 
              className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 sm:px-6 py-3 text-sm font-normal text-left transition-colors duration-200 [&::-webkit-details-marker]:hidden"
              style={{cursor: 'pointer', color: 'rgb(141, 122, 112)'}}
            >
              <span>Uvjeti rezervacije i otkazivanja</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-base leading-none transition-transform duration-200 group-open:rotate-45 shrink-0" style={{backgroundColor: 'rgb(141, 122, 112)', color: 'white'}}>+</span>
            </summary>
            <div className="px-6 pb-5 pt-4 text-sm font-normal text-white/90 leading-relaxed text-left space-y-2" style={{backgroundColor: 'rgba(141, 122, 112, 0.1)', color: 'rgb(141, 122, 112)'}}>
              <p><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>Plaćanje:</strong> Akontacija 30% u roku 48h, preostalih 70% pri dolasku.</p>
              <p><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>Otkazivanje:</strong> Besplatno otkazivanje do 14 dana prije dolaska uz povrat akontacije. Kasno otkazivanje zadržava akontaciju.</p>
              <p><strong className="text-white font-semibold" style={{color: 'rgb(141, 122, 112)'}}>Kućni red:</strong> Check-in od 15:00h, Check-out do 10:00h. Pušenje i kućni ljubimci strogo zabranjeni. Noćni mir od 22:00 do 08:00h.</p>
            </div>
          </details>

          <details className="group overflow-hidden rounded-xl border-0 backdrop-blur-md" style={{backgroundColor: 'white', border: 'none', outline: 'none'}}>
            <summary 
              className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 sm:px-6 py-3 text-sm font-normal text-left transition-colors duration-200 [&::-webkit-details-marker]:hidden"
              style={{cursor: 'pointer', color: 'rgb(141, 122, 112)'}}
            >
              <span>Pravila privatnosti (GDPR)</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-base leading-none transition-transform duration-200 group-open:rotate-45 shrink-0" style={{backgroundColor: 'rgb(141, 122, 112)', color: 'white'}}>+</span>
            </summary>
            <div className="px-6 pb-5 pt-4 text-sm font-normal text-white/90 leading-relaxed text-left" style={{backgroundColor: 'rgba(141, 122, 112, 0.1)', color: 'rgb(141, 122, 112)'}}>
              Podaci prikupljeni preko kontakt forme i prilikom rezervacije obrađuju se isključivo u svrhu rezervacije i zakonske prijave u eVisitor (ID objekta: {OWNER_DATA.eVisitorId}). Kontakt za privatnost: {OWNER_DATA.email}.
            </div>
          </details>

          <details className="group overflow-hidden rounded-xl border-0 backdrop-blur-md" style={{backgroundColor: 'white', border: 'none', outline: 'none'}}>
            <summary 
              className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 sm:px-6 py-3 text-sm font-normal text-left transition-colors duration-200 [&::-webkit-details-marker]:hidden"
              style={{cursor: 'pointer', color: 'rgb(141, 122, 112)'}}
            >
              <span>Prigovori potrošača</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-base leading-none transition-transform duration-200 group-open:rotate-45 shrink-0" style={{backgroundColor: 'rgb(141, 122, 112)', color: 'white'}}>+</span>
            </summary>
            <div className="px-6 pb-5 pt-4 text-sm font-normal text-white/90 leading-relaxed text-left space-y-2" style={{backgroundColor: 'rgba(141, 122, 112, 0.1)', color: 'rgb(141, 122, 112)'}}>
              <p>Sukladno Zakonu o zaštiti potrošača, pisani prigovor može se poslati na e-mail: {OWNER_DATA.email} ili poštom na adresu domaćina.</p>
              <p>Rok za odgovor je 15 dana.</p>
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
          <span>SLUŽBENI CJENIK (XML STRUKTURA)</span>
          <ExternalLink className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" style={{color: 'rgb(141, 122, 112)'}} />
        </a>

      </div>
    </section>
  );
}
