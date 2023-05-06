import MediaDetail from '../components/MediaDetail/MediaDetail';
import Cast from '../components/MediaDetail/Cast';
import RelatedMovies from '../components/MediaDetail/RelatedMovies';


function MediaDetailPage() {
    return (
        <div>
            <MediaDetail />
            <Cast />
            <RelatedMovies />
        </div>
    );
}

export default MediaDetailPage;