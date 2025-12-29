
import React from 'react';

const Header: React.FC = () => {
  // Updated to a widely accessible and stable version of the EMRS logo
  const logoUrl = "https://emrs.tribal.gov.in/img/logo.png";

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-8 border-b-2 border-slate-800 pb-8 pt-4">
      {/* Left Logo */}
      <div className="flex-shrink-0">
        <img 
          src={logoUrl} 
          alt="EMRS Logo Left" 
          className="h-20 w-20 md:h-28 md:w-28 object-contain drop-shadow-md"
          onError={(e) => {
            // Fallback to a secondary source if the primary fails
            (e.target as HTMLImageElement).src = "https://tribal.nic.in/EMRS/images/logo.png";
          }}
        />
      </div>
      
      {/* Central Title Block */}
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-blue-900 uppercase leading-tight">
          EMRS KONCHUR
        </h1>
        <div className="h-1.5 w-32 bg-red-600 mx-auto my-3 rounded-full shadow-sm"></div>
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 uppercase tracking-widest mb-1">
          ACADEMIC MANAGEMENT PORTAL
        </h2>
        <p className="text-slate-600 font-bold text-xs md:text-base uppercase tracking-wider">
          Eklavya Model Residential School, Konchur, Karnataka
        </p>
        <p className="text-slate-400 text-[10px] md:text-xs font-semibold mt-2 border-t border-slate-200 pt-2 inline-block">
          NESTS - MINISTRY OF TRIBAL AFFAIRS, GOVT. OF INDIA
        </p>
      </div>

      {/* Right Logo */}
      <div className="flex-shrink-0">
        <img 
          src={logoUrl} 
          alt="EMRS Logo Right" 
          className="h-20 w-20 md:h-28 md:w-28 object-contain drop-shadow-md"
          onError={(e) => {
            // Fallback to a secondary source if the primary fails
            (e.target as HTMLImageElement).src = "https://tribal.nic.in/EMRS/images/logo.png";
          }}
        />
      </div>
    </div>
  );
};

export default Header;
