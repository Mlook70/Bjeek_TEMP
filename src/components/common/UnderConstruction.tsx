export default function UnderConstruction() {
  return (
    <section 
      className="min-h-screen relative flex items-center justify-center px-6 text-center"
      style={{
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 opacity-90"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white">
          <span className="block mb-4">بجيك</span>
          <span className="text-[#A5CD39]">قيد الإنشاء</span>
        </h2>

        <p className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed text-white">
          نعمل على تقديم تجربة مميزة لك. سنعود قريباً بتصميم جديد ومزايا رائعة!
        </p>

        {/* Dots animation */}
        <div className="flex justify-center items-center space-x-3 rtl:space-x-reverse">
          <div className="w-4 h-4 bg-[#A5CD39] rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-[#A5CD39] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-4 h-4 bg-[#A5CD39] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </section>
  );
}
