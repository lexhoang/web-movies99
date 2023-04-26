import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';


function TopRated() {
    const [topRated, setTopRated] = useState([]);
    const getData = async (paramUrl, body) => {
        const response = await fetch(paramUrl, body);
        const responseData = await response.json();
        return responseData;
    }

    useEffect(() => {
        getData("https://api.themoviedb.org/3/movie/top_rated?api_key=39f5897aa2b8f37692fc06e61504587d&language=en-US&page=1")
            .then((data) => {
                setTopRated(data.results.slice(0, 8))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])


    return (
        <div style={{ borderBottom: "1px solid #616161" }}>
            <Grid container mt={8} px={5} mb={4}>
                <Grid item xs={6} >
                    <Typography color="white" variant="h6" fontWeight={700}> Nổi bật</Typography>
                </Grid>

                <Grid item xs={6} textAlign="right">
                    <NavLink to="treading" className="more"> Xem thêm </NavLink>
                </Grid>
            </Grid>

            <div  >
                <Grid container justifyContent="center" >
                    {topRated.length > 0 ?
                        topRated.map((topRated, index) =>
                            <Grid key={index} item md xs={4} mb={3}>
                                <NavLink to={`/movie/${topRated.id}`} className="content-card" >
                                    <span style={{
                                        color: topRated.vote_average > 8 ? "#34cc34" : topRated.vote_average > 6 ? "orange" : "red"
                                    }}>{Math.round(topRated.vote_average * 10) / 10}</span>
                                    <img alt="poster" src={`https://image.tmdb.org/t/p/w300${topRated.poster_path}`}></img>
                                    <Grid className="content-title" sx={{ fontSize: { md: '16px', xs: '12px' } }}>
                                        {topRated.title + `(${topRated.release_date.slice(0, 4)})`}
                                    </Grid>
                                </NavLink>
                            </Grid>
                        )
                        : null}
                </Grid>

            </div>
        </div>
    )
}

export default TopRated;