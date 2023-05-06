import { Grid, Typography, Modal, Box, } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import bgImage from "../../assets/image/bgImage.png"
import noInfoImg from "../../assets/image/noInfo.jpeg"
import YouTubeIcon from '@mui/icons-material/YouTube';
import ModalVideo from "react-modal-video";
import '../../styles/mediaDetail.scss';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function MediaDetail() {
    const params = useParams();
    const [openVideo, setOpenVideo] = useState(false);
    const [movie, setMovie] = useState("");
    const [video, setVideo] = useState("");

    const getData = async (paramUrl, body) => {
        const response = await fetch(paramUrl, body)
        const resData = await response.json();
        return resData;
    }

    useEffect(() => {
        getData(`https://api.themoviedb.org/3/${params.type}/${params.movieId}?api_key=39f5897aa2b8f37692fc06e61504587d&language=en-US`)
            .then(data => {
                setMovie(data);
            })
            .catch((error) => {
                console.log(error)
            });

        getData(`https://api.themoviedb.org/3/${params.type}/${params.movieId}/videos?api_key=39f5897aa2b8f37692fc06e61504587d&language=en-US`)
            .then(data => {
                setVideo(data.results)
            })
            .catch((error) => {
                console.log(error)
            })
        window.scrollTo(0, 0)
    }, [params.movieId, params.type])

    const handleClickTrailer = () => {
        //console.log("click")
        setOpenVideo(true)
    }

    return (
        movie !== "" ?
            <Grid container style={{ position: "relative" }}>
                <img alt="poster" className="bg-media"
                    style={{
                        display: "block",
                        width: "100%",
                        objectFit: "cover",
                        filter: "brightness(40%)",
                    }}
                    src={movie.backdrop_path !== null ? `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}` : bgImage}>
                </img>

                <Grid container pt={12}
                    style={{
                        width: "100%", padding: "0 10%",
                        position: "absolute", top: "12%", color: "white", fontWeight: "600"
                    }}>
                    <Grid item lg={4} xs={12} mb={4} position="relative" className="animate__animated animate__fadeInDown">
                        <img alt="poster" className="img-media" src={movie.poster_path !== null ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : noInfoImg} ></img>
                    </Grid>

                    <Grid item lg={8} xs={12} className="animate__animated animate__fadeInDown animate__delay-1s"
                        style={{ display: "flex", flexDirection: "column", width: "100%", fontSize: "0.95rem", fontWeight: 700 }}>
                        <Grid container>
                            <Typography variant="h4" style={{ color: "white" }}>{params.type === "movie" ? movie.title : movie.name}</Typography>
                        </Grid>

                        <Grid container>
                            {params.type !== "tv" ? movie.release_date.slice(0, 4) : movie.first_air_date.slice(0, 4)}. {params.type.toUpperCase()}.&nbsp;
                            <span style={{ color: "#2fc9f3" }}> TMDB</span>
                            - ⭐{Math.round(movie.vote_average * 10) / 10}
                        </Grid>

                        <Grid container>
                            {movie.genres.map((el, index) => {
                                return index === 0 ? el.name : " , " + el.name
                            })}
                        </Grid>

                        <Grid container mt={3} display="block" width="60%" onClick={handleClickTrailer}>
                            <button style={{ color: "white" }} className="w-100 btn btn-trailer js-modal-btn" data-channel="custom">
                                <span>
                                    <YouTubeIcon style={{ color: "red" }}></YouTubeIcon>
                                    &nbsp;Xem Trailer
                                </span>
                            </button>
                        </Grid>

                        <Grid container mt={3}>
                            <Typography variant="h5" style={{ color: "#b3b3b3", fontWeight: "bold" }}>
                                {movie.tagline}
                            </Typography>
                        </Grid>

                        <Grid container mt={1}>
                            <Typography variant="body1" fontWeight={700} sx={{ maxWidth: '60%' }}>
                                {movie.overview}
                            </Typography>
                        </Grid>

                        <Grid container mt={4}>
                            <Typography variant="body1" fontWeight={700}>
                                <span style={{ color: "#b3b3b3" }}>Thời lượng : </span>
                                {params.type === "movie" ? movie.runtime + " mins" : movie.episode_run_time[0] + " mins per episode"}
                            </Typography>
                        </Grid>

                        {params.type === "tv" ?
                            <Grid container mt={1}>
                                <Typography variant="body1" fontWeight={700}>
                                    <span style={{ color: "#b3b3b3" }}>Tập : </span>
                                    {movie.number_of_seasons}&nbsp;
                                </Typography>
                            </Grid> : null}

                        <Grid container mt={1}>
                            <Typography variant="body1" fontWeight={700}>
                                <span style={{ color: "#b3b3b3" }}>Sản xuất : </span>
                                {movie.production_companies.map((el, index) => {
                                    return index === 0 ? el.name : " , " + el.name
                                })}
                            </Typography>
                        </Grid>

                        {params.type === "movie" ?
                            <Grid container mt={1}>
                                <Typography variant="body1" fontWeight={700}>
                                    <span style={{ color: "#b3b3b3" }}>Ngày công chiếu : </span>
                                    {movie.release_date}&nbsp;
                                </Typography>
                            </Grid> : null}

                        <Grid container mt={1}>
                            <Typography variant="body1" fontWeight={700}>
                                <span style={{ color: "#b3b3b3" }}>Trạng thái : </span>
                                {movie.status}
                            </Typography>
                        </Grid>

                    </Grid>
                </Grid>
                <div>
                    {video !== "" && video.length > 0 ?
                        <ModalVideo channel='youtube' isOpen={openVideo} videoId={
                            video.filter(el => el.name === "Official Trailer").length > 0 ?
                                video.filter(el => el.name === "Official Trailer")[0].key :
                                video.filter(el => el.type === "Trailer").length > 0 ?
                                    video.filter(el => el.type === "Trailer")[0].key :
                                    video[0].key
                        } onClose={() => setOpenVideo(false)} />

                        : <Modal open={openVideo} onClose={() => setOpenVideo(false)}>
                            <Box sx={style}>
                                <img alt="poster" src={noInfoImg}></img>
                            </Box>
                        </Modal>}
                </div>
            </Grid> : null

    )
}


export default MediaDetail;