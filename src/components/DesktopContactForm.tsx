import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface DesktopContactFormProps {
  className?: string;
}

export function DesktopContactForm({ className = '' }: DesktopContactFormProps) {
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
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className={`w-full max-w-lg ${className}`}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <form onSubmit={handleSubmit} className="space-y-6" action="https://formspree.io/f/xrbykbgr" method="POST">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Input
              id="desktop-contact-name"
              name="name"
              type="text"
              placeholder={t('form.namePlaceholder')}
              autoComplete="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full bg-white/10 border-2 border-white/30 text-white placeholder-white/70 rounded-xl h-14 px-6 backdrop-blur-sm hover:border-white/50 focus:border-white transition-all duration-300 ${
                errors.name ? 'border-red-400' : ''
              }`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-300 text-sm mt-2"
              >
                {errors.name}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Input
              id="desktop-contact-email"
              name="email"
              type="email"
              placeholder={t('form.emailPlaceholder')}
              autoComplete="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full bg-white/10 border-2 border-white/30 text-white placeholder-white/70 rounded-xl h-14 px-6 backdrop-blur-sm hover:border-white/50 focus:border-white transition-all duration-300 ${
                errors.email ? 'border-red-400' : ''
              }`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-300 text-sm mt-2"
              >
                {errors.email}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Textarea
              id="desktop-contact-message"
              name="message"
              placeholder={t('form.messagePlaceholder')}
              autoComplete="off"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className={`w-full bg-white/10 border-2 border-white/30 text-white placeholder-white/70 rounded-xl p-6 min-h-[140px] resize-none backdrop-blur-sm hover:border-white/50 focus:border-white transition-all duration-300 ${
                errors.message ? 'border-red-400' : ''
              }`}
              disabled={isSubmitting}
            />
            {errors.message && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-300 text-sm mt-2"
              >
                {errors.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#a18f85] hover:bg-[#8d7a70] text-white border-2 border-white/30 hover:border-white rounded-xl h-14 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  {t('form.sending')}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                  {t('form.submitMessage')}
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}