import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import '../../styles/carousel.css'

const settings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 11,
    arrows: false
};


function Carousel() {
    const [imgMovie, setImgMovie] = useState('')
    const [treading, setTreading] = useState([]);
    const getData = async (paramUrl, body) => {
        const response = await fetch(paramUrl, body);
        const responseData = await response.json();
        return responseData;
    }

    useEffect(() => {
        getData("https://api.themoviedb.org/3/trending/all/day?api_key=39f5897aa2b8f37692fc06e61504587d")
            .then((data) => {
                setTreading(data.results)
            })
            .catch((error) => {
                console.log(error)
            })
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <Slider {...settings}>
                {
                    treading.map((movie, index) =>
                        <Grid key={index} container position="relative">
                            <Grid item xs={12}>
                                <img style={{
                                    display: "block",
                                    objectFit: "cover",
                                    width: "100%",
                                    minHeight: "680px",
                                }}
                                    src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}`} />
                            </Grid>


                            <Grid item md={6} xs={12} p={5}
                                position="absolute"
                                bottom="0"
                                width="100%"
                            >
                                <i> <h3 style={{ color: "white", fontWeight: 700 }}>{movie.original_title ? movie.original_title : movie.original_name}</h3></i>

                                <h5 style={{ color: "red", fontWeight: 700 }}>{movie.media_type.toUpperCase()}</h5>

                                {/* <p className="overview" style={{ color: "white", fontWeight: 500, width: "100%" }} >{movie.overview}</p> */}
                                <br />
                                <NavLink to={`/${movie.media_type}/${movie.id}`}>
                                    <button
                                        className="custom-btn btn-slider">
                                        <span>CLICK</span><span>TRAILER</span>
                                    </button>
                                </NavLink>
                            </Grid>
                        </Grid>

                    )
                }
            </Slider>
        </div>
    );
}

export default Carousel;