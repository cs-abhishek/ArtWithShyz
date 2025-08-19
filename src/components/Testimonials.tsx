import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah",
      role: "Art Collector",
      message: "The custom portrait was absolutely stunning! Shyz captured every detail perfectly. Amazing talent and professionalism! 🎨✨",
      image: "/images/customer1.png"
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
            <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-pink-600 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">{testimonial.message}</p>
              <button className="text-pink-600 hover:text-pink-700 font-semibold text-sm">
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
