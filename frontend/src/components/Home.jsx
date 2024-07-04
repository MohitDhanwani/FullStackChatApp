import React, { useEffect } from 'react';
import "../style/home.css";
import { FaUserCircle } from 'react-icons/fa';
import { GiRobotAntennas } from 'react-icons/gi'; 
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function Home() {

    const navigate = useNavigate();
    useGSAP(() => {
        gsap.from(".main-heading", {
            y: -100,
            duration: 0.8,
            opacity: 0,
        });

        gsap.from(".message", {
            opacity: 0,
            stagger: 0.75,
            scrollTrigger: {
                trigger: ".outer-chat-container",
                start: "top 85%"
            }
        });

        gsap.from(".outer-chat-container", {
            opacity: 0,
            scrollTrigger: {
                trigger: ".outer-chat-container",
                start: "top 80%"
            }
        });
    });

    return (
        <>
            <div className="home-heading-container">
                <div className="main-heading">ChatHub: Your Digital Hangout</div>
                <div className="subheading">
                    <Typewriter
                        options={{
                            strings: ["Typing..."],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>

            <div className="outer-chat-container">
                <div className="Chat-container">
                    <div className="alex">
                        <div className='message'>
                            <FaUserCircle className="icon" />
                            Hey, Jamie! Have you heard about ChatHub?
                        </div>
                    </div>

                    <div className="jamie">
                        <div className='message'>
                            <GiRobotAntennas className="icon" />
                            No, I haven't. What is it?
                        </div>
                    </div>

                    <div className="alex">
                        <div className='message'>
                            <FaUserCircle className="icon" />
                            It's this amazing new chat application I've been using.<br /> It makes staying in touch with friends so much easier!
                        </div>
                    </div>

                    <div className="jamie">
                        <div className='message'>
                            <GiRobotAntennas className="icon" />
                            Really? What makes it different from other chat apps?
                        </div>
                    </div>

                    <div className="alex">
                        <div className='message'>
                            <FaUserCircle className="icon" />
                            For starters, the interface is super user-friendly.<br />Plus, it has some cool features. You can even create<br /> chat groups easily for different activities or projects.
                        </div>
                    </div>

                    <div className="jamie">
                        <div className='message'>
                            <GiRobotAntennas className="icon" />
                            That sounds interesting. But is it secure?<br /> I'm always concerned about privacy.
                        </div>
                    </div>

                    <div className="alex">
                        <div className='message'>
                            <FaUserCircle className="icon" />
                            Absolutely! ChatHub has strong encryption, so your conversations are <br /> private and secure.I've been using it for a few weeks, and I love it. <br />You should definitely give it a try!
                        </div>
                    </div>

                    <div className="jamie">
                        <div className='message'>
                            <GiRobotAntennas className="icon" />
                            Okay, you've convinced me!<br /> I'll download ChatHub and check it out.<br /> Thanks for the recommendation!
                        </div>
                    </div>
                </div>
            </div>

            <div className="home-btn-container">
                <button onClick={e => navigate('/rooms')} className='chat-btn'>Chat Now</button>
            </div>
        </>
    );
}

export default Home;
