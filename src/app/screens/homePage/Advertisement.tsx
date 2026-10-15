import { mediaUrl } from "../../../lib/media";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Occasion } from "../../../lib/types/occasion";
import OccasionService from "../../services/OccasionService";

export default function Advertisement() {
  const [occasions, setOccasions] = useState<Occasion[]>([]);

  const history = useHistory();

  // CATEGORY HANDLER

  const CategoryHandler = (category: string) => {
    history.push(`/products?productCollection=${encodeURIComponent(category)}`);

    window.scrollTo(0, 0);
  };

  // GET OCCASIONS

  useEffect(() => {
    const occasionService = new OccasionService();

    occasionService
      .getOccasions()
      .then((data) => {
        setOccasions(data);
      })
      .catch((err) => {
        console.error("Occasion error:", err);
      });
  }, []);

  // RETURN

  return (
    <section className="occasion-frame">
      <div className="occasion-header">
        <span>SHOP BY OCCASION</span>

        <h2>Flowers for every special moment</h2>

        <p>Find the perfect flowers for every occasion and make someone's day unforgettable.</p>
      </div>

      <div className="occasion-list">
        {occasions.map((occasion) => (
          <div className="occasion-card" key={occasion._id}>
            <div className="occasion-image">
              <img src={mediaUrl(occasion.occasionImage)} alt={occasion.occasionTitle} />
            </div>

            <div className="occasion-info">
              <h3>{occasion.occasionTitle}</h3>

              <p>{occasion.occasionDescription}</p>

              <button onClick={() => CategoryHandler(occasion.productCollection)}>Explore</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
