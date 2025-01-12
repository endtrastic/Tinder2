import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap'; 
import './card.css';
import '../heart.css';

const Card = ({ nameList, descriptionList, imagesList, likeProfile }) => {
  const [profile, setProfile] = useState({
    name: '',
    name2: '',
    description: '',
    description2: '',
    description3: '',
    image: ''
  });

  const randomizeProfile = () => {
    const randomName = nameList[Math.floor(Math.random() * nameList.length)];
    const randomName2 = nameList[Math.floor(Math.random() * nameList.length)];
    const randomDescription = descriptionList[Math.floor(Math.random() * descriptionList.length)];
    const randomDescription2 = descriptionList[Math.floor(Math.random() * descriptionList.length)];
    const randomDescription3 = descriptionList[Math.floor(Math.random() * descriptionList.length)];
    const randomImage = imagesList[Math.floor(Math.random() * imagesList.length)];

    setProfile({
      name: randomName,
      name2: randomName2,
      description: randomDescription,
      description2: randomDescription2,
      description3: randomDescription3,
      image: randomImage
    });
  };

  const handleLike = () => {
    const newProfile = {
      name: `${profile.name}, ${profile.name2}`,
      description: `${profile.description}, ${profile.description2}, ${profile.description3}`,
      image: profile.image
    };

    likeProfile(newProfile); // Save 
    saveLikedProfile(newProfile); // Save to localStorage
    randomizeProfile(); // Randomize after liking

    triggerHeartAnimation();
  };
  // Grill me alive pls
  const saveLikedProfile = (profile) => {
    const likedProfiles = JSON.parse(localStorage.getItem('likedProfiles')) || [];
    likedProfiles.push(profile);
    localStorage.setItem('likedProfiles', JSON.stringify(likedProfiles)); // Save to localStorage
  };

  const triggerHeartAnimation = () => {
    const hearts = document.querySelectorAll('.heart-animation');

    hearts.forEach((heart) => {
      const randomX = Math.random() * (window.innerWidth - 750);
      const randomY = window.innerHeight;
      gsap.fromTo(
        heart,
        {
          opacity: 1,
          x: randomX,
          y: randomY,
          scale: 1,
        },
        {
          opacity: 0,
          scale: 1.5,
          y: -200,
          duration: 3,
          ease: 'power2.out',
        }
      );
    });
  };

  useEffect(() => {
    randomizeProfile();
  }, []);

  return (
    <div className="card">
      <img src={profile.image} alt="Profile" className="profile-image" />
      <h3>{profile.name}, {profile.name2}</h3>
      <p>{profile.description}. {profile.description2}. {profile.description3}</p>

      <div className="paddingForButton">
        <button className="button like" onClick={handleLike}>
          Like
        </button>
        <button className="button reject" onClick={randomizeProfile}>
          Reject
        </button>
      </div>
      <i class="fas fa-flag profile-icon" title="Report" for="report" onClick={randomizeProfile}></i>

      <div className="heart-animation">❤️</div>
      <div className="heart-animation">❤️</div>
      <div className="heart-animation">❤️</div>
      <div className="heart-animation">❤️</div>

    </div>
  );
};

export default Card;
