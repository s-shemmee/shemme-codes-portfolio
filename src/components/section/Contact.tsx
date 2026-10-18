'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact: React.FC = () => {
  const contactRef = useRef(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const { hasBeenInView } = useInView(contactRef, { threshold: 0.1 });

  const [formState, setFormState] = useState({
    email: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<{ email?: string; message?: string }>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const focusRingClass =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluebellText dark:focus-visible:ring-bluebellTextDark focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950';

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: { email?: string; message?: string } = {};
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_RE.test(formState.email.trim())) {
      newErrors.email = 'Email is invalid';
    }
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length > 2000) {
      newErrors.message = 'Message is too long';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      setSubmitError('');
      (validationErrors.email ? emailRef : messageRef).current?.focus();
      return;
    }

    setLoading(true);
    setErrors({});
    setSubmitError('');
    setSubmitted(false);

    try {
      const payload = {
        email: formState.email.trim(),
        message: formState.message.trim(),
        website: formState.website,
      };

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setSubmitted(true);
        setFormState({ email: '', message: '', website: '' });
      } else {
        setSubmitError(
          data.error ||
            'There was a problem sending your message. Please try again.'
        );
      }
    } catch {
      setSubmitError('Something went wrong while sending your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={contactRef}
      className="w-full px-4 py-12 sm:px-6 md:p-6 lg:px-12"
      id="contact"
    >
      <div className="max-w-custom mx-auto py-6 sm:py-12 md:py-20 lg:py-28">
        <motion.h2
          className="text-2xl sm:text-[1.75rem] text-gray-900 font-sans font-semibold dark:text-gray-50 flex items-center mb-8 sm:mb-10"
          initial="hidden"
          animate={hasBeenInView ? 'visible' : 'hidden'}
          variants={textVariants}
          custom={0}
        >
          <span
            className="text-xl text-bluebellText dark:text-bluebellTextDark font-serif"
            style={{ transform: 'translateY(-0.15em)' }}
          >
            04.
          </span>
          <span className="ml-4">Get in Touch</span>
          <span className="flex-1 h-px bg-gray-300 dark:bg-gray-700 ml-4 max-w-xs"></span>
        </motion.h2>
        <motion.p
          className="text-gray-700 text-sm sm:text-base font-sans dark:text-gray-300 mb-8 leading-relaxed"
          initial="hidden"
          animate={hasBeenInView ? 'visible' : 'hidden'}
          variants={textVariants}
          custom={1}
        >
          I&apos;m always open to discussing work opportunities, new projects,
          or even just a quick chat! Feel free to drop me a message and
          I&apos;ll get back to you as soon as I can!
        </motion.p>
        <div className="flex flex-col md:flex-row md:gap-12">
          <motion.div
            className="md:flex-1"
            initial="hidden"
            animate={hasBeenInView ? 'visible' : 'hidden'}
            variants={textVariants}
            custom={2}
          >
            <motion.form
              className="space-y-6"
              noValidate
              initial="hidden"
              animate={hasBeenInView ? 'visible' : 'hidden'}
              variants={textVariants}
              custom={3}
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-gray-700 dark:text-gray-300 text-sm sm:text-base font-sans mb-2"
                >
                  Email Address
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@domain.com"
                  autoComplete="email"
                  maxLength={254}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`p-3 bg-gray-100 dark:bg-gray-800 border ${
                    errors.email
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-700'
                  } rounded ${focusRingClass} hover:border-softLilac dark:hover:border-softLilac`}
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <span
                    id="email-error"
                    role="alert"
                    className="text-red-600 dark:text-red-400 text-sm mt-1"
                  >
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="message"
                  className="text-gray-700 dark:text-gray-300 text-sm sm:text-base font-sans mb-2"
                >
                  Message
                </label>
                <textarea
                  ref={messageRef}
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Type your message"
                  autoComplete="off"
                  maxLength={2000}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'message-error' : undefined
                  }
                  className={`p-3 bg-gray-100 dark:bg-gray-800 border ${
                    errors.message
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-700'
                  } rounded ${focusRingClass} hover:border-softLilac dark:hover:border-softLilac`}
                  value={formState.message}
                  onChange={handleChange}
                  required
                ></textarea>
                {errors.message && (
                  <span
                    id="message-error"
                    role="alert"
                    className="text-red-600 dark:text-red-400 text-sm mt-1"
                  >
                    {errors.message}
                  </span>
                )}
              </div>
              {/* Honeypot: hidden from people, bots tend to fill it */}
              <input
                type="text"
                name="website"
                value={formState.website}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <button
                type="submit"
                disabled={loading}
                aria-disabled={loading}
                className={`w-full sm:w-auto px-4 py-3 bg-transparent border-2 border-bluebell text-bluebellText dark:text-bluebellTextDark font-serif rounded-lg transition-transform transform hover:bg-bluebell hover:bg-opacity-10 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed ${focusRingClass}`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              {submitError && (
                <p
                  className="text-red-600 dark:text-red-400 text-sm mt-4"
                  role="alert"
                >
                  {submitError}
                </p>
              )}
              <p
                role="status"
                className="mt-4 min-h-[1.25rem] text-sm text-green-700 dark:text-green-300"
              >
                {submitted ? 'Message sent successfully!' : ''}
              </p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
