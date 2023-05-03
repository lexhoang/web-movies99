import { Grid, Typography, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import noInfoImg from "../../assets/image/noInfo.jpeg";


function TreadingList() {
    const navigate = useNavigate()
    const params = useParams()

    const [treading, setTreading] = useState([]);
    const [currentPage, setCurrentPage] = useState(params.page !== undefined ? parseInt(params.page) : 1)


    const getData = async (paramUrl, body) => {
        const response = await fetch(paramUrl, body);
        const responseData = await response.json();
        return responseData;
    }

    useEffect(() => {
        getData(`https://api.themoviedb.org/3/trending/all/week?api_key=39f5897aa2b8f37692fc06e61504587d&language=en-US&page=${params.page !== undefined ? params.page : 1}`)
            .then((data) => {
                setTreading(data.results)
            })
            .catch((error) => {
                console.log(error)
            })
        window.scrollTo(0, 0)
    }, [params])


    return (
        <div style={{ paddingTop: "10rem" }}>
            <Grid container>
                <Typography ml={5} mb={5} variant="h5" fontWeight={700} sx={{ color: "white" }}> NỔI BẬT </Typography>
            </Grid>

            <Grid container justifyContent="center">
                <Pagination onChange={(event, value) => { navigate(`/treading/page/${value}`); setCurrentPage(value) }} page={currentPage} variant="outlined" count={3} />
            </Grid>

            <Grid container justifyContent="center" mt={5} className="animate__animated animate__slideInLeft">
                {treading.length > 0 ?
                    treading.map((treading, index) =>
                        <Grid key={index} item md={2} xs={4} mb={8}>
                            <NavLink to={`/${treading.media_type}/${treading.id}`} className="content-card" >
                                <span style={{
                                    color: treading.vote_average > 8 ? "#34cc34" : treading.vote_average > 6 ? "orange" : "red"
                                }}>{Math.round(treading.vote_average * 10) / 10}</span>
                                <img alt="poster" src={treading.poster_path !== null ? `https://image.tmdb.org/t/p/w300${treading.poster_path}` : noInfoImg} ></img>
                                <Grid className="content-title" sx={{ fontSize: { md: '16px', xs: '12px' } }}>
                                    {`${treading.media_type !== "tv" ? treading.title + "(" + treading.release_date.slice(0, 4) + ")" : treading.name + "(" + treading.first_air_date.slice(0, 4) + ")"}`}
                                </Grid>
                            </NavLink>
                        </Grid>
                    )
                    : null}
            </Grid>

            <Grid container justifyContent="center">
                <Pagination onChange={(event, value) => { navigate(`/treading/page/${value}`); setCurrentPage(value) }} page={currentPage} variant="outlined" count={3} />
            </Grid>
        </div>
    )
}

export default TreadingList;