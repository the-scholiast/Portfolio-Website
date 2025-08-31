import React from "react";
import type { Card } from "../data";

interface AboutDetailProp { card: Card }

const AboutDetail: React.FC<AboutDetailProp> = ({ card }) => {
  return (
    <>
      {card.hobbies && card.hobbies.length > 0 && (
        card.hobbies.map((hobby, index) => (
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-1 rounded mb-2 flex-shrink-0">
            <div className="flex justify-center items-center">
              <span key={index} className="text-xs font-bold">{hobby}</span>
            </div>
          </div>
        ))
      )}

      {card.yearsOfExperience && (
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-1 rounded mb-2 flex-shrink-0">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold">STATUS:</span>
            <span className="text-xs">{card.yearsOfExperience}</span>
          </div>
        </div>
      )}
      
      {card.field && (
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-1 rounded mb-2 flex-shrink-0">
          <div className="flex justify-center items-center">
            <span className="text-xs font-bold">{card.field}</span>
          </div>
        </div>
      )}

      {card.employer && (
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-1 rounded mb-2 flex-shrink-0">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold">EMPLOYER:</span>
            <span className="text-xs">{card.employer}</span>
          </div>
        </div>
      )}

    </>
  )
}

export default AboutDetail;