import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';

import { fetchReminders, remindersState } from '../slices/reminders';
import { clearMessage } from '../slices/message';
import EventBus from '../common/EventBus';

const Reminders = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  const { status, entities: reminders } = useSelector(remindersState);

  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchReminders());
    }
  }, []);

  useEffect(() => {
    if (message === 'Sorry, your token has expired. Please login to continue.') {
      EventBus.dispatch('logout');
    }
  }, [message]);

  // const remindersContent = Object.keys(reminders).map((year) => (
  //   <li key={year}>
  //     <p>{year}</p>
  //     {Object.keys(year).map((month) => (
  //       <li key={month}>
  //         <p>{month}</p>
  //         {Object.keys(month).map((date) => (
  //           <li key={date}>
  //             <p>{date}</p>

  //           </li>
  //         ))}
  //       </li>
  //     ))}
  //   </li>
  //   )
  // );

  // const remindersList = remindersContent;

  // const remindersList = reminders.map((el) => (
  //   <li >
  //     <p>Hello</p>
  //     {/* <p>{Object.keys(arr)[i]}</p> */}
  //     {/* {Object.keys(reminders[year]).map((month) => (
  //       <li key={month}>
  //         <p>{month}</p>
  //         {Object.keys(reminders[year][month]).map((date) => (
  //           <li key={date}>
  //             <p>{date}</p>
  //               <p>HI!</p>
  //           </li>
  //         ))}
  //       </li>
  //     ))} */}
  //   </li>
  // ));
  // {
  // currentReminder: new Date().toISOString().split('T')[0],

  // return (

  //       <div className="table-responsive-lg">
  //         <table className="table table-hover table-sm">
  //           <tbody>
  //             <tr key={r.id}>
  //               <td>Today</td>
  //             </tr>
  //             <tr
  //               className={(isSameDate === 'older') ? 'd-none' : 'table-row'}
  //               key={r.id}
  //             >
  //               <td>{r.description}</td>
  //               <td>{r.city}</td>
  //               <td>rainy</td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </div>
  //     // <>
  //     //   <tr className={(isSameDate === 'older') ? 'd-none' : 'd-row'} key={r.id}>
  //     //     <td>Today</td>
  //     //   </tr>
  //     //   <tr
  //     //     className={(isSameDate === 'older') ? 'd-none' : 'table-row'}
  //     //     key={r.id}
  //     //   >
  //     //     <td>{r.description}</td>
  //     //     <td>{r.city}</td>
  //     //     <td>rainy</td>
  //     //   </tr>
  //     // </>
  //   )

  // };
  // reminders.map((r) => (
  //   <tr
  //     className={(new Date(r.datetime) < new Date(Date.now())) ? 'd-none' : 'table-row'}
  //     key={r.id}
  //   >
  //     <td>{r.description}</td>
  //     <td>{r.city}</td>
  //     <td>rainy</td>
  //   </tr>
  // ));

  return (
    <div className="container px-1">
      <header className="jumbotron">
        <h3>
          Reminders
        </h3>
      </header>
      {(status === 'pending' && (
        <p>Loading Content</p>
      ))
        || (status === 'fulfilled' && (
          reminders.map((year) => {
            const { id, months } = year;
            return (
              <ul key={id}>
                <p>{id}</p>

                {months.map((month) => {
                  const { id, dates } = month;

                  return (
                    <ul key={id}>
                      <p>{id}</p>
                      {dates.map((date) => {
                        const { id, reminders } = date;

                        return (
                          <div key={id} className="table-responsive-lg">
                            <table className="table table-hover table-sm">
                              <caption>{id}</caption>
                              <tbody>
                                {reminders.map((reminder) => {
                                  const {
                                    id, description, city,
                                    time, location_coordinates: coordinates,
                                  } = reminder;

                                  return (
                                    <tr key={id}>
                                      <td>{time}</td>
                                      <td>{description}</td>
                                      <td>{city}</td>
                                      <td>{coordinates}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        );
                      })}
                    </ul>
                  );
                })}
              </ul>
            );
          })
        ))}
    </div>
  );
};

export default Reminders;
