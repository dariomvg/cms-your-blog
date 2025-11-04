"use client";
import { useState } from "react";
import iconArrowTop from "@/assets/arrow-up.svg";
import iconArrowBottom from "@/assets/arrow-down.svg";
import "@/styles/select-topics.css";
import { topics } from "@/utils/topics";

export const SelectTopics = ({
  topic,
  changeTopic,
}: {
  topic: string;
  changeTopic: (topic: string) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const chooseTopic = (name: string) => {
    changeTopic(name);
    setOpen(false);
  };

  return (
    <section className="section-topics">
      <div className="container-topics">
        <strong className="title-container-topics">
          {topic ? topic : "Temas"}
        </strong>

        <img
          src={open ? iconArrowTop.src : iconArrowBottom.src}
          alt="icon arrow select"
          width="26"
          height="26"
          className="icon-arrow-topics"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className={`list-topics ${open ? "open-list-topics" : ""}`}>
        {topics.map(({ id, name }) => (
          <button
            key={id}
            className="button-list-topics"
            onClick={() => chooseTopic(name)}>
            {name}
          </button>
        ))}
      </div>
    </section>
  );
};
