import { Button, Grid, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { useState, useEffect } from "react";
import imgLogo from "../assets/image/logo.png"
import '../styles/header.css';

const styleNavLink = ({ isActive }) => ({
    textDecoration: "none",
    backgroundColor: isActive ? "rgb(239 68 68)" : "",
    padding: "14px",
    borderRadius: "2px 16px",
    fontSize: "12px",
    fontWeight: isActive ? "bold" : "",
})

const styleNavLinkMobile = ({ isActive }) => ({
    textDecoration: "none",
    backgroundColor: isActive ? "rgb(239 68 68)" : "",
    padding: "14px 0",
    borderRadius: "2px 16px",
    fontSize: "8px",
    fontWeight: isActive ? "bold" : "",
})


export default function Header() {

    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, []);


    return (
        <div style={{
            position: "fixed", width: "100%", zIndex: 10,
            backgroundColor: `${scroll ? "rgb(0, 0, 0)" : "rgba(0, 0, 0, 0.3)"}`, color: "white"
        }}>
            <Grid container py={1} style={{ borderBottom: "1px solid #616161" }}>
                <Grid item md={3} xs={6} sx={{ pl: 2 }} >
                    <Typography component={Link} to="/" variant="h4"
                        style={{ textDecoration: "none", color: "white", fontSize: "30px" }} fontWeight={900}>
                        <img src={imgLogo} alt="" width="200px" />
                    </Typography>
                </Grid>

                <Grid item md={6} sx={{ display: { md: "flex", xs: 'none' } }}>
                    <Grid container>
                        <Grid item md={3} textAlign="center" >
                            <NavLink className='btn-tools' to="/" style={styleNavLink}>
                                <Button>
                                    <Grid container color={'white'}>
                                        <Grid item md={2} xs={12}><HomeIcon></HomeIcon></Grid>
                                        <Grid item md={10} xs={12} px={1} sx={{ fontSize: { lg: '14px', md: '10px' } }}>
                                            Trang chủ
                                        </Grid>
                                    </Grid>
                                </Button>
                            </NavLink >
                        </Grid>

                        <Grid item md={3} textAlign="center">
                            <NavLink style={styleNavLink} to="treading" >
                                <Button className='btn-tools' >
                                    <Grid container color={'white'}>
                                        <Grid item md={2} xs={12}><WhatshotIcon></WhatshotIcon> </Grid>
                                        <Grid item md={10} xs={12} px={1} sx={{ fontSize: { lg: '14px', md: '10px' } }}>
                                            Xu hướng
                                        </Grid>
                                    </Grid>
                                </Button>
                            </NavLink>
                        </Grid>

                        <Grid item md={3} textAlign="center">
                            <NavLink style={styleNavLink} to="movies" >
                                <Button className='btn-tools'>
                                    <Grid container color={'white'}>
                                        <Grid item md={2} xs={12}> <GroupWorkIcon></GroupWorkIcon> </Grid>
                                        <Grid item md={10} xs={12} px={1} sx={{ fontSize: { lg: '14px', md: '10px' } }}>
                                            Phim lẻ
                                        </Grid>
                                    </Grid>
                                </Button>
                            </NavLink>
                        </Grid>

                        <Grid item md={3} textAlign="center">
                            <NavLink style={styleNavLink} to="tvseries">
                                <Button className='btn-tools'>
                                    <Grid container color={'white'}>
                                        <Grid item md={2} xs={12}><LiveTvIcon></LiveTvIcon> </Grid>
                                        <Grid item md={10} xs={12} px={1} sx={{ fontSize: { lg: '14px', md: '10px' } }}>
                                            Phim bộ
                                        </Grid>
                                    </Grid>
                                </Button>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item md={3} xs={6} textAlign="right" sx={{ pr: 2 }}>
                    <button className="btn-login" style={{ transition: "1s" }}>Login</button>
                </Grid>
            </Grid>


            {/* MOBILE */}
            <Grid container pb={1} sx={{ display: { md: 'none' } }}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item md={2} xs={3} textAlign="center" >
                            <NavLink className='btn-tools' to="/" style={styleNavLinkMobile}>
                                <Button className='btn-tools'>
                                    <Grid container color={'white'}>
                                        <Grid item md={2} xs={12}><HomeIcon></HomeIcon></Grid>
                                        <Grid item md={10} xs={12} px={1} sx={{ fontSize: '9px' }}>
                                            Trang chủ
                                        </Grid>
                                    </Grid>
                                </Button >
                            </NavLink>
                        </Grid>

                        <Grid item md={2} xs={3} textAlign="center">
                            <NavLink className='btn-tools' to="treading" style={styleNavLinkMobile}>
                                <Button className='btn-tools'>
                                    <Grid container color={'white'}>
                                        <Grid item md={2} xs={12}><WhatshotIcon></WhatshotIcon> </Grid>
                                        <Grid item md={10} xs={12} px={1} sx={{ fontSize: '9px' }}>
                                            Xu hướng
                                        </Grid>
                                    </Grid>
                                </Button>
                            </NavLink>
                        </Grid>

                        <Grid item md={2} xs={3} textAlign="center">
                            <NavLink className='btn-tools' to="movies" style={styleNavLinkMobile}>
                                <Button className='btn-tools'>
                                    <Grid container color={'white'}>
                                        <Grid item md={2} xs={12}> <GroupWorkIcon></GroupWorkIcon> </Grid>
                                        <Grid item md={10} xs={12} px={1} sx={{ fontSize: '9px' }}>
                                            Phim lẻ
                                        </Grid>
                                    </Grid>
                                </Button>
                            </NavLink>
                        </Grid>

                        <Grid item md={2} xs={3} textAlign="center">
                            <NavLink className='btn-tools' to="tvseries" style={styleNavLinkMobile}>
                                <Button className='btn-tools'>
                                    <Grid container color={'white'}>
                                        <Grid item md={2} xs={12}><LiveTvIcon></LiveTvIcon> </Grid>
                                        <Grid item md={10} xs={12} px={1} sx={{ fontSize: '9px' }}>
                                            Phim bộ
                                        </Grid>
                                    </Grid>
                                </Button>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}
