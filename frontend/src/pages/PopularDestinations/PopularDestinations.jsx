import { React, useEffect, useState } from "react";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import TourCard from "../../components/TourCard/TourCard";
import { assets } from "../../constants/assets";
import getDestinations from "../../utils/wikitravel";

// Might need to change how we do the cards if we want to split the data between "Things to Do in City" and "Outside the City Specials"

export default function PopularDestinations() {
	const [popularDestinations, setPopularDestinations] = useState([]);
	
	useEffect(() => {
		async function loadDestination() {
			const destinations = await getDestinations(null, 4);
			setPopularDestinations(destinations);
		};
		loadDestination();
	}, []);

	return (
		<main className="page destinations">
			<section className="destination-hero">
				<div>
					<h1>Popular Destinations</h1>
					<p>
						Discover handpicked experiences tailored for the discerning
						traveler.
					</p>
				</div>
				<div className="selects">
					<button>Sort by: Popularity</button>
					<button>All Categories</button>
				</div>
			</section>
			<section className="section">
				<SectionHeading title="Places To Go" />
				<div className="destination-grid">
					{/* shows first three cards */}
					{popularDestinations.slice(0, 3).map((city, index) => (
						<TourCard key={index} title={city.title} image={city.thumbnail} country={city.country} />
					))}
				</div>
			</section>
			<section className="section">
				<SectionHeading title="Outside The City Specials" />
				<div className="chips">
					<button className="selected teal">Water Activities</button>
					<button>Special Foods</button>
					<button>River Activity</button>
					<button>Historical Tours</button>
				</div>
				<div className="destination-grid four">
					{/* shows cards after first three */}
					{popularDestinations.slice(3).map((city, index) => (
							<TourCard key={index} title={city.title} image={city.thumbnail} country={city.country} />
						))}
				</div>
			</section>
		</main>
	);
}
