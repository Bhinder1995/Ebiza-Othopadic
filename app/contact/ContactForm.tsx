"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', contact: '', cat: '', msg: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact) { alert('Please fill in name and contact.'); return; }
    const text = encodeURIComponent(`Name: ${form.name}\nContact: ${form.contact}\nCategory: ${form.cat}\nMessage: ${form.msg}`);
    window.open(`https://wa.me/916291816264?text=${text}`, '_blank');
  };

  return (
    <div className="contact-form-wrap">
      <div className="form-title">Send an Inquiry</div>
      <form onSubmit={sendInquiry}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone / Email</label>
          <input type="text" name="contact" placeholder="Contact number or email" value={form.contact} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Product Interest</label>
          <select name="cat" value={form.cat} onChange={handleChange}>
            <option value="">Select category...</option>
            <option>Body Belts &amp; Braces Support</option>
            <option>Cervical Support</option>
            <option>Fracture Braces Support</option>
            <option>Finger Splints</option>
            <option>Foot &amp; Ankle Supports</option>
            <option>Knee Braces Support</option>
            <option>Wrist &amp; Forearm Brace Support</option>
            <option>Traction Kits</option>
            <option>Silicone &amp; Foot Products</option>
            <option>Physio Products</option>
            <option>Walking Aid Products</option>
            <option>Allied Products</option>
            <option>Pediatric Products</option>
            <option>General Inquiry</option>
          </select>
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="msg" placeholder="Tell us what you need..." rows={4} value={form.msg} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="form-submit">Send Inquiry →</button>
      </form>
    </div>
  );
}
