import "../styles/ExperienceCard.css";
import { useState } from "react";

export default function ExperienceCard({ role, companyPeriod, description, imageLeft = true, image }) {
  const [showPreview, setShowPreview] = useState(false);

  const isCertificateImage = image && (image.includes("HydraMed-Certificate") || image.includes("WebDiner-Certificate"));
  const isImage = image && !image.endsWith('.pdf');

  return (
    <div
      className={`experience-card experience-highlight grid grid-cols-1 border-4 border-retro-green bg-black/40 ${
        imageLeft ? "md:grid-cols-[35%_65%]" : "md:grid-cols-[65%_35%]"
      }`}
    >
      <div
        className={`experience-card__media experience-highlight p-6 md:p-8 flex items-center justify-center border-b-2 md:border-b-0 border-retro-green ${
          imageLeft ? "md:border-r md:order-1" : "md:border-l md:order-2"
        }`}
      >
        <div className="experience-highlight w-full h-56 md:h-full bg-retro-green/5 flex items-center justify-center">
          {image ? (
            image.endsWith('.pdf') ? (
              <div style={{ width: '100%', aspectRatio: '16/9', maxWidth: 600 }} className="flex justify-center items-center">
                <embed src={image} type="application/pdf" style={{ width: '100%', height: '100%', border: 'none', display: 'block' }} />
              </div>
            ) : (
              <>
                <img
                  src={image}
                  alt={role}
                  className={isCertificateImage ? "object-contain max-h-full max-w-[300px] w-full cursor-pointer" : "object-contain max-h-full max-w-full cursor-pointer"}
                  onClick={() => setShowPreview(true)}
                  tabIndex={0}
                  style={{ outline: 'none' }}
                />
                {showPreview && (
                  <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    onClick={() => setShowPreview(false)}
                    onKeyDown={e => { if (e.key === 'Escape') setShowPreview(false); }}
                    tabIndex={-1}
                  >
                    <img
                      src={image}
                      alt={role}
                      className="max-h-[90vh] max-w-[90vw] rounded shadow-lg border-4 border-retro-green"
                      onClick={e => e.stopPropagation()}
                    />
                    <button
                      className="absolute top-6 right-8 text-white text-3xl font-bold bg-black/60 rounded-full px-4 py-2 border-2 border-retro-green hover:bg-retro-green hover:text-black transition"
                      onClick={() => setShowPreview(false)}
                      style={{ zIndex: 60 }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </>
            )
          ) : (
            <span className="text-retro-green/30 text-sm">{"// EXPERIENCE IMAGE"}</span>
          )}
        </div>
      </div>

      <div className={imageLeft ? "p-6 md:p-8 md:order-2" : "p-6 md:p-8 md:order-1"}>
        <h3 className="text-retro-green text-2xl mb-2">{role}</h3>
        <p className="text-retro-green/70 text-sm mb-5">{companyPeriod}</p>
        <p className="text-retro-green/80 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}