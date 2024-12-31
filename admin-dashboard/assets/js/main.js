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
    const parkImg = document.getElementById("park-break");
    const checkEngine = document.getElementById("check-engine");
    const motorStatus = document.getElementById("motor-status");
    const percent = document.getElementById("percent");
    const gear_ratio = document.getElementById("gear-ratio");
    const rpm = document.getElementById("rpm");
    const powerused = document.getElementById("power-used");
    const temprature = document.getElementById("temp");
    const charging = document.getElementById("charging");

    //const batteryCharge=0;
    
    // Function to fetch and process data
    async function fetchAndDisplayData() {
        try {
            const response = await fetch("https://firestore.googleapis.com/v1/projects/epiroc-dashboard/databases/(default)/documents/dashboard");
            const data = await response.json();

            const batteryCharge = data.documents[0]?.fields?.battery_charge?.integerValue || "N/A";
            const parking = data.documents[0]?.fields?.parking?.booleanValue || false;
            const checkengine = data.documents[0]?.fields?.engine_status?.booleanValue || false;
            const motorstatus = data.documents[0]?.fields?.motor_status?.booleanValue || false;
            const batterylow = data.documents[0]?.fields?.battery_low?.booleanValue || false;
            const gearratio = data.documents[0]?.fields?.gear_ratio?.stringValue || "N/N";
            const rpmValue = data.documents[0]?.fields?.rpm?.stringValue || "0";
            const temp = data.documents[0]?.fields?.battery_temprature?.integerValue || "0";
            const charge = data.documents[0]?.fields?.charging?.booleanValue || "0";
            const powercons = data.documents[0]?.fields?.power_comsumption?.integerValue || "0";
            // Update the parking image based on the parking status
            parkImg.textContent = parking ? "ON" : "OFF";
            checkEngine.textContent = checkengine ? "ON" : "OFF";
            motorStatus.textContent = motorstatus ? "ON" : "OFF";
            percent.textContent =batteryCharge +"%";
            gear_ratio.textContent =gearratio ;
            rpm.textContent =rpmValue +" RPM" ;
            temprature.textContent =temp +" C" ;
           charging.textContent=charge;
           powerused.textContent=powercons;
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function listenToRealtimeUpdates() {
    console.log("Setting up Firestore listener...");
    const collectionRef = collection(db, "dashboard");

    onSnapshot(collectionRef, (snapshot) => {
        console.log("Firestore snapshot received");
        if (snapshot.empty) {
            console.log("No documents in collection");
            return;
        }

        snapshot.forEach(doc => {
            console.log("Document data:", doc.data());
            parkImg.textContent = doc.data().parking ? "ON" : "OFF";
            checkEngine.textContent = doc.data().engine_status ? "ON" : "OFF";
            motorStatus.textContent = doc.data().motor_status ? "ON" : "OFF";
            percent.textContent =doc.data().battery_charge +"%";
            gear_ratio.textContent =doc.data().gear_ratio ;
            rpm.textContent =doc.data().rpm +" RPM" ;
            temprature.textContent =doc.data().battery_temprature +" C" ;
            charging.textContent=doc.data().charging? "ON" : "OFF";
            powerused.textContent=doc.data().power_comsumption;
        });

        // Add your UI update logic here...
    });
}

    // Initialize the app
    document.addEventListener("DOMContentLoaded", () => {
 
        fetchAndDisplayData();
        listenToRealtimeUpdates();
    });