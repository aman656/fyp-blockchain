import React from "react";
import "./Footer.css";
import img from "../Assets/Images/vote.png";
const Footer = () => {
    return (
        <footer className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-4">
                    <img src={img} alt="Footer Logo" className="img-fluid" />
                </div>

                <div className="col-md-4 footer-col2">
                    <h5>Instruction</h5>
                    <p>
                        cybersecurity concerns and ensure the protection of the voting
                        process's integrity.duce the likelihood of errors in vote counting,
                        ensuring a more reliable representation of the electorate's will.
                        Additionally, the speed of result tabulation contributes to timely
                        outcomes, fostering trust in the electoral system. While e-voting
                        presents opportunities for efficiency and inclusivity, it is
                        essential to address cybersecurity concerns and ensure the
                        protection of the voting process's integrity.
                    </p>
                </div>

                <div className="col-md-4 footer-col3">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li>
                            <a href="#!">Link 1</a>
                        </li>
                        <li>
                            <a href="#!">Link 2</a>
                        </li>
                        <li>
                            <a href="#!">Link 3</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-4">
                <p className="mb-0">All rights reserved | Copyright &copy; 2023</p>
            </div>
        </footer>
    );
};

export default Footer;