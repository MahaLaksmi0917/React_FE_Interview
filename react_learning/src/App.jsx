import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Parent from "./components/useMemoAndCallBackDeep/Parent";
import Virtulaization from "./components/virtualization/Virtualization";
import NonVirtulization from "./components/virtualization/NonVirtulization";
import CallBk from "./components/CallBk";
// import GameTicTacToe from "./components/GameTicTacToe";
import SignalLighting from "./components/blinkingAnimations/SignalLighting";
import LoaderAnimation from "./components/blinkingAnimations/LoaderAnimation";
import UseMemoParent from "./components/useMemoExp/UseMemoParent";
import withCounter from "./components/HOC/withCounter";
import CounterClick from "./components/HOC/CounterClick";
import HoverCounter from "./components/HOC/HoverCounter";
import ParentCallback from "./components/useCallbackExplination/ParentCallback";
import ProgressBar from "./components/Animations/ProgressBar";
import ProgressiveImage from "./components/ProgressiveImage/ProgressiveImage";
import largeImage from "./assets/images/large.jpg";
import tinyImage from "./assets/images/tiny.jpg";
import Virtualization from "./components/virtualization/Virtualization";
import DropdownWithApi from "./components/virtualization/Virtualization";

function App() {
  const listArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);
  // console.log(items);

  const fetchRequest = async () => {
    try {
      const res = await fetch("http://localhost:5001/ak");
      const data = await res.json();
      if (data.listening) {
        console.log(data);
      } else {
        throw new Error("unable to fetch ");
      }
    } catch (err) {
      console.log(`ERR : `, err);
    }
  };

  const sendPostRequest = async () => {
    try {
      const res = await fetch("http://localhost:5001/getBody", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: "vite project", by: "AK" }),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(`err`, err);
    }
  };

  const sendLoginRequest = async () => {
    try {
      const res = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "ak@gmail.com", password: 123456 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error("user not found");
      if (data?.token) {
        localStorage.setItem("token", data.token);
        window.alert("logged In successfull");
      }
    } catch (err) {
      console.log(`err`, err);
    }
  };

  const getProfileDetails = async () => {
    let token = localStorage.getItem("token");
    console.log({ token });

    try {
      const res = await fetch("http://localhost:5001/profile", {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error("token expired  or not working ");
      console.log(data);
    } catch (err) {
      console.log(`err`, err);
    }
  };

  const deleteProfile = async () => {
    let token = localStorage.getItem("token");
    console.log({ token });

    try {
      const res = await fetch("http://localhost:5001/delete", {
        method: "delete",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error("token expired  or not working ");
      console.log(data);
    } catch (err) {
      console.log(`err`, err);
    }
  };

  useEffect(() => {
    // fetchRequest();
  }, []);

  const ClickCounterWithCounter = withCounter(CounterClick);
  const HoverCounterWithCounter = withCounter(HoverCounter);

  return (
    //  <Parent />
    // <CallBk/>
    // <NonVirtulization items={items} height={400} />
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* <Virtulaization items={items} height={400} /> */}
      <DropdownWithApi/>
      {/* <h1>Virtualization</h1>
      <Virtualization /> */}
      {/* <p>React + node js</p>

      <button onClick={sendPostRequest}>post Request</button>
      <button onClick={sendLoginRequest}>Send Login Request</button>
      <button onClick={getProfileDetails}>Get Profile Details</button>
      <button onClick={deleteProfile}>Delete Profile</button> */}
      {/* <GameTicTacToe /> */}
      {/* <SignalLighting /> */}
      {/* <LoaderAnimation /> */}
      {/* <UseMemoParent /> */}

      {/* <ClickCounterWithCounter />
      <HoverCounterWithCounter /> */}

      {/* <CounterClick /> */}
      {/* <ProgressBar /> */}
      {/* <ParentCallback /> */}
      {/* <p>Progressive Image renderer </p> */}

      {/* <ProgressiveImage
        height={"400"}
        width={"400"}
        src={largeImage}
        placeHolderSrc={tinyImage}
      /> */}
    </div>
  );
}

export default App;
