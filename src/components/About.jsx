import React, { useEffect, useRef } from "react";
import { Car, Bus, Train, Check, ChevronRight, Phone, MapPin, Mail } from "lucide-react";
import { Sunrise, Sun, Clock, Moon, Sunset, MoonStar, Bell, Sparkles, Flame, Users, Star, BookOpen, Music, Heart, Lock, DoorOpen, Lamp, Bed, Utensils, Award, Target, Shield, Home, Leaf, TreePine, Flower2, Mountain, Droplets, Wind } from "lucide-react";
import AOS from "aos";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";

function AboutTemple() {
  const reachSectionRef = useRef(null);
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-out" });
  }, []);

  const scrollToReachSection = () => {
    reachSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const nakshatraTrees = [
    { nakshatram: "Ashwini", tree: "Kuchila (Nux Vomica)", benefit: "Brings energy & healing" },
    { nakshatram: "Bharani", tree: "Amla (Gooseberry)", benefit: "Longevity & strength" },
    { nakshatram: "Krittika", tree: "Fig (Ficus Racemosa)", benefit: "Prosperity & blessings" },
    { nakshatram: "Rohini", tree: "Jamun (Black Plum)", benefit: "Mental peace & fertility" },
    { nakshatram: "Mrigashira", tree: "Banyan Tree", benefit: "Stability & long life" },
    { nakshatram: "Ardra", tree: "Neem Tree", benefit: "Protection from negativity" },
    { nakshatram: "Punarvasu", tree: "Bamboo", benefit: "Growth & harmony" },
    { nakshatram: "Pushya", tree: "Peepal Tree", benefit: "Wisdom & enlightenment" },
    { nakshatram: "Ashlesha", tree: "Nagakesara", benefit: "Protection from evil" },
    { nakshatram: "Magha", tree: "Banyan Tree", benefit: "Royal success" },
    { nakshatram: "Purva Phalguni", tree: "Ashoka Tree", benefit: "Happiness & love" },
    { nakshatram: "Uttara Phalguni", tree: "Mango Tree", benefit: "Prosperity & abundance" },
    { nakshatram: "Hasta", tree: "Jasmine", benefit: "Spiritual clarity" },
    { nakshatram: "Chitra", tree: "Bael (Bilva)", benefit: "Lord Shiva's grace" },
    { nakshatram: "Swati", tree: "Arjuna Tree", benefit: "Balance & health" },
    { nakshatram: "Vishakha", tree: "Amruta (Tinospora)", benefit: "Detox & immunity" },
    { nakshatram: "Anuradha", tree: "Jackfruit", benefit: "Friendship & devotion" },
    { nakshatram: "Jyeshtha", tree: "Champa", benefit: "Leadership & fame" },
    { nakshatram: "Moola", tree: "Banyan Tree", benefit: "Deep spiritual roots" },
    { nakshatram: "Purvashadha", tree: "Palm Tree", benefit: "Courage & endurance" },
    { nakshatram: "Uttarashadha", tree: "Fig Tree", benefit: "Wisdom & patience" },
    { nakshatram: "Shravana", tree: "Vata Tree", benefit: "Knowledge & learning" },
    { nakshatram: "Dhanishta", tree: "Shami Tree", benefit: "Victory & success" },
    { nakshatram: "Shatabhisha", tree: "Kadamba", benefit: "Healing power" },
    { nakshatram: "Purvabhadra", tree: "Neem Tree", benefit: "Purity & protection" },
    { nakshatram: "Uttarabhadra", tree: "Tamarind", benefit: "Stability in life" },
    { nakshatram: "Revathi", tree: "Kadamba", benefit: "Peace & happiness" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-[280px] bg-gradient-to-r from-primary via-primary to-secondary/20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 bg-secondary/10 rounded-full mb-4">
              <Home className="w-4 h-4 text-secondary mr-2" />
              <span className="text-sm font-medium text-secondary">Divine Abode</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              About Our Sacred Ganapathi Temple
            </h1>
            
            <p className="text-gray-700 mb-6 max-w-2xl">
              A sacred space dedicated to Lord Ganesha, where ancient Vedic traditions meet modern spiritual practices
            </p>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={scrollToReachSection}
                className="px-6 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-[#C2410C] transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                How to Reach
              </button>
              <a href="tel:+919876543210" className="px-6 py-3 bg-primary text-secondary rounded-lg font-medium hover:bg-gray-100 transition-colors border border-secondary flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Temple
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div data-aos="fade-right">
            <div className="inline-flex items-center px-3 py-1 bg-secondary/10 rounded-full mb-4">
              <Award className="w-4 h-4 text-secondary mr-2" />
              <span className="text-sm font-medium text-secondary">Established 1998</span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Sri Ganapathi Temple Trust
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                Our temple stands as a beacon of spiritual enlightenment, dedicated to Lord Ganesha - the remover of obstacles and bestower of wisdom. Founded in 1998, we have been serving devotees with authentic Vedic rituals and spiritual guidance.
              </p>
              <p>
                The temple complex features a magnificent 12-foot tall Ganapathi idol, handcrafted from single stone, along with shrines dedicated to Lord Shiva, Goddess Durga, and Navagrahas. Our mission is to preserve ancient traditions while making spirituality accessible to all.
              </p>
              <p>
                Beyond worship, we actively engage in social welfare programs including daily Annaprasadam (free food distribution), educational support for underprivileged children, and environmental conservation through our Nakshatra Vanam initiative.
              </p>
            </div>
          </div>
          
          <div data-aos="fade-left" className="relative">
            <div className="bg-primary rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1632783652294-efd7d2f5594f?w=800&auto=format&fit=crop"
                alt="Ganapathi Temple"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">5000+</div>
                  <div className="text-sm text-gray-600">Daily Devotees</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Served with spiritual guidance and rituals every day
              </p>
            </div>
          </div>
        </div>

        {/* Temple Schedule */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Temple Daily Schedule</h2>
            <p className="text-gray-600">Worship timings and spiritual activities following ancient traditions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                time: "5:00 AM - 6:00 AM",
                title: "Suprabhatham",
                desc: "Temple opening with Vedic chants",
                icon: <Sunrise className="w-5 h-5" />
              },
              {
                time: "6:00 AM - 7:00 AM",
                title: "Ganapathi Abhishekam",
                desc: "Sacred bath to Lord Ganesha",
                icon: <Droplets className="w-5 h-5" />
              },
              {
                time: "7:00 AM - 8:00 AM",
                title: "Alankaram",
                desc: "Decoration with flowers & jewels",
                icon: <Flower2 className="w-5 h-5" />
              },
              {
                time: "8:00 AM - 12:00 PM",
                title: "Morning Darshan",
                desc: "Open for devotees' worship",
                icon: <Sun className="w-5 h-5" />
              },
              {
                time: "12:00 PM - 1:00 PM",
                title: "Maha Naivedyam",
                desc: "Main food offering to deities",
                icon: <Utensils className="w-5 h-5" />
              },
              {
                time: "1:00 PM - 3:00 PM",
                title: "Temple Rest",
                desc: "Deities' rest period",
                icon: <Bed className="w-5 h-5" />
              },
              {
                time: "3:00 PM - 4:00 PM",
                title: "Reopening",
                desc: "Pravesha Seva with bells",
                icon: <DoorOpen className="w-5 h-5" />
              },
              {
                time: "4:00 PM - 6:00 PM",
                title: "Evening Worship",
                desc: "Deeparadhana & Bhajans",
                icon: <Lamp className="w-5 h-5" />
              },
              {
                time: "6:00 PM - 8:00 PM",
                title: "Special Poojas",
                desc: "Rudrabhishekam & Archana",
                icon: <Flame className="w-5 h-5" />
              },
              {
                time: "8:00 PM - 9:00 PM",
                title: "Sandhya Aarati",
                desc: "Evening lamp offering",
                icon: <Sunset className="w-5 h-5" />
              },
              {
                time: "9:00 PM",
                title: "Temple Closure",
                desc: "Shayana Aarati & rest",
                icon: <MoonStar className="w-5 h-5" />
              }
            ].map((schedule, index) => (
              <div 
                key={index} 
                className="bg-primary rounded-xl border border-gray-200 p-5 hover:border-secondary/50 transition-colors"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <div className="text-secondary">{schedule.icon}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{schedule.title}</div>
                    <div className="text-sm text-secondary font-medium">{schedule.time}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{schedule.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nakshatra Vanam */}
        <div className="mb-16 bg-primary rounded-2xl border border-gray-200 p-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 bg-secondary/10 rounded-full mb-4">
              <Leaf className="w-5 h-5 text-secondary mr-2" />
              <span className="text-sm font-medium text-secondary">Sacred Grove</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nakshatra Vanam</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with your birth star through sacred trees. Each Nakshatra has an associated tree with unique spiritual benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div data-aos="fade-right">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">How to Participate</h3>
              <div className="space-y-4">
                {[
                  "Identify your Nakshatram (birth star)",
                  "Pray to your Nakshatra tree with sacred mantras",
                  "Plant or adopt a tree in the Vanam area",
                  "Receive blessings and spiritual guidance"
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-secondary/5 rounded-xl p-5 border border-secondary/20">
                <h4 className="font-medium text-gray-900 mb-2">Vanam Seva Timings</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-secondary" />
                    Morning: 7:00 AM – 11:00 AM
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-secondary" />
                    Evening: 4:00 PM – 6:30 PM
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-left">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="p-4 border-b border-gray-200">
                  <h4 className="font-medium text-gray-900">Featured Nakshatra Trees</h4>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {nakshatraTrees.slice(0, 8).map((tree, index) => (
                    <div 
                      key={index} 
                      className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">{tree.nakshatram}</div>
                        <div className="text-sm px-2 py-1 bg-secondary/10 text-secondary rounded">
                          {tree.tree.split('(')[0]}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{tree.benefit}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <Link to="/nakshatra-vanam" className="text-secondary hover:text-[#C2410C] font-medium text-sm flex items-center justify-center">
                    View All 27 Nakshatra Trees
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Annual Festivals */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Annual Festivals & Events</h2>
            <p className="text-gray-600">Major celebrations at our Ganapathi Temple</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                month: "Aug-Sep",
                festival: "Ganesh Chaturthi",
                desc: "10-day grand celebration of Lord Ganesha",
                color: "bg-orange-50 text-orange-700"
              },
              {
                month: "Jan",
                festival: "Sankranti",
                desc: "Harvest festival with special poojas",
                color: "bg-yellow-50 text-yellow-700"
              },
              {
                month: "Feb-Mar",
                festival: "Maha Shivaratri",
                desc: "Night-long Shiva worship",
                color: "bg-blue-50 text-blue-700"
              },
              {
                month: "Sep-Oct",
                festival: "Navaratri",
                desc: "9 nights of Goddess worship",
                color: "bg-purple-50 text-purple-700"
              },
              {
                month: "Oct-Nov",
                festival: "Diwali",
                desc: "Festival of lights",
                color: "bg-amber-50 text-amber-700"
              },
              {
                month: "Jul-Aug",
                festival: "Varalakshmi Vratam",
                desc: "Goddess Lakshmi worship",
                color: "bg-emerald-50 text-emerald-700"
              },
              {
                month: "Dec",
                festival: "Vaikunta Ekadashi",
                desc: "Special Vishnu worship",
                color: "bg-indigo-50 text-indigo-700"
              },
              {
                month: "Monthly",
                festival: "Sankashti Chaturthi",
                desc: "Monthly Ganesha fasting day",
                color: "bg-secondary/10 text-secondary"
              }
            ].map((festival, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-3 ${festival.color}`}>
                  {festival.month}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{festival.festival}</h3>
                <p className="text-sm text-gray-600">{festival.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to Reach */}
        <div ref={reachSectionRef} className="bg-primary rounded-2xl border border-gray-200 p-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Reach Temple</h2>
            <p className="text-gray-600">Easy access from all parts of the city</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">By Car/Taxi</h3>
                  <p className="text-gray-600 text-sm">
                    Located on Temple Road, Anakapalle. Ample parking available for 100+ vehicles.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bus className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">By Bus</h3>
                  <p className="text-gray-600 text-sm">
                    Nearest bus stop: Temple Junction (200m walk). Routes: 5K, 7D, 142 from all major stations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Train className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">By Metro</h3>
                  <p className="text-gray-600 text-sm">
                    Nearest metro: Parade Grounds Station (1km). Auto rickshaws available outside station.
                  </p>
                </div>
              </div>
            </div>

           <div className="lg:col-span-2">
  <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60816.84435847662!2d82.93623102167969!3d17.694967000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3970dbbd88ca97%3A0x1077f616bc709eae!2sAnakapalle!5e0!3m2!1sen!2sin!4v1770188312737!5m2!1sen!2sin"
      className="w-full h-[450px]"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>

    <div className="p-4 border-t border-gray-200">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-medium text-gray-900">
            Sri Chintamani Ganapati Datta Kshetra
          </div>
          <div className="text-sm text-gray-600">
            Sirasapally, NH-16, Opposite Tadi Railway Station,  
            Anakapalle Mandal, Anakapalle District
          </div>
        </div>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Sirasapally,+NH-16,+Opposite+Tadi+Railway+Station,+Anakapalle"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-[#C2410C] transition-colors"
        >
          Get Directions
        </a>
      </div>
    </div>
  </div>
</div>

          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="w-5 h-5 text-secondary" />
                <h3 className="font-medium text-gray-900">Phone</h3>
              </div>
              <div className="space-y-1">
                <div className="text-gray-700">+91 98765 43210</div>
                <div className="text-gray-700">+91 98765 43211</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-5 h-5 text-secondary" />
                <h3 className="font-medium text-gray-900">Email</h3>
              </div>
              <div className="space-y-1">
                <div className="text-gray-700">info@ganapathitemple.com</div>
                <div className="text-gray-700">donations@ganapathitemple.com</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-secondary" />
                <h3 className="font-medium text-gray-900">Office Hours</h3>
              </div>
              <div className="space-y-1">
                <div className="text-gray-700">8:00 AM - 8:00 PM</div>
                <div className="text-gray-700">Open all days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutTemple;