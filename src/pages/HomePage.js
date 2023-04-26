import Carousel from '../components/home/Carousel'
import Moives from '../components/home/Moives';
import TvSeries from '../components/home/TvSeries';
import TopRated from '../components/home/TopRated';
function HomePage() {
    return (
        <div>
            <Carousel />
            <Moives />
            <TvSeries />
            <TopRated />
        </div>
    );
}

export default HomePage;