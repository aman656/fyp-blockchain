import React from "react";
import "./Abouts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useRef, useEffect } from "react";

const Abouts = () => {
  const animatedRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const element = animatedRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.75) {
        element.classList.add("animate");
      } else {
        element.classList.remove("animate");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={animatedRef} className="animated-componentAS">
      <section id="about" className="container about-main">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="about-text">
              <h1>Election security you can rely on</h1>
              <p>
                Election security you can rely on assures the integrity of
                democratic processes. With robust measures, such as encrypted
                systems, voter verification, and audit trails, it safeguards
                against manipulation and fraud. A trustworthy electoral system
                promotes public confidence, ensuring that every vote is
                accurately counted, preserving the foundation of democracy.
                <br /> <br />
                <ul>
                  <li>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      size="1x"
                      className="ab-icon"
                    />
                    <strong>Safeguard organizational data.</strong>Our cybersecurity
                    measures protect your data.
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      size="1x"
                      className="ab-icon"
                    />
                    <strong>Eliminate the risk of double voting and voter fraud. </strong>Closed voting events enable trustworthy decision-making.
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      size="1x"
                      className="ab-icon"
                    />
                    <strong>Vote integrity.</strong>Our robust auditing tools let you demonstrate an accountable voting process.
                  </li>
                </ul>
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="about-circle">
              <p className="about-circle-text">
                <span className="about-number">E</span>voting
                <br /> Take Charge of Your Vote
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Abouts;