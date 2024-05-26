// import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import React, { useEffect, useState } from 'react';
import app from './firebaseConfig';
import { getDatabase, ref, child, get, update } from 'firebase/database';
import './App.css';

import profileIcon from './Images/profile-icon.jpg'

const db = getDatabase(app);

const App = () => {
  
  const [Day1, setDay1] = useState();
  const [Day2, setDay2] = useState();
  const [Day3, setDay3] = useState();
  const [Day4, setDay4] = useState();
  const [Day5, setDay5] = useState();
  const [Green, setGreen] = useState();
  const [Orange, setOrange] = useState();
  const [Yellow, setYellow] = useState();

  let id, green, orange, yellow, yesterday, day1, day2, day3, day4, day5;

  const todayDate = new Date();
  const date =
    todayDate.getDate() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getFullYear();
  // console.log(date);

  const retriveData = async () => {
    try {
      const dbref = ref(db);
      const snapshot = await get(child(dbref, 'today/'));
      if (snapshot.exists()) {
        id = snapshot.val().id;
        green = snapshot.val().green;
        orange = snapshot.val().orange;
        yellow = snapshot.val().yellow;
        yesterday = snapshot.val().yesterday;
  
        // console.log(id);
  
        if (date === id) {
          // console.log('Date is same');
        } else {
          // console.log('Date is not same');
          await changeData();
        }
      } else {
        console.log('Student does not exist');
      }
    } catch (error) {
      // alert('Unsuccessful - ' + error);
      console.log(error);
    }
  };
  
  const prevRetriveData = async () => {
    try {
      const dbref = ref(db);
      const snapshot = await get(child(dbref, 'PrevDays/'));
      if (snapshot.exists()) {
        day1 = snapshot.val().day1;
        day2 = snapshot.val().day2;
        day3 = snapshot.val().day3;
        day4 = snapshot.val().day4;
        day5 = snapshot.val().day5;
        
        // console.log(day1, day2, day3, day4, day5);
      }
    } catch (error) {
      // alert('Unsuccessful - ' + error);
      console.log(error);
    }
  };
  
  const updatePrevData = async () => {
    try {
      await update(ref(db, 'PrevDays/'), {
        day5: day4,
        day4: day3,
        day3: day2,
        day2: day1,
        day1: yesterday,
      });
      // alert('Data updated successfully');
      // console.log('Data updated successfully');
  
      await update(ref(db, 'today/'), {
        id: date,
      });
      // alert('Date updated successfully');
      // console.log('Date updated successfully');
    } catch (error) {
      // alert('Unsuccessful - ' + error);
      console.log(error);
    }
  };
  
  const changeData = async () => {
    await prevRetriveData();
    await updatePrevData();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        await retriveData();
        await prevRetriveData();

        setDay1(day1);
        setDay2(day2);
        setDay3(day3);
        setDay4(day4);
        setDay5(day5);
        setGreen(green);
        setOrange(orange);
        setYellow(yellow);

      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  });
 

  return <div > 
    
    <div className="nav">
      <p className='logo-name'>Dashboard . . </p>
      <img src={profileIcon} alt="profile" className='profile_icon' />
    </div>

    <div className="currInfo">
      <div className="box">
        <div className="sep orange">{Orange}</div>
        <p className='desc'>Count of Orange colour orange</p>
      </div>

      <div className="box">
        <div className="sep green">{Green}</div>
          <p className='desc'>Count of Green colour orange</p>
        </div>

      <div className="box">
        <div className="sep yellow">{Yellow}</div>
          <p className='desc'>Count of Yellow colour orange</p>
        </div>
    </div>

    <div className="total">
      <p className="show-total">Total Count of Oranges : {Orange + Green + Yellow}</p>
    </div>

    <div className="prev">
      <h3 className="heading">Previous Days Count</h3>
      <div className="row">
        <p className="day">Day 1 </p>
        <p className="data">{Day1}</p>
      </div>
      <div className="row">
        <p className="day">Day 2 </p>
        <p className="data">{Day2}</p>
      </div>
      <div className="row">
        <p className="day">Day 3 </p>
        <p className="data">{Day3}</p>
      </div>
      <div className="row">
        <p className="day">Day 4 </p>
        <p className="data">{Day4}</p>
      </div>
      <div className="row">
        <p className="day">Day 5 </p>
        <p className="data">{Day5}</p>
      </div>
    </div>

    <footer>
    <p>Created By <a href="https://github.com/vedantsonar">@vedant_sonar_</a></p>
  </footer>

  </div>
};

export default App;
