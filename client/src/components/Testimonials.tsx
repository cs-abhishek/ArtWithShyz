import React from "react"   
const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Aashka",
      role: "Customer",
      message: "thaankyouuu sm for making it with all love😘😘 Honestly, recommending your profile to everyone. My personal favourite 🥰🥹🥹",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Mike",
      role: "Client",
      message: "The digital art piece exceeded my expectations. The colors, composition, everything was perfect. Will definitely order again! �",
      image: "/images/customer2.png"
    },
    {
      id: 3,
      name: "Emma",
      role: "Customer",
      message: "The abstract canvas painting is now the centerpiece of my living room. Such incredible artistic vision and execution! �️�",
      image: "/images/customer3.png"
    },
    {
      id: 4,
      name: "Alex",
      role: "Art Enthusiast",
      message: "Received my custom art journal and it's absolutely beautiful! The attention to detail is remarkable. Highly recommend! 📚�",
      image: "/images/customer4.png"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What our customers say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-pink-50 rounded-2xl p-6 shadow-lg border border-pink-100">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 shadow-md">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-pink-600 text-sm font-medium">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-800 text-sm mb-4 leading-relaxed">{testimonial.message}</p>
              <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors font-semibold text-sm">
                Shop this Look
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
