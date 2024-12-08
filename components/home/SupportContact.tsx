'use client';
import React, { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, AlertTriangle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const SupportContact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<ContactFormData>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous error for this field
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    
    // Validate form
    const errors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Submit form
    try {
      setSubmitStatus('idle');
      // Here you would typically make an API call to submit the form
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setFormErrors({});
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <section className="hero-gradient min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text-white dark:gradient-text-dark">
          Get in <span className="gradient-text">Touch</span>
        </h2>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
        We&apos;d love to hear from you. Drop us a line!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
          <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
          <div className="space-y-6">
          <div className="flex items-center space-x-4 text-white">
            <div className="bg-white/10 p-3 rounded-lg">
            <Mail className="h-6 w-6" />
            </div>
            <div>
            <p className="text-sm opacity-75">Email</p>
            <p className="font-medium">support@wemace.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-white">
            <div className="bg-white/10 p-3 rounded-lg">
            <Phone className="h-6 w-6" />
            </div>
            <div>
            <p className="text-sm opacity-75">Phone</p>
            <p className="font-medium">+91 123 456 7890</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-white">
            <div className="bg-white/10 p-3 rounded-lg">
            <MapPin className="h-6 w-6" />
            </div>
            <div>
            <p className="text-sm opacity-75">Location</p>
            <p className="font-medium">Bangalore, Karnataka, India</p>
            </div>
          </div>
          </div>
        </div>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Send Message</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-4 bg-white/5 border rounded-lg focus:ring-2 focus:ring-[#8A2BE2] transition ${
              formErrors.name ? 'border-red-500' : 'border-gray-400 dark:border-gray-700'
            }`}
            />
            {formErrors.name && (
            <p className="text-[#FF1493] text-sm mt-1 flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4" /> {formErrors.name}
            </p>
            )}
          </div>
          <div>
            <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-4 bg-white/5 border rounded-lg focus:ring-2 focus:ring-[#8A2BE2] transition ${
              formErrors.email ? 'border-red-500' : 'border-gray-400 dark:border-gray-700'
            }`}
            />
            {formErrors.email && (
            <p className="text-[#FF1493] text-sm mt-1 flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4" /> {formErrors.email}
            </p>
            )}
          </div>
          </div>
          <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (Optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-4 bg-white/5 border border-gray-400 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#8A2BE2] transition"
          />
          </div>
          <div>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full p-4 bg-white/5 border rounded-lg focus:ring-2 focus:ring-[#8A2BE2] transition ${
            formErrors.message ? 'border-red-500' : 'border-gray-400 dark:border-gray-700'
            }`}
          />
          {formErrors.message && (
            <p className="text-[#FF1493] text-sm mt-1 flex items-center">
            <AlertTriangle className="mr-2 h-4 w-4" /> {formErrors.message}
            </p>
          )}
          </div>
          <button
          type="submit"
          className="w-full bg-[#8A2BE2] hover:bg-[#7B27CC] text-white py-4 px-8 rounded-lg transition-colors flex items-center justify-center text-lg font-medium"
          >
          <Send className="mr-2 h-5 w-5" /> Send Message
          </button>

          {submitStatus === 'success' && (
          <div className="bg-green-500/10 text-green-500 p-4 rounded-lg mt-4 text-center animate-fade-in">
            Message sent successfully! We&apos;ll get back to you soon.
          </div>
          )}
          {submitStatus === 'error' && (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mt-4 text-center animate-fade-in">
            Failed to send message. Please tr again.
          </div>
          )}
        </form>
        </div>
      </div>
      </div>
    </section>
  );
};

export default SupportContact;
