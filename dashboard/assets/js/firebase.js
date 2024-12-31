import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore,doc, collection,getDoc, onSnapshot,updateDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD_vTacVZzxVziS0e95Fi5JTMHq1DT_m0U",
    authDomain: "epiroc-dashboard.firebaseapp.com",
    databaseURL: "https://epiroc-dashboard-default-rtdb.firebaseio.com",
    projectId: "epiroc-dashboard",
    storageBucket: "epiroc-dashboard.firebasestorage.app",
    messagingSenderId: "453253762574",
    appId: "1:453253762574:web:80de8eaace834aa122765f",
    measurementId: "G-DZ5VYPQ9T1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const parkImg = document.getElementById("park-img");
const checkEngine = document.getElementById("check-engine");
const motorStatus = document.getElementById("motor-status");
const batteryLow = document.getElementById("battery-low");
const plugin = document.getElementById("plugin");

//const batteryCharge=0;

// Function to fetch and process data
async function fetchAndDisplayData() {
    try {
        const response = await fetch("https://firestore.googleapis.com/v1/projects/epiroc-dashboard/databases/(default)/documents/dashboard");
        const data = await response.json();
      // Fetch data from database
        const batteryCharge = data.documents[0]?.fields?.battery_charge?.integerValue || "N/A";
        const parking = data.documents[0]?.fields?.parking?.booleanValue || false;
        const checkengine = data.documents[0]?.fields?.engine_status?.booleanValue || false;
        const motorstatus = data.documents[0]?.fields?.motor_status?.booleanValue || false;
        const batterylow = data.documents[0]?.fields?.battery_low?.booleanValue || false;
        const gearratio = data.documents[0]?.fields?.gear_ratio?.stringValue || "N/N";
        const rpmValue = data.documents[0]?.fields?.rpm?.stringValue || "0";
        const temp = data.documents[0]?.fields?.battery_temprature?.integerValue || "0";
        // Update the parking image based on the parking status
        
       
        parkImg.src = parking ? "images/park.PNG" : "images/park-disabled.PNG";
        checkEngine.src = checkengine ? "images/check-engine.png" : "images/check-disabled.png";
       
        if (motorstatus) {
          motorStatus.src = "images/power.png"; // Change to 'no-parking' image
          motorStatus.classList.add("blink-image"); // Add blinking effect
        } else {
          
          motorStatus.src = "images/power-disabled.png"; // Change to 'parking-available' image
          motorStatus.classList.remove("blink-image"); // Remove blinking effect
        }
        if (batterylow) {
          batteryLow.src = "images/battery.png"; // Change to 'no-parking' image
          batteryLow.classList.add("blink-image"); // Add blinking effect
        } else {
          batteryLow.src = "images/battery-disabled.png"; // Change to 'parking-available' image
          batteryLow.classList.remove("blink-image"); // Remove blinking effect
        }
       
        updateBattery(batteryCharge);
        // Update the battery charge in HTML
        document.getElementById("gear_ratio").innerHTML = gearratio;
        document.getElementById("percent").innerHTML = batteryCharge;
        document.getElementById("rpm").innerHTML = rpmValue +'RPM';
        document.getElementById("temp").innerHTML = temp;
        document.getElementById("animated-slider").value = rpmValue;
        gauge2.value=rpmValue;
        gauge2.update();
        var power=rpmValue*22*0.018;
        gauge.value = power;
        gauge.update();

     
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function updateBattery(percentage) {
  const blocks = document.querySelectorAll('.battery-block');
  const activeBlocks = Math.ceil((percentage / 100) * blocks.length);

  blocks.forEach((block, index) => {
    if (index < activeBlocks) {
      block.classList.add('active');
      block.classList.remove('hide');
    } else {
      block.classList.remove('active');
      block.classList.add('hide');
    }
  });
}

// Example usage
 // Show 60% battery


// Real-time updates
function listenToRealtimeUpdates() {
    const collectionRef = collection(db, "dashboard");
    onSnapshot(collectionRef, (snapshot) => {
        let batteryCharge = "0";
        let batterylow = false;
        let parking = false;
        let checkeng=false;
        let gear_ratio='N/N';
        let rpmValue=0;
        let motorstatus=false;
        let batteryTemprature=0;
        snapshot.forEach(doc => {
           if (doc.data().battery_low) {
              batterylow = doc.data().battery_low;
            }
            if (doc.data().battery_charge) {
                batteryCharge = doc.data().battery_charge;
            }
            if (doc.data().parking !== undefined) {
              parking = doc.data().parking;
            }
            if (doc.data().engine_status !== undefined) {
              checkeng = doc.data().engine_status;
            }
            if (doc.data().gear_ratio !== undefined) {
              gear_ratio = doc.data().gear_ratio;
            }
            if (doc.data().rpm !== undefined) {
              rpmValue = doc.data().rpm;
            }
            if (doc.data().motor_status !== undefined) {
              motorstatus = doc.data().motor_status;
            }

            if (doc.data().battery_temprature !== undefined) {
              batteryTemprature = doc.data().battery_temprature;
            }
        });
        
        updateBattery(batteryCharge);

        // Update the battery charge in HTML
        document.getElementById("gear_ratio").innerHTML =gear_ratio;
        document.getElementById("percent").innerText = batteryCharge;
        document.getElementById("rpm").innerHTML = rpmValue +' RPM';
        document.getElementById("temp").innerHTML = batteryTemprature;

        parkImg.src = parking ? "images/park.PNG" : "images/park-disabled.PNG";
        checkEngine.src = checkeng ? "images/check-engine.png" : "images/check-disabled.png";
  
       
        if (motorstatus== true) {
          motorStatus.src = "images/power.png"; // Change to 'no-parking' image
          motorStatus.classList.add("blink-image"); // Add blinking effect
        } else {
          
          motorStatus.src = "images/power-disabled.png"; // Change to 'parking-available' image
          motorStatus.classList.remove("blink-image"); // Remove blinking effect
        }
        if (batterylow==true) {
          batteryLow.src = "images/battery.png"; // Change to 'no-parking' image
          batteryLow.classList.add("blink-image"); // Add blinking effect
        } else {
          batteryLow.src = "images/battery-disabled.png"; // Change to 'parking-available' image
          batteryLow.classList.remove("blink-image"); // Remove blinking effect
        }
           
    });
}



// Initialize the app
document.addEventListener("DOMContentLoaded", () => {

    fetchAndDisplayData();
    listenToRealtimeUpdates();
});


// Slider for RPM
var speedoMeterInputRange = document.getElementById('animated-slider');
var speedoMeterInputRangeVal = document.getElementById('speedoMeterInputRange-value-1');
let timeoutId; 
let timeout;

//Function for battery charging
function increaseBatteryLevel() {
  var batteryLevel= parseInt($("#percent").html());
  const blocks = document.querySelectorAll('.battery-block');
  //alert(batteryLevel);
if (batteryLevel < 100) { // Ensure the battery does not exceed 100%
  batteryLevel = batteryLevel+1;
  updateBattery(batteryLevel);
  let batteryLow = batteryLevel < 20 ? true : false;
  //blocks.style.height = `${batteryLevel}%`; // Update the height
  //batteryPercentage.textContent = `${batteryLevel}%`; // Update the text
  const docRef = doc(db, "dashboard", "vehicle_data");
          // Update the "battery_ch.rge" field
           updateDoc(docRef, {
              battery_charge: batteryLevel,
              battery_low:batteryLow
             
          });
}
}

function handleClick() {
  const blocks = document.querySelectorAll('.battery-block');
  var charge_state=false;
// Add the "animate" class to each block
blocks.forEach(block => {
  if (block.classList.contains('animate')) {
   
      block.classList.remove('animate');
       plugin.src="images/plugin-disabled.png";
      // Increase battery level every 30 seconds
      document.getElementById("animated-slider").disabled = false;
      gauge.value=0;
      gauge.update();
      clearInterval(timeoutId);
      charge_state=false;
    } else {
    document.getElementById("animated-slider").value = 0;
   
    document.getElementById("animated-slider").dispatchEvent(new Event('change'));
    document.getElementById("animated-slider").disabled = true;
    block.classList.add('animate'); 
    plugin.src="images/plugin.png";
      
      if (timeoutId) {
      clearInterval(timeoutId);
      console.log("Previous interval cleared.");
    }
      timeoutId = setInterval(increaseBatteryLevel, 5000);
      gauge.value=-100;
      gauge.update()
      charge_state=true;
    
        }

          const docRef = doc(db, "dashboard", "vehicle_data");
          // Update the "battery_ch.rge" field
           updateDoc(docRef, {
            charging_state: charge_state
             
          });
});
}

// Attach the function to the button
document.getElementById('plugin').onclick = handleClick;

function decreaseBatteryLevel() {
  var batteryLevel= parseInt($("#percent").html());
  
  //alert(batteryLevel);
if (batteryLevel > 0) { // Ensure the battery does not exceed 100%
  batteryLevel = batteryLevel-1;
  updateBattery(batteryLevel);
  let batteryLow = batteryLevel < 20 ? true : false;

  //blocks.style.height = `${batteryLevel}%`; // Update the height
  //batteryPercentage.textContent = `${batteryLevel}%`; // Update the text
  const docRef = doc(db, "dashboard", "vehicle_data");
          // Update the "battery_ch.rge" field
           updateDoc(docRef, {
              battery_charge: batteryLevel,
              battery_low:batteryLow
             
          });
}
}


speedoMeterInputRange.onchange = async function (e) {
  // Trigger the click event on the div with id="plugin"

  if(e.target.value==0)
    {
      clearInterval(timeout);

    }else{
      if (timeout) {
        clearInterval(timeout);
        console.log("Previous interval cleared.");
      }
      timeout = setInterval(decreaseBatteryLevel, 5000);
      
    } 

  gauge2.value=e.target.value;
  gauge2.update();
 
  const rpmValue=e.target.value;

  var power=Math.round(rpmValue*22*0.018);
  const tempIncreaseFactor = 0.01; // Adjust this factor as needed
  var batteryTemp= parseInt($("#temp").html());
  batteryTemp=(rpmValue*.1);


  gauge.value = power;
  gauge.update();
  //timeoutId = setInterval(decreaseBatteryLevel, 5000);

  
  const motorStatus = rpmValue > 600 ? true : false;
  try {
          // Reference to the Firestore document
          const docRef = doc(db, "dashboard", "vehicle_data");
          // Update the "battery_ch.rge" field
          await updateDoc(docRef, {
              // battery_charge: battery, // New value for battery_charge
              rpm: rpmValue,
              motor_status:motorStatus,
              // battery_low:batteryLow,
              power_comsumption:power,
              battery_temprature:batteryTemp
          });
    
      } catch (error) {
          console.error("Error updating document: ", error);
          
      }
    
    
}
