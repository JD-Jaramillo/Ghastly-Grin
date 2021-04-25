import React from "react";
import "./style.css";

function CardCarousel(props) {
   return(

   <div class="slider">

        <a href="#slide-1">1</a>
        <a href="#slide-2">2</a>
        <a href="#slide-3">3</a>
        <a href="#slide-4">4</a>
        <a href="#slide-5">5</a>
        <a href="#slide-6">6</a>
        <a href="#slide-7">7</a>

        <div class="slides">
            <div id="slide-1">
                {props.whiteCard}
            </div>
            <div id="slide-2">
                {props.whiteCard}
            </div>
            <div id="slide-3">
                {props.whiteCard}
            </div>
            <div id="slide-4">
                {props.whiteCard}
            </div>
            <div id="slide-5">
                {props.whiteCard}
            </div>
            <div id="slide-6">
                {props.whiteCard}
            </div>
            <div id="slide-7">
                {props.whiteCard}
            </div>
        </div>
    </div>
   ) 

}

export default CardCarousel;