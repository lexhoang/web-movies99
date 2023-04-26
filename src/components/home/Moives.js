import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';


function Moives() {
    const [movies, setMovies] = useState([]);
    const getData = async (paramUrl, body) => {
        const response = await fetch(paramUrl, body);
        const responseData = await response.json();
        return responseData;
    }

    useEffect(() => {
        getData("https://api.themoviedb.org/3/movie/now_playing?api_key=39f5897aa2b8f37692fc06e61504587d&language=en-US&page=1")
            .then((data) => {
                setMovies(data.results.slice(0, 8))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])


    return (
        <div style={{ borderBottom: "1px solid #616161", marginTop: "80px" }}>
            <Grid container mt={8} px={5} mb={4}>
                <Grid item xs={6} >
                    <Typography color="white" variant="h6" fontWeight={700}> Phim lẻ</Typography>
                </Grid>

                <Grid item xs={6} textAlign="right">
                    <NavLink to="movies" className="more"> Xem thêm </NavLink>
                </Grid>
            </Grid>

            <div  >
                <Grid container justifyContent="center">
                    {movies.length > 0 ?
                        movies.map((movie, index) =>
                            <Grid key={index} item md xs={4} mb={3}>
                                <NavLink to={`/movie/${movie.id}`} className="content-card" >
                                    <span style={{
                                        color: movie.vote_average > 8 ? "#34cc34" : movie.vote_average > 6 ? "orange" : "red"
                                    }}>{Math.round(movie.vote_average * 10) / 10}</span>
                                    <img alt="poster" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}></img>
                                    <Grid className="content-title" sx={{ fontSize: { md: '16px', xs: '12px' } }}>
                                        {movie.title + `(${movie.release_date.slice(0, 4)})`}
                                    </Grid>
                                </NavLink>
                            </Grid>
                        )
                        : null}
                </Grid>

            </div>
        </div >
    )
}

export default Moives;