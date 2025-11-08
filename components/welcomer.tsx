import React from "react";
import { FaUser, FaPeopleArrows, FaGoogle, FaMicrosoft } from "react-icons/fa";

const Welcomer = () => {
  const cards = [
    {
      title: "Google",
      description: "Frontend Developer",
      icon: <FaGoogle className="text-cyan-600" />,
      buttonText: "Apply",
    },
    {
      title: "Microsoft",
      description: "Backend Developer",
      icon: <FaMicrosoft className="text-cyan-600" />,
      buttonText: "Apply",
    },
    {
      title: "Apple",
      description: "Systems Analyst",
      icon: <FaUser className="text-cyan-600" />,
      buttonText: "Apply",
    },
  ];

  return (
    <div className="mt-2">
    <div className="flex justify-between">
    <h3>Latest</h3>
    <h3 className="hover:underline cursor-pointer">View All</h3>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex flex-col border rounded-lg p-3 gap-2 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 w-12 h-9 rounded-full flex items-center justify-center text-lg">
              {card.icon}
            </div>
            <div>
              <h3 className="font-semibold text-base">{card.title}</h3>
              <p className="text-sm text-white">{card.description}</p>
            </div>
          </div>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-md transition-colors">
            {card.buttonText}
          </button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Welcomer;
