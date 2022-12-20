import Head from "next/head";
import Image from "next/image";
import styled from "@emotion/styled";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";

const Container = styled.section`
  display: flex;
  justify-content: center;
  //   align-items: center;
  min-height: 100vh;
  //   background-color: #f1f1f1;
  //   background-color: #ff2a2a;
  font-family: "Satisfy", cursive;
  position: relative;

  .box {
    position: absolute;
    width: 280px;
    height: 280px;

    &::before {
      content: "";
      position: absolute;
      top: 0%;
      left: 50%;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, #000, transparent);
      opacity: 0.1;
      transform: rotate(45deg);
      transform-origin: left;
    }
    .circle {
      position: relative;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #fff, #e4e3e8);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      background-color: #f1f1f1;
      border-radius: 50%;
      z-index: 1;

      &::before {
        content: "";
        position: absolute;
        top: 5px;
        left: 5px;
        bottom: 5px;
        right: 5px;

        background: linear-gradient(115deg, #fff, #e4e3e8);
        border-radius: 50%;
      }

      h2 {
        position: absolute;
        z-index: 2;
        font-size: 2.5em;
        color: #ff2a2a;
        font-weight: 300;
        text-align: center;
        span {
        }
      }
    }
  }
  i {
    position: absolute;
    border-radius: 100%;
    background: #ffff;

    animation: animate_ 0.5s linear infinite;
    z-index: 1111;
    :nth-child(even) {
      background: transparent;
      border: 1px solid #ff2a2a;
    }
  }

  @keyframes animate_ {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-20000%);
      opacity: 0;
    }
  }
`;

const Timer = styled.div`
  strong {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Oswald", sans-serif;
    font-size: 0.4em;
    span {
      color: green;
    }
  }
`;

const NewMessage = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  /* justify-content: stretch; */
  align-items: center;

  input,
  button {
    padding: 12px 7px;
    font-size: 19px;
    border: none;
    outline: none;
  }
`;
const Input = styled.input`
  width: 100%;
  background-color: white;
  color: #ff2a2a;
`;
const ActiveButton = styled.button`
  width: 40%;
  background-color: #036903;
  color: #fde14f;
  cursor: pointer;
  width: 100%;
`;
const Gate = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11111;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;

  justify-content: center;
  align-items: center;
  //   background-color: #ff2a2a;
  transform: translate(${(props) => props.per2});
  transform-origin: bottom left;
  transition: 0.9s ease-in-out;
  transition-delay: 0.3s;

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    display: block;
    transform-origin: bottom left;
    transition: 0.9s ease-in-out;
    transform: translate(${(props) => props.per});
    transition-delay: 0.3s;
  }
  #a {
    background-color: #ff1f6b;
    transition-delay: 0.5s;
  }
  #b {
    background-color: #111;
    transition-delay: 0.8s;
  }
  .toggle {
    z-index: 111;
    cursor: pointer;
    display: ${(props) => props.display};
    animation: toggle 3s linear infinite;
    animation-delay: 0.3s;
    @keyframes toggle {
      10% {
        transform: scale(0.4);
      }
      25% {
        transform: scale(0.3);
      }
      50% {
        transform: scale(0.5);
      }
      100% {
        transform: scale(0.4);
      }
    }
  }
`;
const User = styled.div`
  h1 {
    text-align: center;
    color: white;
    span {
      font-family: "Rubik Gemstones", cursive;
      background-image: linear-gradient(to right, white, orange, yellow, green);
      -webkit-background-clip: text;
      color: transparent;
    }
  }
`;
const Share = styled.a`
  z-index: 1;
  position: fixed;
  bottom: 5%;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  background-color: #107338;
  align-items: center;
  width: 100%;
  color: white;
  padding: 3px;
  font-weight: bolder;
  img,
  image {
    width: 42px;
    animation: animateShare 0.8s linear infinite;
    animation-delay: 0.3s;
  }
  @keyframes animateShare {
    0% {
      transform: scale(0.6);
    }
    50% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
`;
const Feed = styled.div`
  .text {
    height: 30px;
    color: gold;
    letter-spacing: 1px;
    font-size: 25px;
    display: flex;
    align-items: center;
    left: 12px;
    position: relative;
    marquee {
      position: absolute;
      width: 150%;
      margin: 0;
      font-weight: 700;
      text-align: left;
    }
  }
`;
//////

const floor = Math.floor;
const random = Math.random;
function bbles(count = 200) {
  let section = document.querySelector("section");
  let i = 0;
  while (i < count) {
    let buble = document.createElement("i");
    var x = floor(random() * window.innerWidth);
    var y = floor(random() * window.innerHeight);
    var size = floor(random() * 10);

    buble.style.left = x + "px";
    buble.style.top = y + "px";
    buble.style.width = 1 + size + "px";
    buble.style.height = 1 + size + "px";
    buble.style.animationDuration = 5 + size + "s";
    buble.style.animationDelay = -size + "s";
    section.appendChild(buble);
    ++i;
  }
}
function PlaySound() {
  var sound = document.getElementById("audiocracker");
  sound.play();
}

export default function Bubbles() {
  useEffect(() => {
    bbles();
  }, []);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [username, setUsername] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [prevText, setPrevText] = useState("");

  var countDownDate = new Date("Dec 25, 2022 00:00:00").getTime();
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;
  // Time calculations for days, hours, minutes and seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setDays((days) => (days = Math.floor(distance / (1000 * 60 * 60 * 24))));

      setHours(
        (hours) =>
          (hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ))
      );
      setMinutes(
        (mins) =>
          (mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
      );
      setSeconds(
        (seconds) => (seconds = Math.floor((distance % (1000 * 60)) / 1000))
      );
    }, 1000);
    return () => clearInterval(interval);
  });

  const handleToggle = () => {
    PlaySound();
    setToggle(() => !toggle);
  };

  const handleIsReady = () => {
    setIsReady(() => !isReady);
  };
  const handleTextChange = (e) => {
    setPrevText((text) => (text = e.target.value));
  };

  const { query } = useRouter();
  return (
    <>
      <Gate
        per={toggle ? "50%" : "0%"}
        per2={toggle ? "100%" : "0%"}
        display={toggle ? "none" : "flex"}
      >
        <span id="b"></span>
        <span id="a"></span>
        <div className="toggle" onClick={handleToggle}>
          <img src="/toogle.gif" alt="Vercel Logo" width={200} height={300} />
        </div>
      </Gate>
      <User>
        <h1>
          <small>from</small>{" "}
          <span>{query.name ? query.name : "{Your Name}"}</span>
        </h1>
        <Feed>
          <div className="text">
            <marquee direction="left" scrollamount="10">
              <p>
                {query.name ? query.name : "{Your Name}"} is wishing you in
                advance merry christmas ”“Merry Christmas! I hope you receive
                one blessing after another this coming year.
              </p>
            </marquee>
          </div>
        </Feed>
      </User>
      <Container>
        <div className="box">
          <div className="circle">
            <h2>
              Happy
              <br />
              Christmas in <span>advance</span>
              <Timer>
                <strong>
                  <span className="days"> {days}days </span>
                  <span className="hrs">&nbsp;{hours}hrs </span>
                  <span className="mins">&nbsp;{minutes}mins </span>
                  <span className="secs">&nbsp;{seconds}secs </span>
                </strong>
                <div></div>
              </Timer>
            </h2>
          </div>
        </div>
      </Container>

      {query.preview === "true" ? (
        <Share
          href={`whatsapp://send?text= ${
            query.name ? query.name : "someone special"
          } sent 
        you a private message\n click this link to view it: axmaze.com/?name=${
          query.name ? query.name : "someone special"
        }`}
          data-action="share/whatsapp/share"
          target="_blank"
        >
          <div className="img">
            <img src="/whatsapp.png" alt="Vercel Logo" width={25} height={50} />
          </div>
          click to share on whatsapp
          <div className="img">
            <img src="/whatsapp.png" alt="Vercel Logo" width={25} height={50} />
          </div>
        </Share>
      ) : (
        ""
      )}

      <NewMessage>
        <Input
          type="text"
          name="name"
          maxLength={7}
          placeholder="type your name here"
          required={true}
          onChange={handleTextChange}
        />
        <a
          href={`/?name=${
            prevText ? prevText : "someone special"
          }&preview=true`}
        >
          <ActiveButton>preview</ActiveButton>
        </a>
      </NewMessage>
      <audio id="audiocracker" src="/santa.mp3" autostart="false"></audio>
    </>
  );
}
