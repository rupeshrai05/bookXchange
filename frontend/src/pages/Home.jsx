import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background Gradient Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10" />

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-5xl md:text-8xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Exchange Books. <br /> Share Stories.
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-2xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
        >
          The smartest way to declutter your shelf and discover new reads. 
          Join the community of 500+ readers today.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <a
            href="#about"
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105"
          >
            Explore Library
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            About BookXchange
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed mb-8"
          >
            We believe that books are meant to be read, not just collected to gather dust. 
            Our platform enables a seamless peer-to-peer exchange network where you can 
            give away what you've read and receive exciting new titles in return. 
            <br /><br />
            Born from a love of reading and a desire to make books accessible to everyone, 
            BookXchange connects you with neighbors and fellow bookworms.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-zinc-800 bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-6">
           <div>
             <div className="text-4xl font-bold text-blue-500 mb-2">1,200+</div>
             <div className="text-gray-500 text-sm uppercase tracking-wide">Books Listed</div>
           </div>
           <div>
             <div className="text-4xl font-bold text-purple-500 mb-2">850+</div>
             <div className="text-gray-500 text-sm uppercase tracking-wide">Happy Readers</div>
           </div>
           <div>
             <div className="text-4xl font-bold text-pink-500 mb-2">3,000+</div>
             <div className="text-gray-500 text-sm uppercase tracking-wide">Exchanges</div>
           </div>
           <div>
             <div className="text-4xl font-bold text-green-500 mb-2">4.9/5</div>
             <div className="text-gray-500 text-sm uppercase tracking-wide">Community Rating</div>
           </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "List Your Books",
              desc: "Snap a photo, add details, and list the books you're ready to pass on. It takes less than a minute.",
              icon: "📚",
            },
            {
              title: "Connect & Request",
              desc: "Browse the community library. Found something you like? Send an exchange request instantly.",
              icon: "🤝",
            },
            {
              title: "Ship & Receive",
              desc: "Ship your book, track the package, and enjoy your new read delivered to your doorstep.",
              icon: "📦",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 transition-colors group"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is BookXchange free to use?", a: "Yes! Listing books and requesting exchanges is completely free. You only coordinate shipping costs with your exchange partner." },
              { q: "How do I ship the books?", a: "Once an exchange is accepted, you'll see the shipping address. You can use any courier service and share the tracking number." },
              { q: "Is it safe?", a: "We verify users via email. Plus, our community rating system ensures you exchange with trusted readers." }
            ].map((item, i) => (
              <div key={i} className="border-b border-zinc-800 pb-4">
                <h3 className="text-lg font-semibold mb-2">{item.q}</h3>
                <p className="text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-zinc-900 bg-black">
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">BookXchange</h3>
        <p className="text-gray-500 text-sm mb-6">&copy; {new Date().getFullYear()} BookXchange. Built with ❤️ for readers.</p>
        <div className="flex justify-center gap-6 text-gray-400 text-sm">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}
