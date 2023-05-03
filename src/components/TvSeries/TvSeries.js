import { Grid, Button, Typography, Input, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import noInfoImg from "../../assets/image/noInfo.jpeg";
import { Dropdown, DropdownToggle, DropdownMenu, } from 'reactstrap';


function TvSeriesList() {
    const navigate = useNavigate()
    const params = useParams()

    const [tvSeries, setTvSeries] = useState([]);


    const [searchName, setSearchName] = useState("");
    const [pages, setPages] = useState(100)
    const [currentPage, setCurrentPage] = useState(params.page !== undefined ? parseInt(params.page) : 1)


    const [selectGenres, setSelectGenres] = useState({ name: "Filter by:", id: "" })
    const [genresTv, setGenresTv] = useState("")


    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);


    const getData = async (paramUrl, body) => {
        const response = await fetch(paramUrl, body);
        const responseData = await response.json();
        return responseData;
    }


    const handleSearch = () => {
        navigate(`/tvSeries/page/1`);
        setSelectGenres({ name: "Searching By Name", id: -1 })
    }


    useEffect(() => {
        //console.log(currentPage + typeof (currentPage))
        setCurrentPage(params.page !== undefined ? parseInt(params.page) : 1)
        //console.log(params.page)
        if (selectGenres.id === "") {
            getData(`https://api.themoviedb.org/3/tv/on_the_air?api_key=39f5897aa2b8f37692fc06e61504587d&language=en-US&page=${params.page !== undefined ? params.page : 1}`)
                .then((res) => {
                    //console.log(res);
                    setPages(res.total_pages)
                    setTvSeries(res.results)
                })
        }
        else if (selectGenres.id === -1) {
            getData(`https://api.themoviedb.org/3/search/tv?api_key=39f5897aa2b8f37692fc06e61504587d&language=en-US&page=${params.page !== undefined ? params.page : 1}&query=${searchName}`)
                .then((res) => {
                    // console.log(res)
                    setPages(res.total_pages)
                    setTvSeries(res.results)
                })
        }
        else {
            getData(`https://api.themoviedb.org/3/discover/tv?api_key=39f5897aa2b8f37692fc06e61504587d&language=en-US&first_air_date.lte=2022&with_genres=${selectGenres.id}&page=${params.page !== undefined ? params.page : 1}`)
                .then((res) => {
                    //console.log(res);
                    setPages(res.total_pages > 100 ? 100 : res.total_pages)
                    setTvSeries(res.results)
                })
        }
        window.scrollTo(0, 0)
    }, [params, searchName, selectGenres.id])


    useEffect(() => {
        if (selectGenres.id !== -1) {
            setSearchName("")
        }
    }, [selectGenres])


    useEffect(() => {
        getData("https://api.themoviedb.org/3/genre/tv/list?api_key=39f5897aa2b8f37692fc06e61504587d&language=en-US")
            .then((res) => {
                //console.log(res.genres)
                setGenresTv(res.genres)
            })
    }, [])
    return (
        <div style={{ paddingTop: "9rem" }}>
            <Grid container p={2} mb={5}>
                <Grid item md={8} xs={12} mb={2}>
                    <Typography ml={5} variant="h5" fontWeight={700} sx={{ color: "white", }}> PHIM BỘ </Typography>
                </Grid>

                <Grid item md={4} xs={12} sx={{ textAlign: 'right' }}>
                    <Grid container>
                        <Grid item md={9}>
                            <Input
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                style={{ backgroundColor: "hsla(0,0%,100%,.16)", color: "#fff", width: "95%", height: "40px", paddingLeft: "30px" }}
                                placeholder="  Nhập tên phim ...">
                            </Input>
                        </Grid>

                        <Grid item md={3}>
                            <Button
                                variant="contained" onClick={handleSearch}
                                style={{ marginBottom: "10px", fontWeight: "600", color: "white", backgroundImage: "linear-gradient(45deg,#00aeff,#a68eff)" }}>
                                Tìm kiếm
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >

            <div className="p-2">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle
                        caret
                        style={{ backgroundImage: "linear-gradient(45deg,#00aeff,#a68eff)", marginLeft: "50px", color: "white", fontWeight: "700" }}
                    >{selectGenres.name}
                    </DropdownToggle>
                    <DropdownMenu style={{ backgroundColor: "#2c2d50!important", width: "90%" }}>
                        <Typography variant="h5" p={1} sx={{ pl: 5 }} fontWeight={700}>Categories</Typography>

                        <div style={{ display: "flex", flexWrap: "wrap", padding: "8px" }}>
                            <Button
                                color="success" variant="contained" size="small" style={{ margin: "10px 10px" }}
                                onClick={() => { setSelectGenres({ name: "On Air", id: "" }); toggle(); navigate(`/tvSeries/page/1`); }}
                            >All Moives
                            </Button>

                            {genresTv !== "" ?
                                genresTv.map((el, index) =>
                                    <Button key={index}
                                        onClick={() => { setSelectGenres({ name: el.name, id: el.id }); toggle(); navigate(`/tvSeries/page/1`); }}
                                        style={{ margin: "10px 10px" }}
                                        color="info" variant="contained" size="small" >
                                        {el.name}
                                    </Button>)
                                : ""}
                        </div>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <Grid container justifyContent="center" mt={4} className="animate__animated animate__fadeInTopLeft">
                {tvSeries.length > 0 ?
                    tvSeries.map((tvSeries, index) =>
                        <Grid key={index} item md={2} xs={4} mb={8}>
                            <NavLink to={`/tv/${tvSeries.id}`} className="content-card"  >
                                <span style={{
                                    color: tvSeries.vote_average > 8 ? "#34cc34" : tvSeries.vote_average > 6 ? "orange" : "red"
                                }}>{tvSeries.vote_average > 0 ? Math.round(tvSeries.vote_average * 10) / 10 : "null"}</span>
                                <img alt="thumb" src={tvSeries.poster_path !== null ? `https://image.tmdb.org/t/p/w300${tvSeries.poster_path}` : noInfoImg} ></img>
                                <Grid className="content-title" sx={{ fontSize: { md: '16px', xs: '12px' } }}>
                                    {tvSeries.name + `(${tvSeries.first_air_date ? tvSeries.first_air_date.slice(0, 4) : "unknow"})`}
                                </Grid>
                            </NavLink>
                        </Grid>
                    )
                    : null}
            </Grid>

            <Grid container justifyContent="center">
                <Pagination onChange={(event, value) => { navigate(`/tvSeries/page/${value}`); setCurrentPage(value) }} page={currentPage} variant="outlined" count={pages} />
            </Grid>
        </div >
    )
}

export default TvSeriesList;