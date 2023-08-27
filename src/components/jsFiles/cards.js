import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchPlanet } from "../../redux/action";
import back from "../../assets/back.svg";
import forward from "../../assets/forward.svg";
import ".././stylesheets/cards.css";
import Navbar from "./Navbar";
import {Dialog,DialogTitle,DialogContent,DialogContentText} from "@material-ui/core";
import Loader from "./Loader";
import Error from "./Error";

function CardPage() {

  const char = useSelector((s) => s.charReducer);
  const [n, setN] = useState(1);
  const [check, setCheck] = useState(0);
  const [check2, setCheck2] = useState(0);
  const [loading, setLoading] = useState(false);
  const [charList, setCharList] = useState();
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  const [error, setError] = useState(0);
  const [object, setObject] = useState();
  var numbers=Math.ceil(Math.random()*100);
  var i = 0;
  var img;
  var colors = [
    "green", "#0e9aa7", "#451e3e", "#854442", "#4d648d","#54b2a9", "#563d7c", "#851e3e","#005b96","#6497b1", "#f6abb6","orange","#8d5524", "#C06C84","#606C38","#C44536","#C2956E","#3A3335", "#706993","#881E3F","#16A5A3","#0747A1","#3D405B","#BA5624", "#29635D","#23001E","#6D2402","#FFBA49","#2D6244","#2A39E","#7C4D3D","#5A6E3A","#90332B","#13315C","#CCB42C", "#5E565A","#3D405B",];
    
 const dispatch = useDispatch();

  useEffect(() => {
    setCheck(0);
    setError(0);
    setLoading(true);
    dispatch(fetchData(n, setCheck, setLoading, setError));
  }, [n]);

  useEffect(() => {
    if (check == 1) {
      setNext(char.next);
      setPrev(char.prev);
      setCharList(char.char);
      if (char.prev == null) {
        document.getElementById("backimg").style.display = "none";
      }
      if (char.next == null) {
        document.getElementById("frontimg").style.display = "none";
      }
      if (char.prev != null && char.next != null) {
        document.getElementById("backimg").style.display = "block";
        document.getElementById("frontimg").style.display = "block";
      }
    }
  }, [check]);

  useEffect(() => {
    console.log(error);
    if (error == 1) {
      console.log("server down");
    }
  }, [error]);

  function backFunc() {
    if (prev != null) {
      setN(n - 1);
    }
  }
  function forwardFunc() {
    if (next != null) {
      setN(n + 1);
    }
  }
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog2, setShowDialog2] = useState(false);

  const closeDialog = () => setShowDialog(false);
  const closeDialog2 = () => setShowDialog2(false);

  useEffect(() => {
    if (check2 == 1) {
      setShowDialog2(true);
    }
  }, [check2]);

  return (
    <>
      {loading ? <Loader /> : null}
      <Navbar />
      {error ? (<Error />) : (
        <>
          <div id="contentDiv">
            <h1>STAR WAR CHARACTERS</h1>
            <div style={{display: "flex",flexWrap: "wrap",marginTop: "30px",justifyContent: "center",}}>
              {charList? charList.map((people,index) => (
                    <><div style={{ display: "none" }}>
                      {(numbers = numbers+index)}
                      </div>
                      <div id='boxDiv'>
                        <Box id="box" onClick={() => {setShowDialog(true); setObject(people);}}>
                          <Card id="card">
                            <div style={{ display: "none" }}>
                              {people.species.length? (i = people.species.toString().split("/")[5]): (i = 38)}
                              {(img = `https://picsum.photos/id/${numbers}/200/300`)}
                            </div>
                            <CardMedia component="img" height="140" image={img}></CardMedia>
                            <CardContent id="cardContent" style={{backgroundColor: colors[i]}}>
                              <Typography gutterBottom variant="h5" component="div" textAlign="center" key={people.name}>
                                {people.name}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </div>
                    </>
                  )): null}
              {object ? (
                <>
                  <Dialog open={showDialog} onClose={closeDialog}>
                    <DialogTitle id="dialogTitle1">
                      <p>{object.name}</p>
                    </DialogTitle>
                    <DialogContent id="dialogContent1">
                      <DialogContentText>
                        <p>Height : {object.height}m</p>
                        <p>Mass : {object.mass}kg</p>
                        <p>Created : {object.created.toString().split("T")[0].split("-").reverse().join("/")}</p>
                        <p>No. of Films : {object.films.length}</p>
                        <p>Birth Year : {object.birth_year}</p>
                      </DialogContentText>
                      <button id="dialogButton" onClick={() => {
                          dispatch(
                            fetchPlanet(object.homeworld, setLoading, setCheck2)
                          );
                          setLoading(true);
                          setCheck2(0);
                          setShowDialog(false);
                        }}
                      >
                        Homeworld
                      </button>
                    </DialogContent>
                  </Dialog>
                  {char ? (
                    <Dialog
                      open={showDialog2}
                      onClose={closeDialog2}
                      id="dialog"
                    >
                      <DialogTitle id="dialogTitle2">
                        <p>Homeworld</p>
                      </DialogTitle>
                      <DialogContent id="dialogContent2">
                        <p>Name : {char.name}</p>
                        <p>Climate : {char.climate}</p>
                        <p>Terrain : {char.terrain}</p>
                        <p>No. of residents : {char.population}</p>
                      </DialogContent>
                    </Dialog>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
          <div id="navigationDiv">
            <>
              <button onClick={backFunc} id="backimg">
                <img src={back}></img>
              </button>
              <button onClick={forwardFunc} id="frontimg">
                <img src={forward}></img>
              </button>
            </>
          </div>
        </>
      )}
    </>
  );
}

export default CardPage;
