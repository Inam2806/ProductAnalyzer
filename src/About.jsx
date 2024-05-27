import React from 'react';
import './style/About.scss';
import work_1 from './images/work-1.png';
import work_2 from './images/work-2.png';
import work_3 from './images/work-3_1.png';

import user from './images/user.jpg';
const About = () => {

    const openTab = (event, tabName) => {
        const tabLinks = document.getElementsByClassName('tab-links');
        const tabContents = document.getElementsByClassName('tab-contents');

        for (const tabLink of tabLinks) {
            tabLink.classList.remove('active-link');
        }
        for (const tabContent of tabContents) {
            tabContent.classList.remove('active-tab');
        }
        event.currentTarget.classList.add('active-link');
        document.getElementById(tabName).classList.add('active-tab');
    };

return (
        <div className='about'>
        <div id="header" >
  <div className="container">
    <nav>
      <i className="fas fa-bars"></i>
      <div className="header-text">
        <p className="profession">Passionate Programmer</p>
                        <div className='header-text-1'>
          <p >Hi, I'm <span>Inam ul Haque</span> <br /> a Creative Developer from India</p>
        </div>
      </div>
    </nav>
  </div>
</div>


     {/* ----------ABOUT---------- */}
     <div id="About">
    <div className="container">
        <div className="row">
            <div className="about-col-1">
                <img src={user} alt="User" />
            </div>
            <div className="about-col-2">
                <h1 className="sub-title">About Me</h1>
                <p>I am currently in the 4th year, pursuing my B.Tech degree from <a className="none" href="http://nsut.ac.in/">Netaji Subhas University of Technology (NSUT)</a>, Delhi, India.
                    <br />
                    I am a student of the Department of Information Technology at NSUT.
                    <br />
                    I am a C++ Programmer, Web Developer.</p>
                <div className="tab-titles">
                    <p className="tab-links active-link" onClick={(e) => openTab(e, 'skills')}>
                        Skills
                    </p>
                    <p className="tab-links" onClick={(e) => openTab(e, 'education')}>
                        Education
                    </p>
                </div>
                <div className="tab-contents active-tab" id="skills">
                    <ul>
                        <li><span>Programmer/Coder</span><br />Data Structure and Algorithm</li>
                        <li><span>Web Development</span><br />Web app Development</li>
                    </ul>
                </div>

                <div className="tab-contents" id="education">
                    <ul>
                        <li><span>2017</span><br />10th (K.D field Public School,Delhi) </li>
                        <li><span>2019</span><br />12th (Sandhya Sr. Sec. Public School,Delhi)   </li>
                        <li><span>2020-2024</span><br />Pursuing B.Tech (Netaji Subhas University of Technology,Delhi)</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="Portfolio">
    <div className="container">
        <h1 className="sub-title">My Works</h1>
        <div className="work-list">
            <div className="work">
                <img src={work_1} alt="" />
                <div className="layer">
                    <h2>Music Website</h2>
                    <p></p>
                    <a href="https://inam2806.github.io/Musicwebsite/" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
            <div className="work">
                <img src={work_2} alt="" />
                <div className="layer">
                    <h2>Bookshop Website</h2>
                    <p></p>
                    <a href="https://inam2806.github.io/pdf-books-shop/" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
            <div className="work">
                <img src={work_3} alt="" className='work-3' />
                <div className="layer">
                    <h2>Chat Application Website</h2>
                    <p></p>
                    <a href="http://chat-toon.netlify.app" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </div>
        
    </div>
</div>


        <div id="Contact">
    <div className="container">
        <div className="row">
            <div className="contact-left">
                <h1 className="sub-title">Contact Me</h1>
                <p><i className="fas fa-paper-plane"></i> inamulhaque952@gmail.com</p>
                <p><i className="fas fa-phone-square-alt"></i>(+91)8529742747</p>
                <div className="social-icons">
                    <a href="https://www.facebook.com/Inamulhaque2806" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}><i className="fa fa-facebook"></i></a>
                    <a href="https://www.instagram.com/inam_ul_haque_" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}><i className="fa fa-instagram"></i></a>
                    <a href="https://twitter.com/Inam2806 " target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}><i className="fa fa-twitter"></i></a>
                    <a href="https://www.linkedin.com/in/inamul-haque-3844a81a0/" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}><i className="fa fa-linkedin"></i></a>
                </div>
            </div>
            <div className="contact-right">
                <form action="https://formspree.io/f/meqyezna" method="POST">
                    <input type="text" name="Name" placeholder="Your Name" required />
                    <input type="email" name="Email" placeholder="Your Email" required />
                    <textarea name="Message" rows="6" placeholder="Your Message"></textarea>
                    <button type="submit" className="btn btn3">Submit</button>
                </form>
            </div>
        </div>
    </div>

</div>

   
    </div>
  );
};

export default About;
