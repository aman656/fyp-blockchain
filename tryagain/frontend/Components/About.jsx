import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Abouts.css";
import { useEffect, useRef } from 'react';
import img from '../Assets/Images/flag.webp'
const AboutUs = () => {
  const animatedRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const element = animatedRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.75) {
        element.classList.add('animate');
      } else {
        element.classList.remove('animate');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={animatedRef} className="animated-componentA">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="right-div">
              <h2>Needs and Benefits</h2>
              <p>
                E-voting, or electronic voting, is a modern approach to the
                traditional voting system that leverages digital technology for
                the electoral process. The primary need for e-voting arises from
                the desire to streamline and enhance the democratic process. It
                introduces efficiency by reducing manual errors, ensuring faster
                results, and minimizing logistical challenges associated with
                traditional voting methods. One of the significant benefits of
                e-voting is increased accessibility. It enables remote voting,
                allowing citizens to participate in elections without the need
                to physically visit polling stations. This inclusivity is
                particularly beneficial for individuals with disabilities, the
                elderly, and those living in remote areas. Moreover, e-voting
                enhances the accuracy of the electoral process. Automated
                systems reduce the likelihood of errors in vote counting,
                ensuring a more reliable representation of the electorate's
                will. Additionally, the speed of result tabulation contributes
                to timely outcomes, fostering trust in the electoral system.
                While e-voting presents opportunities for efficiency and
                inclusivity, it is essential to address cybersecurity concerns
                and ensure the protection of the voting process's integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;