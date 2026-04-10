import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const schema = yup.object({
  name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  subject: yup.string().min(5, 'Subject must be at least 5 characters').required('Subject is required'),
  message: yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
});

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (_data: ContactForm) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-hyper-dark">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-glass-dark/30 to-hyper-dark border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-orange mb-4">Get in Touch</h1>
          <p className="text-text-secondary text-lg">Have questions? We'd love to hear from you. Send us a message!</p>
        </div>
      </div>

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-8">Contact Info</h3>
              </div>

              <GlassCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neon-blue/20 rounded-lg flex-shrink-0">
                    <i className="bi bi-telephone text-xl text-neon-blue"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Phone</h4>
                    <p className="text-text-secondary text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neon-orange/20 rounded-lg flex-shrink-0">
                    <i className="bi bi-envelope text-xl text-neon-orange"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <p className="text-text-secondary text-sm">info@carrental.com</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neon-red/20 rounded-lg flex-shrink-0">
                    <i className="bi bi-geo-alt text-xl text-neon-red"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Address</h4>
                    <p className="text-text-secondary text-sm">123 Main St, City, State</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">Business Hours</h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-neon-blue/20 border border-neon-blue/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <i className="bi bi-check-circle text-neon-blue text-xl"></i>
                      <p className="text-text-secondary">Thank you for your message! We'll get back to you soon.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className={`w-full px-4 py-3 bg-glass-dark border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:ring-1 transition ${
                          errors.name
                            ? 'border-neon-red focus:border-neon-red focus:ring-neon-red/50'
                            : 'border-white/10 focus:border-neon-blue focus:ring-neon-blue/50'
                        }`}
                        placeholder="Your Name"
                      />
                      {errors.name && <p className="text-neon-red text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className={`w-full px-4 py-3 bg-glass-dark border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:ring-1 transition ${
                          errors.email
                            ? 'border-neon-red focus:border-neon-red focus:ring-neon-red/50'
                            : 'border-white/10 focus:border-neon-blue focus:ring-neon-blue/50'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-neon-red text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      {...register('subject')}
                      className={`w-full px-4 py-3 bg-glass-dark border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:ring-1 transition ${
                        errors.subject
                          ? 'border-neon-red focus:border-neon-red focus:ring-neon-red/50'
                          : 'border-white/10 focus:border-neon-blue focus:ring-neon-blue/50'
                      }`}
                      placeholder="What is this about?"
                    />
                    {errors.subject && <p className="text-neon-red text-sm mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message')}
                      className={`w-full px-4 py-3 bg-glass-dark border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:ring-1 transition resize-none ${
                        errors.message
                          ? 'border-neon-red focus:border-neon-red focus:ring-neon-red/50'
                          : 'border-white/10 focus:border-neon-blue focus:ring-neon-blue/50'
                      }`}
                      placeholder="Type your message here..."
                    ></textarea>
                    {errors.message && <p className="text-neon-red text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="inline-block animate-spin mr-2">⊙</span>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;