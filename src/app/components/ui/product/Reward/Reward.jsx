import React from 'react'
import './Reward.css'

const Reward = ({star}) => {
  const reward = 4.4;
  const reviews = 9859;
  const thousands = reviews > 999 ? Math.floor(reviews / 1000) : ''; 
  const remainder = reviews < 1000 ? reviews : `${(reviews % 1000)}`.padStart(3, '0');

  const percent = `${(reward / 5) * 100}%`;
  
  return (
    <div className='Reward'>
      <div className={star ? 'Reward__star': 'none-star'}>
        <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.6942 8.2918H23.4127L16.3593 13.4164L19.0534 21.7082L12 16.5836L4.94658 21.7082L7.64074 13.4164L0.587322 8.2918H9.30583L12 0Z" fill="url('#RewardGradient')"/>
          <linearGradient id="RewardGradient">
            <stop offset="" stop-color="#000000" />
            <stop offset={percent} stop-color="#000000" />
            <stop offset={percent} stop-color="#B6B6B6" />
            <stop offset="100%" stop-color="#B6B6B6" />
          </linearGradient>
        </svg>
      </div>
      <div className='Reward_numbers'>{`${reward} / ${thousands} ${remainder} reviews`}</div>
    </div>
  )
}

export default Reward