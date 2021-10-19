type GalleryListPropType = {
  id: number;
  images: string[];
}


function GalleryList ({images, id} : GalleryListPropType) : JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.map((image) => (
          <div key={id++} className="property__image-wrapper">
            <img className="property__image" src={image} alt="Studio"/>
          </div>))}
      </div>
    </div>);
}

export default GalleryList;
