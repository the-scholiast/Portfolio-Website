import React from "react";
import type { Card } from "../data";

interface SkillsDetailProp { card: Card }

const SkillsDetail: React.FC<SkillsDetailProp> = ({ card }) => {
  return (
    <>
      {/* Level stats with stars */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-1 rounded mb-2 flex-shrink-0">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold">LEVEL:</span>
          <div className="flex">
            {/* Full Stars */}
            {Array.from({ length: Math.floor(card.proficiency || 0) }, (_, index) => (
              <span key={`full-${index}`} className="text-xs text-yellow-300">
                ⭐
              </span>
            ))}

            {/* Half Star (if decimal exists) */}
            {(card.proficiency || 0) % 1 === 0.5 && (
              <div key="half" className="relative inline-block text-xs overflow-hidden w-[10px]">
                <span className="text-yellow-300">⭐</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Years of experience */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-1 rounded mb-2 flex-shrink-0">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold">EXPERIENCE:</span>
          <span className="text-xs">{card.yearsOfExperience}</span>
        </div>
      </div>

      {/* Status */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-1 rounded mb-2 flex-shrink-0">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold">STATUS:</span>
          <span className="text-xs">{card.status}</span>
        </div>
      </div>
    </>
  )
}

export default SkillsDetail;