import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import unknownPersonImage from "../../assets/image/Unknown-person.jpeg"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Grid, Typography } from "@mui/material";
import { isMobile } from "react-device-detect";
import '../../styles/castMovie.css'

function Cast() {
    const params = useParams()
    const [cast, setCast] = useState("")
    const getData = async (paramUrl, body) => {
        const res = await fetch(paramUrl, body)
        const resData = await res.json()
        return resData
    }
    useEffect(() => {
        getData(`https://api.themoviedb.org/3/${params.type}/${params.movieId}/credits?api_key=39f5897aa2b8f37692fc06e61504587d&language=en-US`)
            .then(res => {
                //console.log(res.cast)
                setCast(res.cast)
            })
    }, [params.movieId, params.type])

    const responsive = isMobile ? {
        0: { items: 1 },
        1: { items: 2 },
    } : {
        //innerWidth
        0: { items: 1 },
        1: { items: 2 },
        2: { items: 3 },
        3: { items: 4 },
        4: { items: 5 },
        5: { items: 6 },
        6: { items: 7 },
    }
    return (
        <div style={{ marginTop: "50px", width: "90%", marginLeft: "5%" }}>
            <Typography variant="h4" textAlign="center" mb={3} color="white">Diễn viên</Typography>
            {cast !== "" ?
                <AliceCarousel
                    mouseTracking
                    items={cast.map((el, index) => {
                        return (
                            <Grid container direction="column" style={{ color: "white", fontSize: "small" }} >
                                <img alt="poster" style={{ display: "block", margin: "auto auto" }} className="cast-image"
                                    src={el.profile_path != null ? `https://image.tmdb.org/t/p/w300${el.profile_path}` : unknownPersonImage} ></img>
                                <Grid style={{ textAlign: "center" }}>{el.name}</Grid>
                                <Grid style={{ textAlign: "center" }}>{el.character}</Grid>
                            </Grid>
                        )
                    })}
                    responsive={responsive}
                    disableDotsControls={true}
                    disableButtonsControls={true}
                    autoPlay={cast.length > 7 ? true : false}
                    autoPlayInterval={1000}
                    infinite={true}
                //controlsStrategy="alternate"
                /> : null}
        </div>
    )
}

export default Cast;