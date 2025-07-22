import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Result() {
  let navigation = useNavigate();
  const [data1, setData1] = useState(JSON.parse(localStorage.getItem("personalInfo")));
  const [data2, setData2] = useState(JSON.parse(localStorage.getItem("weightGoal")));
  const [data3, setData3] = useState(JSON.parse(localStorage.getItem("physicalActivity")));
  const [bmr, setBMR] = useState();
  const [calorie, setCalorie] = useState();

  const previousbtn = () => {
    navigation("/Weight")
  }

  const poundsToKilograms = () => {
    return data1.weight * 0.453592;
  };

  const feetToCentimeters = () => {
    const totalInches = data1.height * 12 + data1.inch;
    return totalInches * 2.54;
  };

  useEffect(() => {
    let unit = localStorage.getItem("unitSelection1")
    if (unit !== 'kg.') {
      const weightInKg = poundsToKilograms();
      const heightInCm = feetToCentimeters();
      const updatedData1 = { ...data1, weight: Math.round(weightInKg), centimeter: Math.round(heightInCm) };
      if (data1.sex === "male") {
        calculateBMRMen(updatedData1);
      } else {
        calculateBMRWoMen(updatedData1);
      }
    }


    else {
      const updatedData1 = { ...data1 };

      if (data1.sex === "male") {
        calculateBMRMen(updatedData1);
      } else {
        calculateBMRWoMen(updatedData1);
      }
    }

  }, []);


  const calculateBMRMen = (data) => {
    const bmr1 = (10 * data.weight) + (6.25 * data.centimeter) - (5 * data.age) + 5
    setBMR(bmr1);
    Calorie(bmr1)
  }

  const calculateBMRWoMen = (data) => {
    const bmr2 = (10 * data.weight) + (6.25 * data.centimeter) - (5 * data.age) - 161
    setBMR(bmr2);
    Calorie(bmr2)
  }

  const Calorie = (bmr) => {
    let calorie = 0;
    switch (data1.Active) {
      case "Sedentary":
        calorie = bmr * 1.2;
        break;
      case "Lightly Active":
        calorie = bmr * 1.375;
        break;
      case "Active":
        calorie = bmr * 1.55;
        break;
      case "Very Active":
        calorie = bmr * 1.725;
        break;
      case "Extremely Active":
        calorie = bmr * 1.9;
        break;
    }
    setCalorie(calorie);
  }

  return (
    <>
      <div className='px-5 row'>
        <div className='col-12 mt-5'>
          <span>RESULTS</span>
        </div>
      </div>

      <div className='px-5 row mt-3'>
        <div className='col-3 col-md-border'>
          <h3>BMR</h3>
          <p>{bmr}</p>

          <h3>Calories</h3>
          <p>{calorie}</p>
        </div>

        <div className='col-3 col-md-border'>
          <h3 onClick={(e) => { console.log(data1) }}>Protein</h3>
        </div>

        <div className='col-3 col-md-border'>
          <h3>Fat</h3>
        </div>


        <div className='col-3 col-md-border'>
          <h3>Carbs</h3>
        </div>
      </div>

      <div className='row mt-3 px-5' >
        <div className='col-12' >
          <div className='col-6 p-0' >
            <button type="button" onClick={previousbtn} className="btn btn-dark rounded-0">Previous Step</button>
          </div>
        </div>
      </div>


    </>
  );
}
