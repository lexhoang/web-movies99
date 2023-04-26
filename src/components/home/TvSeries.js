import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';


function TvSeries() {
    const [tv, setTv] = useState([]);
    const getData = async (paramUrl, body) => {
        const response = await fetch(paramUrl, body);
        const responseData = await response.json();
        return responseData;
    }

    useEffect(() => {
        getData("https://api.themoviedb.org/3/tv/on_the_air?api_key=39f5897aa2b8f37692fc06e61504587d&language=en-US&page=1")
            .then((data) => {
                setTv(data.results.slice(0, 8))
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])


    return (
        <div style={{ borderBottom: "1px solid #616161" }}>
            <Grid container mt={8} px={5} mb={4}>
                <Grid item xs={6} >
                    <Typography color="white" variant="h6" fontWeight={700}> Phim bộ</Typography>
                </Grid>

                <Grid item xs={6} textAlign="right">
                    <NavLink to="tvseries" className="more"> Xem thêm </NavLink>
                </Grid>
            </Grid>
            <div  >
                <Grid container justifyContent="center" >
                    {tv.length > 0 ?
                        tv.map((tv, index) =>
                            <Grid key={index} item md xs={4} mb={3}>
                                <NavLink to={`/tv/${tv.id}`} className="content-card" >
                                    <span style={{
                                        color: tv.vote_average > 8 ? "#34cc34" : tv.vote_average > 6 ? "orange" : "red"
                                    }}>{Math.round(tv.vote_average * 10) / 10}</span>
                                    <img alt="poster" src={`https://image.tmdb.org/t/p/w300${tv.poster_path}`}></img>
                                    <Grid className="content-title" sx={{ fontSize: { md: '16px', xs: '12px' } }}>
                                        {tv.name + `(${tv.first_air_date.slice(0, 4)})`}
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

export default TvSeries;