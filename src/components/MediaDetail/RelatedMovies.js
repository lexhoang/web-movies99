import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from 'react-router-dom';
import noInfoImg from "../../assets/image/noInfo.jpeg"


function RelatedMovies() {
    const params = useParams();

    const [relatedMovies, setRelatedMovies] = useState([]);
    const getData = async (paramUrl, body) => {
        const response = await fetch(paramUrl, body);
        const responseData = await response.json();
        return responseData;
    }

    useEffect(() => {
        getData(`https://api.themoviedb.org/3/${params.type}/${params.movieId}/similar?api_key=39f5897aa2b8f37692fc06e61504587d&language=en-US&page=1`)
            .then((data) => {
                setRelatedMovies(data.results.slice(0, 8))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [params.type, params.movieId])


    return (
        <div style={{ borderBottom: "1px solid #424242" }}>
            <Grid container mt={10} px={5} mb={6}>
                <Grid item xs={12} textAlign="center">
                    <Typography color="secondary" variant="h4" fontWeight={700}> Các Phim Liên Quan</Typography>
                </Grid>
            </Grid>

            <div  >
                <Grid container justifyContent="center">
                    {relatedMovies.length > 0 ?
                        relatedMovies.map((relatedMovie, index) =>
                            <Grid key={index} item md={2} xs={4} mb={3}>
                                <Link to={`/${params.type}/${relatedMovie.id}`} className="content-card" >
                                    <span style={{
                                        color: relatedMovie.vote_average > 8 ? "#34cc34" : relatedMovie.vote_average > 6 ? "orange" : "red"
                                    }}>{Math.round(relatedMovie.vote_average * 10) / 10}</span>
                                    <img alt="poster" src={relatedMovie.poster_path !== null ? `https://image.tmdb.org/t/p/w300${relatedMovie.poster_path}` : noInfoImg}></img>
                                    <div className="content-title">{`${params.type !== "tv" ? relatedMovie.title + "(" + relatedMovie.release_date.slice(0, 4) + ")" : relatedMovie.name + "(" + relatedMovie.first_air_date.slice(0, 4) + ")"}`}</div>
                                </Link>
                            </Grid>
                        )
                        : null}
                </Grid>

            </div>
        </div >
    )
}

export default RelatedMovies;