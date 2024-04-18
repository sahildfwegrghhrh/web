import React, { useState } from 'react';
import axios from 'axios';

function Get() {

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [company, setCompany] = useState('');
  const [web, setWeb] = useState('');
  const [scheduleCall, setScheduleCall] = useState(false);
  const [message, setMessage] = useState('');

  const upload = async (e) => {
    e.preventDefault();

    if (!first || !last || !email || !number || !company || !web || !scheduleCall) {
      setMessage('Please fill in all fields.');
      return;
    }

    console.log('Submitting form data:', { first, last, email, number, company, web });

    try {
      const res = await axios.post('/register', {
        first,
        last,
        email,
        number,
        company,
        web,
      });

      console.log('Response:', res);

      if (res.data.status === 'success') {
        console.log('Email sent successfully');
        setMessage('Email sent successfully');
        setFirst('');
        setLast('');
        setEmail('');
        setNumber('');
        setCompany('');
        setWeb('');
        setScheduleCall(true);
      } else {
        console.error('Error sending email');
        setMessage('Error sending email');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      setMessage('Error sending email');
    }
  };

  return (
    <>
      <div className='long-pp'>
        <div className='wrapper'>
          <div className='thing'>
            <div className='tag'>
              <div className='begin-to'>
                <div className='beg-to'>
                  <div className='here-pp'>

                    
                  </div>
                </div>
                <form>
                  <div className='your-to'>
                    <div className='port-t'>
                      <div className='repot'>
                        <div className='index'>
                          <label>First Name</label>
                          <br />
                          <input
                            type='text'
                            placeholder='First Name'

                            value={first}
                            onChange={(e) => setFirst(e.target.value.replace(/[^a-z]/gi, ''))}
                          ></input>{' '}
                          <br />
                          <br />
                          <label>Email</label>
                          <br />
                          <input
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                          ></input>{' '}
                          <br />
                          <br />
                          <label>Company Name</label>
                          <br />
                          <input
                            type='text'
                            placeholder='Company Name'
                            value={company}
                            onChange={(e) => setCompany(e.target.value.replace(/[^a-z]/gi, ''))}
                          ></input>{' '}
                          <br />
                          <br />
                        </div>
                        <div className='logy'>
                          <label>Last Name</label>
                          <br />
                          <input
                            type='text'
                            placeholder='Last Name'
                            value={last}
                            onChange={(e) => setLast(e.target.value.replace(/[^a-z]/gi, ''))}
                          ></input>{' '}
                          <br />
                          <br />
                          <label>Phone Number</label>
                          <br />
                          <input
                            type='text'
                            placeholder='Phone Number'
                            value={number}
                            onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, ''))}

                          />
                          {' '}
                          <br />
                          <br />
                          <label>Website Url</label>
                          <br />
                          <input
                            type='text'
                            placeholder='Website Url'
                            value={web}
                            onChange={(e) => setWeb(e.target.value.replace(/[^a-z]/gi, ''))}
                          ></input>{' '}
                          <br />
                        </div>
                      </div>
                      <div className='color-io'>
                        <input
                          type='checkbox'
                          onChange={() => setScheduleCall(!scheduleCall)}
                          checked={scheduleCall}

                        />
                        <p>
                          I'd like to Schedule a call to discuss this before we
                          start.
                        </p>
                      </div>
                      <button onClick={upload} id='call-ui'>
                        Get Started
                      </button>
                      {message && <p style={{ color: "red" }}>{message}</p>}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Get;


