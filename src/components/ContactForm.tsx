import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('form.nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('form.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('form.emailInvalid');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('form.messageRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(t('form.invalidFields'));
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    const action = form.action;

    setIsSubmitting(true);

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json'
        }
      });

      if (res.ok) {
        if (window.gtag) {
          window.gtag('event', 'Traženje ponude', {
            'send_to': 'AW-18227859729/FUrACNmew88cEJGi3PND',
            'value': 1,
            'currency': 'EUR'
          });
        }
        toast.success(t('form.success'));
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        const data = await res.json().catch(() => null);
        if (data && data.errors && Array.isArray(data.errors)) {
          toast.error(data.errors.map((err: any) => err.message).join(', '));
        } else {
          toast.error(t('form.failed'));
        }
      }
    } catch (err) {
      toast.error(t('form.failedNetwork'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4" action="https://formspree.io/f/xrbykbgr" method="POST">
        <div>
          <Input
            id="contact-name"
            name="name"
            type="text"
            placeholder={t('form.namePlaceholder')}
            autoComplete="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full bg-[rgba(161,143,133,0.8)] border border-white text-white placeholder-white/70 rounded-2xl h-12 px-4 shadow-[0_10px_30px_rgba(10,10,10,0.18)] ${
              errors.name ? 'border-red-400' : ''
            }`}
            disabled={isSubmitting}
          />
          {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder={t('form.emailPlaceholder')}
            autoComplete="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full bg-[rgba(161,143,133,0.8)] border border-white text-white placeholder-white/70 rounded-2xl h-12 px-4 shadow-[0_10px_30px_rgba(10,10,10,0.18)] ${
              errors.email ? 'border-red-400' : ''
            }`}
            disabled={isSubmitting}
          />
          {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Textarea
            id="contact-message"
            name="message"
            placeholder={t('form.messagePlaceholder')}
            autoComplete="off"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className={`w-full bg-[rgba(161,143,133,0.8)] border border-white text-white placeholder-white/70 rounded-2xl p-4 min-h-[120px] resize-none shadow-[0_10px_30px_rgba(10,10,10,0.18)] ${
              errors.message ? 'border-red-400' : ''
            }`}
            disabled={isSubmitting}
          />
          {errors.message && <p className="text-red-300 text-sm mt-1">{errors.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#a18f85]/90 hover:bg-[#8d7a70] text-white border border-white rounded-full h-12 transition-all duration-200 shadow-[0_12px_30px_rgba(0,0,0,0.24)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.28)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t('form.sending')}
            </>
          ) : (
            t('form.submit')
          )}
        </Button>
      </form>
    </div>
  );
}