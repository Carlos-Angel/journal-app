import React from 'react';

export const JournalEntry = () => {
  return (
    <div className='journal__entry pointer'>
      <div
        className='journal__entry-picture'
        style={{
          backgroundSize: 'cover',
          backgroundImage:
            'url(https://enfocando.es/wp-content/2016/08/Panorama_7490.jpg)',
        }}
      />
      <div className='journal__entry-body'>
        <p className='journal__entry-title'>titulo del journal</p>
        <p className='journal__entry-content'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className='journal__entry-date-box'>
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};
